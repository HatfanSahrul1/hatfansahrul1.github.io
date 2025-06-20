let expanded = false;
let allProjects = [];

function renderProjects(limit = 3) {
  const container = document.getElementById("project-list");
  container.innerHTML = "";

  const toShow = expanded ? allProjects : allProjects.slice(0, limit);

  toShow.forEach(p => {
    const card = document.createElement("div");
    card.className = "project-card";
    card.innerHTML = `
      <div class="image-wrapper">
        <img src="${p.image}" alt="${p.title} background" class="project-bg-blur">
        <img src="${p.image}" 
          alt="${p.title}" 
          class="project-img"
          ${p.preview ? `data-preview="${p.preview}"` : ""}
          ${p.preview ? `data-static="${p.image}"` : ""}>
      </div>
      <div class="project-content">
        <h5>${p.title}</h5>
        <p>${p.description}</p>

        ${p.achievement ? `
          <div class="project-achievements">
            <span class="achievement-badge">${p.achievement[0]}</span>
            ${p.achievement.length > 1 ? `
              <span class="achievement-badge">+${p.achievement.length - 1}</span>
            ` : ""}
          </div>` : ""}

        ${p.link ? `<a href="${p.link}" target="_blank">View Project</a>` : ""}
      </div>
    `;
    container.appendChild(card);
    if (p.preview) {
      const img = card.querySelector('.project-img');
      img.addEventListener('mouseenter', () => {
        img.src = p.preview;
      });
      img.addEventListener('mouseleave', () => {
        img.src = p.image;
      });
    }
  });

  // Reset maxHeight for smooth transition
  const wrapper = document.getElementById("project-wrapper");
  wrapper.style.maxHeight = wrapper.scrollHeight + "px";
}

function toggleProjects() {
  expanded = !expanded;
  renderProjects();

  const wrapper = document.getElementById("project-wrapper");
  const btn = document.getElementById("toggle-projects-btn");

  if (expanded) {
    wrapper.style.maxHeight = wrapper.scrollHeight + "px";
    btn.textContent = "View Less";
  } else {
    wrapper.style.maxHeight = "720px"; // Tinggi awal saat collapsed
    btn.textContent = "View More";

    wrapper.scrollIntoView({ behavior: 'smooth' });
  }
}

// Initial load
fetch('projects.json')
  .then(res => res.json())
  .then(data => {
    allProjects = data;
    renderProjects();
  });
