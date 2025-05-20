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
      <img src="${p.image}" alt="${p.title}" class="project-img">
      <div class="project-content">
        <h5>${p.title}</h5>
        <p>${p.description}</p>
        ${p.achievements ? `<ul>${p.achievements.map(a => `<li>${a}</li>`).join("")}</ul>` : ""}
        ${p.link ? `<a href="${p.link}" target="_blank">View Project</a>` : ""}
      </div>
    `;
    container.appendChild(card);
  });
}

function toggleProjects() {
  expanded = !expanded;
  renderProjects();
  document.querySelector("button").textContent = expanded ? "View Less" : "View More";
}

fetch('projects.json')
  .then(res => res.json())
  .then(data => {
    allProjects = data;
    renderProjects();
  });
