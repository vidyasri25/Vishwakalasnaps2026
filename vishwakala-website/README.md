# Vishwakala Photography & Videography

Static website (plain HTML, CSS and JavaScript). No build step needed.

## Publish with GitHub Pages
1. Push all these files to the **root** of your repository (branch `main`).
2. On GitHub: **Settings → Pages → Build and deployment**.
3. Source: **Deploy from a branch**, Branch: **main**, folder: **/ (root)**, then **Save**.
4. After a minute your site is live at `https://<your-username>.github.io/<repo-name>/`.

## Edit content
- Text, phone numbers, services, FAQ, social links: `js/main.js` (the `SITE` block at the top).
- Which photo belongs to which portfolio section: also `SITE.categories` in `js/main.js`.
- Add a photo: put it in `assets/images/`, register it in `js/images.js`, then add it to a category.

## Add your videos
Videos are too large for normal GitHub files, so upload them to YouTube (or Google Drive) and in `js/main.js` set the `url` of each entry in `SITE.videos`:

    { title: "Baby photoshoot film", url: "https://youtu.be/xxxx", poster: POSTER.v3 }

Small clips (under 25 MB) can instead go in `assets/videos/` with `src: "assets/videos/name.mp4"`.
