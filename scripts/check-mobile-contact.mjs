import assert from 'node:assert/strict';
import puppeteer from 'puppeteer';
const origin=process.argv[2]??'http://127.0.0.1:4173';
const browser=await puppeteer.launch({headless:true});
const page=await browser.newPage();
const settle=()=>page.evaluate(()=>new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve))));
let mocked=0;
await page.setRequestInterception(true);
page.on('request',request=>{
  if(new URL(request.url()).pathname==='/api/contact'&&request.method()==='POST') {mocked++;void request.respond({status:503,contentType:'application/json',body:JSON.stringify({message:'Test: probeer later opnieuw.'})});}
  else void request.continue();
});
try{
for(const [width,height,font]of[[320,568,16],[390,844,16],[844,390,16],[320,568,32]]){
 await page.setViewport({width,height,isMobile:true,hasTouch:true});
 await page.goto(`${origin}/#contact`,{waitUntil:'networkidle0'});
 if(font!==16)await page.addStyleTag({content:`html{font-size:${font}px!important}`});
 await settle();
 assert.ok(await page.evaluate(width=>innerWidth<=width+1&&document.documentElement.scrollWidth<=width+1,width),'page expands its mobile viewport');
 await page.$eval('#contact button',n=>n.click());await settle();
 const initial=await page.$eval('[role="dialog"]',n=>{const r=n.getBoundingClientRect(),i=n.querySelector('input').getBoundingClientRect();return{left:r.left,right:r.right,top:r.top,bottom:r.bottom,input:i.width,scroll:n.scrollTop};});
 assert.ok(initial.left>=0&&initial.right<=width&&initial.top>=0&&initial.bottom<=height,JSON.stringify(initial));
 assert.ok(initial.input>=200,'desktop padding squeezes the input');
 assert.equal(initial.scroll,0,'opening should show the first field label');
 await page.$eval('[role="dialog"]',n=>n.scrollTop=n.scrollHeight);await settle();
 const actions=await page.$eval('[role="dialog"]',n=>{
  const close=n.querySelector('button'),submit=n.querySelector('button[type="submit"]'),r=close.getBoundingClientRect(),s=submit.getBoundingClientRect(),hit=document.elementFromPoint(r.left+r.width/2,r.top+r.height/2);
  return{close:r.top>=0&&r.bottom<=innerHeight&&(hit===close||close.contains(hit)),submit:s.top>=0&&s.bottom<=innerHeight};
 });assert.ok(actions.close&&actions.submit,'close or submit becomes inaccessible while scrolling');
 await page.tap('button[aria-label="Sluit contactformulier"]');await settle();
 assert.equal(await page.$('[role="dialog"]'),null);assert.notEqual(await page.evaluate(()=>document.body.style.overflow),'hidden');
 console.log(`${width}×${height}, ${font}px: dialog fits, usable inputs, first label visible, close and submit reachable.`);
}
await page.setViewport({width:390,height:844,isMobile:true,hasTouch:true});await page.goto(`${origin}/#contact`,{waitUntil:'networkidle0'});
await page.$eval('#contact button',n=>n.click());await settle();
await page.type('#contact-name','Mobiele test');await page.type('#contact-email','test@example.com');await page.type('#contact-message','Dit is een lokaal onderschepte test.');
await page.$eval('[role="dialog"] button[type="submit"]',n=>n.click());
await page.waitForFunction(()=>document.querySelector('[role="status"]')?.textContent.includes('Test: probeer later opnieuw.'));
assert.equal(mocked,1,'form request is intercepted locally');
assert.equal(await page.$eval('[role="dialog"] button[type="submit"]',n=>n.disabled),false);
await page.setViewport({width:390,height:360,isMobile:true,hasTouch:true});await settle();
assert.ok(await page.$eval('[role="dialog"]',n=>n.getBoundingClientRect().height<=360),'dialog adapts to a short viewport');
await page.keyboard.press('Escape');assert.equal(await page.$('[role="dialog"]'),null);
console.log('Locally mocked submission failure, retry state, short viewport and Escape passed. No message was sent.');
}finally{await browser.close();}
