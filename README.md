# Ayush Raj | Digital Workspace

A static, high-performance portfolio driven entirely by JSON.

## How to Edit Content
You **never** need to touch the HTML or CSS to add a project. 
1. Open `content.json`.
2. To add a project, copy an existing block inside the `"projects"` array.
3. Edit the `"title"`, `"description"`, and `"images"` fields. 
4. If you leave the `"images"` array empty (`[]`), the website simply won't render an image gallery for that project.
5. To add a subsection, add an object to the `"subsections"` array.

## Images & Assets
Place all your photos inside the `assets/projects/` or `assets/images/` folders.
In `content.json`, reference them using relative paths like `"src": "assets/projects/my-image.jpg"`.

## Managing Images & Galleries
Place all your raw photos inside the `assets/projects/` or `assets/images/` folders on your computer or GitHub repo. You reference them using relative paths (e.g., `"assets/projects/my-photo.jpg"`).

### 1. Adding Multiple Images to a Main Project
To create a beautiful image gallery for a project, just add multiple objects inside the `"images"` array, separated by commas.

```json
"images": [
  { 
    "src": "assets/projects/steering-1.jpg", 
    "caption": "Primary hardware assembly" 
  },
  { 
    "src": "assets/projects/steering-2.jpg", 
    "caption": "Wiring the AS5600 sensor" 
  }
]

## GitHub Pages Deployment
This site relies entirely on standard web technologies and relative paths.
1. Commit all files to a GitHub repository (e.g., `ayush-03404.github.io` or `ayush-03404.github.io/portfolio`).
2. Go to Repo Settings > Pages.
3. Deploy from the `main` branch.
4. Your changes to `content.json` will automatically update the live site within a minute of pushing to GitHub.