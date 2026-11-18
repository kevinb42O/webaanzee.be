"""Export website images from the approved, untouched source captures (Pillow)."""
from pathlib import Path
from PIL import Image, ImageOps
import json

ROOT = Path(__file__).resolve().parent.parent
SOURCES = ROOT / 'design-experiments/eigen-projecten/sources'
OUTPUT = ROOT / 'public/images/eigen-projecten'
IMAGES = {
    'velvet': ['velvet-arrangement-automation', 'velvet-pattern', 'velvet-serein', 'velvet-copperhead'],
    'sunline': ['sunline-pier', 'sunline-boot', 'sunline-kampvuur'],
    'pwayment': ['pwayment-kassa', 'pwayment-inzichten', 'pwayment-instellingen',
                 'pwayment-voorraad', 'pwayment-klanten', 'pwayment-integraties', 'pwayment-kassatoegang'],
}
records = []
for project, names in IMAGES.items():
    destination = OUTPUT / project
    destination.mkdir(parents=True, exist_ok=True)
    for name in names:
        source = SOURCES / project / f'{name}.png'
        image = Image.open(source).convert('RGB')
        crop = None
        if name == 'velvet-pattern':
            # Keep the transport, sound browser and all four pattern rows;
            # omit only the unused lower workspace and preview transport.
            crop = (0, 0, image.width, min(image.height, 940))
            image = image.crop(crop)
        for width in sorted(set([800, 1440, min(2400, image.width)])):
            if width > image.width:
                continue
            exported = image.resize((width, round(image.height * width / image.width)), Image.Resampling.LANCZOS)
            target = destination / f'{name}-{width}.webp'
            exported.save(target, 'WEBP', quality=88, method=6)
        records.append({'source': str(source.relative_to(ROOT)), 'name': name,
                        'crop': crop, 'width': image.width, 'height': image.height})
        if name in ['velvet-arrangement-automation', 'sunline-pier']:
            # Full screenshot, contained on a branded surface for social cards.
            card = Image.new('RGB', (1200, 630), '#201b29' if project == 'velvet' else '#e7e4da')
            contained = ImageOps.contain(image, (1160, 590), Image.Resampling.LANCZOS)
            card.paste(contained, ((1200-contained.width)//2, (630-contained.height)//2))
            card.save(destination / 'social.webp', 'WEBP', quality=90, method=6)
(OUTPUT / 'provenance.json').write_text(json.dumps(records, indent=2) + '\n')
print(f'Prepared {len(records)} approved screenshots and two social images.')
