document.addEventListener('DOMContentLoaded', () => {
    // 1. Time-Based Greeting
    const hour = new Date().getHours();
    let greeting = "Welcome back, Ayush.";
    if (hour < 12) greeting = "Good morning, Ayush.";
    else if (hour < 18) greeting = "Good afternoon, Ayush.";
    else greeting = "Good evening, Ayush.";
    
    document.getElementById('year').textContent = new Date().getFullYear();

    // 2. Fetch and render content
    fetch('content.json')
        .then(response => response.json())
        .then(data => {
            document.getElementById('greeting').textContent = greeting;
            
            // Profile & Status
            document.getElementById('hero-name').textContent = data.profile.name;
            document.getElementById('nav-brand').textContent = data.profile.initials;
            document.getElementById('hero-subtitle').textContent = data.profile.subtitle;
            document.getElementById('bio-text').textContent = data.profile.bio;
            
            document.getElementById('status-building').textContent = data.currentWork.building;
            document.getElementById('status-exploring').textContent = data.currentWork.exploring;
            document.getElementById('status-creating').textContent = data.currentWork.creating;
            
            // Skills
            const skillsGrid = document.getElementById('skills-grid');
            for (const [category, skills] of Object.entries(data.skills)) {
                const div = document.createElement('div');
                div.className = 'skill-category';
                div.innerHTML = `<h4>${category}</h4><ul class="skill-list">${skills.map(s => `<li>${s}</li>`).join('')}</ul>`;
                skillsGrid.appendChild(div);
            }

            // Projects
            const projectsContainer = document.getElementById('projects-container');
            data.projects.forEach(proj => {
                let imagesHTML = '';
                if (proj.images && proj.images.length > 0) {
                    imagesHTML = `<div class="image-gallery">` + 
                        proj.images.map(img => `
                            <div>
                                <div class="img-wrapper" onclick="openLightbox('${img.src}', '${img.caption}')">
                                    <img src="${img.src}" alt="${proj.title}" loading="lazy">
                                </div>
                                <p class="img-caption">${img.caption}</p>
                            </div>
                        `).join('') + `</div>`;
                }

                let subsHTML = '';
                if (proj.subsections && proj.subsections.length > 0) {
                    subsHTML = `<div class="project-subsections">` + 
                        proj.subsections.map(sub => {
                            let subImagesHTML = '';
                            if (sub.images && sub.images.length > 0) {
                                subImagesHTML = `<div class="image-gallery" style="margin-top: 1rem; margin-bottom: 1.5rem;">` + 
                                    sub.images.map(img => `
                                        <div>
                                            <div class="img-wrapper" onclick="openLightbox('${img.src}', '${img.caption}')">
                                                <img src="${img.src}" alt="${sub.heading}" loading="lazy">
                                            </div>
                                            <p class="img-caption">${img.caption}</p>
                                        </div>
                                    `).join('') + `</div>`;
                            }
                            return `<h5>${sub.heading}</h5><p>${sub.text}</p>${subImagesHTML}`;
                        }).join('') + 
                        `</div>`;
                }
                
                let linksHTML = '';
                if (proj.github) {
                    linksHTML = `<div class="project-links"><a href="${proj.github}" target="_blank" class="project-link">View on GitHub</a></div>`;
                }

                const card = document.createElement('div');
                card.className = 'project-card';
                card.innerHTML = `
                    <div class="project-header">
                        <h4>${proj.title}</h4>
                        <span class="project-meta">${proj.category} • ${proj.status}</span>
                    </div>
                    <p class="project-desc">${proj.description}</p>
                    ${linksHTML}
                    ${imagesHTML}
                    ${subsHTML}
                `;
                projectsContainer.appendChild(card);
            });

            // IoT & Electronics
            const iotContainer = document.getElementById('iot-container');
            data.iotAndElectronics.forEach(iot => {
                const tags = iot.tags ? `<div class="tag-container">${iot.tags.map(t => `<span class="tag">${t}</span>`).join('')}</div>` : '';
                const card = document.createElement('div');
                card.className = 'iot-card';
                card.innerHTML = `<h4>${iot.title}</h4><p class="project-desc">${iot.description}</p>${tags}`;
                iotContainer.appendChild(card);
            });

            // Creative Work
            const creativeContainer = document.getElementById('creative-container');
            data.creativeWork.forEach(cw => {
                let imagesHTML = '';
                if (cw.images && cw.images.length > 0) {
                    imagesHTML = `<div class="image-gallery" style="margin-bottom: 2rem;">` + 
                        cw.images.map(img => `
                            <div>
                                <div class="img-wrapper" onclick="openLightbox('${img.src}', '${img.caption}')">
                                    <img src="${img.src}" alt="${cw.title}" loading="lazy">
                                </div>
                                <p class="img-caption">${img.caption}</p>
                            </div>
                        `).join('') + `</div>`;
                }
                const block = document.createElement('div');
                block.innerHTML = `<h4 style="font-family: var(--font-heading); margin-bottom: 0.5rem;">${cw.title}</h4><p class="project-desc">${cw.description}</p>${imagesHTML}`;
                creativeContainer.appendChild(block);
            });

            // Workspace
            document.getElementById('workspace-text').textContent = data.workspace.description;
            if(data.workspace.image) {
                document.getElementById('workspace-image-container').innerHTML = `
                    <div class="img-wrapper" onclick="openLightbox('${data.workspace.image}', 'Workspace Setup')">
                        <img src="${data.workspace.image}" alt="Workspace" loading="lazy">
                    </div>`;
            }

            // Achievements
            const achContainer = document.getElementById('achievements-container');
            data.achievements.forEach(ach => {
                const item = document.createElement('div');
                item.className = 'timeline-item';
                item.innerHTML = `<div class="timeline-date">${ach.date}</div><h4>${ach.title}</h4><p class="project-desc">${ach.description}</p>`;
                achContainer.appendChild(item);
            });

            // Socials
            const socialLinks = document.getElementById('social-links');
            for (const [platform, url] of Object.entries(data.social)) {
                if(url) {
                    socialLinks.innerHTML += `<a href="${url}" target="_blank">${platform}</a>`;
                }
            }
        })
        .catch(err => console.error("Error loading JSON: ", err));
});

// Lightbox functionality
const lightbox = document.getElementById('lightbox');
const lbImg = document.getElementById('lightbox-img');
const lbCap = document.getElementById('lightbox-caption');

function openLightbox(src, caption) {
    lbImg.src = src;
    lbCap.textContent = caption || '';
    lightbox.style.display = 'flex';
}

document.querySelector('.close-lightbox').addEventListener('click', () => {
    lightbox.style.display = 'none';
});

// --- Background Music Logic ---
const bgMusic = document.getElementById('bg-music');
const musicToggle = document.getElementById('music-toggle');
let isMusicPlaying = false;

function updateMusicUI(playing) {
    isMusicPlaying = playing;
    musicToggle.innerHTML = playing ? '⏸ Pause Music' : '▶ Play Music';
}

function toggleMusic(e) {
    if (e) e.stopPropagation();
    if (isMusicPlaying) {
        bgMusic.pause();
        updateMusicUI(false);
    } else {
        bgMusic.play().then(() => updateMusicUI(true)).catch(err => console.log("Blocked by browser"));
    }
}

musicToggle.addEventListener('click', toggleMusic);

// 1. Attempt to play IMMEDIATELY when the page loads
window.addEventListener('load', () => {
    bgMusic.play()
        .then(() => updateMusicUI(true))
        .catch(err => console.warn("Browser blocked instant autoplay."));
});

// 2. Aggressive Fallback: If blocked, play on the very first click ANYWHERE on the website
document.body.addEventListener('click', () => {
    if (!isMusicPlaying && bgMusic.paused) {
        bgMusic.play()
            .then(() => updateMusicUI(true))
            .catch(err => console.log("Still blocked."));
    }
}, { once: true });