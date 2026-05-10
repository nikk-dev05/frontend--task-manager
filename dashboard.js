const BASE_URL = "https://backend-task-manager-2-2mur.onrender.com";

const token = localStorage.getItem("token");


if (!token) {
  window.location.href = "login.html";
}



function logout() {

  localStorage.removeItem("token");

  window.location.href = "login.html";
}



async function getDashboardStats() {

  const response = await fetch(`${BASE_URL}/api/dashboard`, {

    headers: {
      Authorization: `Bearer ${token}`
    }

  });

  const data = await response.json();

  document.getElementById("projectsCount").innerText = data.totalProjects;

  document.getElementById("tasksCount").innerText = data.totalTasks;

  document.getElementById("completedCount").innerText = data.completedTasks;

  document.getElementById("pendingCount").innerText = data.pendingTasks;
}


async function getProjects() {

  const response = await fetch(`${BASE_URL}/api/projects`, {

    headers: {
      Authorization: `Bearer ${token}`
    }

  });

  const data = await response.json();

  let rows = "";

  data.projects.forEach((project) => {

    rows += `
      <tr>
        <td>${project.title}</td>
        <td>${project.description}</td>
      </tr>
    `;

  });

  document.getElementById("projectTableBody").innerHTML = rows;
}




async function getTasks() {

  const response = await fetch(`${BASE_URL}/api/tasks`, {

    headers: {
      Authorization: `Bearer ${token}`
    }

  });

  const data = await response.json();

  let rows = "";

  data.tasks.forEach((task) => {

    rows += `
      <tr>
        <td>${task.title}</td>
        <td>${task.status}</td>
      </tr>
    `;

  });

  document.getElementById("taskTableBody").innerHTML = rows;
}



document.getElementById("projectForm")
.addEventListener("submit", async (e) => {

  e.preventDefault();

  const title = document.getElementById("projectTitle").value;

  const description = document.getElementById("projectDescription").value;

  await fetch(`${BASE_URL}/api/projects`, {

    method: "POST",

    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },

    body: JSON.stringify({
      title,
      description
    })

  });

  document.getElementById("projectForm").reset();

  getProjects();

  getDashboardStats();

});




document.getElementById("taskForm")
.addEventListener("submit", async (e) => {

  e.preventDefault();

  const title = document.getElementById("taskTitle").value;

  const description = document.getElementById("taskDescription").value;

  const status = document.getElementById("taskStatus").value;

  const projectId = document.getElementById("projectId").value;

  await fetch(`${BASE_URL}/api/tasks`, {

    method: "POST",

    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },

    body: JSON.stringify({
      title,
      description,
      status,
      projectId
    })

  });

  document.getElementById("taskForm").reset();

  getTasks();

  getDashboardStats();

});



getDashboardStats();

getProjects();

getTasks();