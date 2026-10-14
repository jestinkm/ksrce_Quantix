QUANTIX 2K26 website (static site, React 18 loaded from a CDN, no build step)

Files
  index.html                      page shell and theme script
  css/style.css                   styles, animations, media queries
  js/app.js                       React app; the registration link is the FORM constant
  assets/                         logos and flyer
  quantix-2k26-single-file.html   the same site in one self-contained file

Run locally: open index.html, or run  python3 -m http.server  in this folder and visit http://localhost:8000
Deploy: upload the whole folder to Netlify, Vercel, GitHub Pages or any static host.
Needs internet for React (cdnjs) and Google Fonts.
Before sharing publicly, change the og:image value in index.html to the full https:// URL of assets/flyer.jpeg.

Devfolio integration
  Registration section (#register) loads the official Apply with Devfolio SDK (https://apply.devfolio.co/v2/sdk.js)
  and renders <div class="apply-button" data-hackathon-slug="quantix-2k26" data-button-theme="light">.
  Slug and Devfolio page are the DEVSLUG and DEVFOLIO constants at the top of js/app.js.
  The official Devfolio logo is assets/devfolio-logo.png (also embedded in the single-file version).
  Do not redraw or edit it. The <img> alt text must stay "DEVFOLIO LOGO" so Devfolio can verify it.
  The button only works on the website URL set in the Devfolio dashboard and appears after the hackathon is verified.
