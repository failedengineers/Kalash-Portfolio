# Kalash Gulati - Developer Portfolio

This is a clean, static portfolio website that utilizes a premium Next-Gen 3D design paradigm ("Cinematic Developer Portfolio") optimized for speed and easy deployment.

## Features
- **Frontend-only:** Pure HTML, CSS, and Vanilla JavaScript. Fast and lightweight.
- **Dynamic Data:** Pulls live GitHub activity using the GitHub REST API.
- **Mobile First:** Fully responsive without breaking structure.
- **Micro-animations:** Utilizes IntersectionObservers and clean CSS transitions without complex physics lag.

## Deployment on GitHub Pages (Under 5 minutes)

1. **Initialize Git Repository**
   Open your terminal in this `portfolio-website` folder and run:
   ```bash
   git init
   git add .
   git commit -m "Initial commit of portfolio"
   ```

2. **Push to GitHub**
   - Go to [GitHub](https://github.com) and create a new repository (e.g., `portfolio`).
   - Copy the repository URL.
   - Run the following terminal commands:
   ```bash
   git branch -M main
   git remote add origin YOUR_REPOSITORY_URL
   git push -u origin main
   ```

3. **Enable GitHub Pages**
   - Go to your newly created repository on GitHub.
   - Click **Settings** > **Pages** (under the "Code and automation" section).
   - Under **Build and deployment**, select `main` as the branch and `/ (root)` as the folder.
   - Click **Save**.
   
   *Your website is now live! GitHub will provide the URL at the top of the Pages settings.*

## Editing Content
- **Images:** Add your portrait image into the `assets/images` directory and name it `portrait.jpg`.
- **Text:** Open `index.html` to easily edit your headline, bio, or the listed featured projects.
- **Colors:** Open `assets/css/style.css` and tweak the `var(--primary)` and `var(--primary-dim)` tokens at the top of the file to change your main theme colors.
