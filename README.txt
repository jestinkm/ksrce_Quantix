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
Before sharing publicly, change the og:image value in index.html to the full https:// URL of assets/flyer.jpg.
