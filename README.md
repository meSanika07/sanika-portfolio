# Sanika Kundekar — Portfolio

## Folder Structure

```
sanika-portfolio/
├── index.html          ← Open this in your browser
├── css/
│   └── styles.css      ← All styles (dark/light theme, layout, sections)
├── js/
│   └── main.js         ← All JavaScript (loader, theme, animations)
└── assets/
    ├── photo.jpg        ← Put your photo here (any name)
    └── Intern_SanikaKundekar.pdf  ← Put your resume PDF here
```

## How to Run

1. Double-click `index.html`  OR
2. Right-click `index.html` → Open With → Chrome / Firefox / Edge

No server needed. Works offline (except Google Fonts if no internet).

## How to Add Your Photo

1. Copy your photo into the `assets/` folder (e.g. `photo.jpg`)
2. Open `index.html` in a code editor (VS Code recommended)
3. Find this comment block (~line 100):
   ```html
   <!-- <img src="assets/photo.jpg" alt="Sanika Kundekar" /> -->
   ```
4. Uncomment that line (remove `<!--` and `-->`)
5. Delete the `<div class="avatar-svg">...</div>` block below it
6. Save and refresh the browser

## How to Update Links

- **GitHub**: Search for `github.com/sanika-kundekar` and replace with your real URL
- **LinkedIn**: Search for `linkedin.com/in/sanika-kundekar` and replace
- **LeetCode**: Search for `leetcode.com/sanika-kundekar` and replace
- **Email**: Search for `sanikakundekar007@gmail.com` and replace

## Dark / Light Mode

Click the toggle switch in the top-right of the navbar.
Your preference is saved in the browser automatically.
