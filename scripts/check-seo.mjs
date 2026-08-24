import { readFile, readdir, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const dist=path.join(root,'dist');
const origin='https://www.webaanzee.be';
const errors=[]; const warnings=[];
async function walk(dir){const out=[];for(const name of await readdir(dir)){const f=path.join(dir,name);const s=await stat(f);if(s.isDirectory())out.push(...await walk(f));else if(name.endsWith('.html'))out.push(f)}return out}
const files=await walk(dist);
const publicPages=files.filter(f=>!f.includes(`${path.sep}assets${path.sep}`));
const canonicalToFile=new Map(); const indexable=new Set(); const internalLinks=[];
const strip=s=>s.replace(/<script[\s\S]*?<\/script>/gi,' ').replace(/<style[\s\S]*?<\/style>/gi,' ').replace(/<[^>]+>/g,' ').replace(/&[a-z#0-9]+;/gi,' ').replace(/\s+/g,' ').trim();
for(const file of publicPages){
  const rel=path.relative(dist,file); const html=await readFile(file,'utf8');
  const title=html.match(/<title>([\s\S]*?)<\/title>/i)?.[1]?.trim();
  const desc=html.match(/<meta[^>]+name=["']description["'][^>]+content=["']([^"']+)/i)?.[1]||html.match(/<meta[^>]+content=["']([^"']+)["'][^>]+name=["']description["']/i)?.[1];
  const robots=html.match(/<meta[^>]+name=["']robots["'][^>]+content=["']([^"']+)/i)?.[1]||'';
  const canonical=html.match(/<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)/i)?.[1]||html.match(/<link[^>]+href=["']([^"']+)["'][^>]+rel=["']canonical["']/i)?.[1];
  const h1=(html.match(/<h1\b/gi)||[]).length; const words=strip(html).split(/\s+/).filter(Boolean).length;
  if(!title)errors.push(`${rel}: missing title`);
  if(!robots.includes('noindex')&&!desc)errors.push(`${rel}: missing meta description`);
  if(!robots.includes('noindex')&&rel!=='404.html'){
    if(!canonical)errors.push(`${rel}: missing canonical`); else {if(!canonical.startsWith(origin))errors.push(`${rel}: wrong canonical host ${canonical}`);if(canonicalToFile.has(canonical))errors.push(`${rel}: duplicate canonical with ${canonicalToFile.get(canonical)}`);canonicalToFile.set(canonical,rel);indexable.add(canonical)}
    if(h1!==1)errors.push(`${rel}: expected one H1, found ${h1}`);
    if(words<180)warnings.push(`${rel}: thin rendered text (${words} words)`);
  }
  for(const match of html.matchAll(/<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)){try{JSON.parse(match[1])}catch(e){errors.push(`${rel}: invalid JSON-LD (${e.message})`)}}
  for(const match of html.matchAll(/<a[^>]+href=["']([^"']+)["']/gi))internalLinks.push({rel,href:match[1]});
  if(/Binnen 7 dagen|vanaf €450|"price"\s*:\s*"450"/i.test(html))errors.push(`${rel}: stale price or seven-day claim`);
}
const validPaths=new Set(publicPages.map(file=>{const rel=path.relative(dist,file).split(path.sep).join('/');if(rel==='index.html')return '/';if(rel.endsWith('/index.html'))return '/'+rel.slice(0,-'index.html'.length);return '/'+rel}));
for(const {rel,href} of internalLinks){
  if(!href.startsWith('/')||href.startsWith('//'))continue;
  const target=href.split('#')[0].split('?')[0]||'/';
  if(/^\/(api|assets|images|videos)\//.test(target)||/\.(webp|png|jpg|jpeg|svg|css|js|mp4|mov|xml|txt)$/i.test(target))continue;
  if(!validPaths.has(target))errors.push(`${rel}: broken internal link ${href}`);
}
const sitemap=await readFile(path.join(dist,'sitemap.xml'),'utf8');
const sitemapUrls=new Set([...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m=>m[1]));
for(const url of sitemapUrls)if(!indexable.has(url))errors.push(`sitemap: URL not represented by an indexable canonical: ${url}`);
for(const url of indexable)if(!sitemapUrls.has(url)&&!url.endsWith('/404.html'))errors.push(`sitemap: missing indexable canonical ${url}`);
if(sitemapUrls.size!==29)warnings.push(`sitemap contains ${sitemapUrls.size} URLs; expected current manifest count 29`);
if(errors.length){console.error(`SEO checks failed (${errors.length}):\n- ${errors.join('\n- ')}`);process.exit(1)}
console.log(`SEO checks passed for ${publicPages.length} HTML files and ${sitemapUrls.size} sitemap URLs.`);
if(warnings.length)console.warn(`Warnings (${warnings.length}):\n- ${warnings.join('\n- ')}`);
