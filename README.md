# Maosa Tech Web Services

Professional website for **Maosa Tech Web Services** — a Nairobi-based digital practice offering web development, web design, and SEO services.

**Website owner:** Benjamin Mosweta  
**Location:** Nairobi, Kenya  
**Phone / WhatsApp:** +254 798 458 270  
**Email:** benjaminmosweta@gmail.com  
**LinkedIn:** [linkedin.com/in/benjamin-maosa](https://www.linkedin.com/in/benjamin-maosa/)  
**GitHub:** [github.com/Moswettta](https://github.com/Moswettta)  
**Portfolio:** [benjaminmaosaportfolio.netlify.app](https://benjaminmaosaportfolio.netlify.app/)

---

## Pages

| Page | File | Description |
|------|------|-------------|
| Home | `index.html` | Hero, services overview, about summary, pricing, FAQ, contact |
| About | `about.html` | Company & Benjamin Mosweta background |
| Contact | `contact.html` | Working contact form (WhatsApp + Email) |
| Web Development | `services/web-development.html` | Full service page |
| SEO Services | `services/seo.html` | Full service page |
| Web Design | `services/web-design.html` | Full service page |

---

## Features

- Multi-page structure with dedicated service pages
- SEO, local GEO and AEO foundations: page metadata, canonical URLs, LocalBusiness/Service structured data and FAQ schema
- Customer-focused homepage messaging and clearer service calls-to-action
- WebP service illustrations, responsive image sizing, asynchronous image decoding and lazy-loading below the fold
- Brand-coloured LinkedIn, WhatsApp, GitHub and email footer icons with larger tap targets
- Authentic professional design (no flashy gradients)
- Working contact form:
  - **Send via WhatsApp** — opens WhatsApp with pre-filled message
  - **Send via Email** — opens email client with subject & body
- Pricing section (KES)
- Responsive (mobile, tablet, desktop)
- Social icons in footer (LinkedIn, WhatsApp, GitHub, Email)
- Favicon + logo icons included
- `.htaccess` for Apache (security, caching, compression)

---

## Folder structure

```
maosatech-website/
├── index.html
├── about.html
├── contact.html
├── .htaccess
├── README.md
├── icons/
│   ├── favicon.svg
│   ├── logo-mark.svg
│   ├── logo-full.svg
│   ├── logo-full-dark.svg
│   ├── icon-192.svg
│   ├── icon-512.svg
│   ├── social-linkedin.svg
│   ├── social-whatsapp.svg
│   ├── social-github.svg
│   └── social-email.svg
└── services/
    ├── web-development.html
    ├── seo.html
    └── web-design.html
```

---

## How to view locally

1. Extract the zip
2. Open `index.html` in any modern browser  
   (or use a local server, e.g. `npx serve .`)

---

## How to deploy

### Netlify (recommended — free)
1. Go to [netlify.com](https://www.netlify.com)
2. Drag & drop the entire folder
3. Done — you get a live URL instantly

### Vercel
1. Go to [vercel.com](https://vercel.com)
2. Import the folder or connect a Git repo
3. Deploy

### Traditional hosting (cPanel / Apache)
1. Upload all files via FTP or File Manager
2. The included `.htaccess` will handle caching, compression and basic security
3. Point your domain to the folder

### GitHub Pages
1. Create a repository
2. Upload the files
3. Enable GitHub Pages in Settings

---

## Customisation

### Update contact details
Search and replace across all HTML files:
- Phone: `+254 798 458 270`
- Email: `benjaminmosweta@gmail.com`
- LinkedIn / GitHub URLs

### Change accent colour
The main accent is `#b45309` (amber). Search for `b45309`, `d97706`, `92400e` in the HTML files and replace with your preferred hex values.

### Domain
Update the `canonical` URLs and Open Graph tags from `https://maosatech.com/` to your real domain once you have one.

---

## Tech stack

- HTML5 (semantic)
- Tailwind CSS (via CDN)
- Vanilla JavaScript
- SVG logos/icons retained for sharp scaling; service illustrations optimized to WebP
- JSON-LD structured data
- Apache `.htaccess`

No build step required.

---

## Licence

All rights reserved © 2026 Maosa Tech Web Services.  
Built for Benjamin Mosweta / Maosa Tech.

## Image and performance notes

- `img/service-*.webp` are compressed WebP versions of the original service illustrations. The original SVG source illustrations are retained as editable fallbacks/source assets.
- SVG logos and social icons remain SVG because converting small vector marks to raster images would reduce sharpness.
- Tailwind is still loaded from its CDN because the current pages use Tailwind utility classes extensively. For a further production speed improvement, compile and minify the CSS into a local stylesheet before removing the CDN script.
- SEO/GEO/AEO improvements are technical foundations, not a guarantee of rankings or AI search citations. Verify the live domain, business details, Google Business Profile and Search Console after deployment.
