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

    headers:{
      Authorization:`Bearer ${token}`
    }

  });

  const data = await response.json();

  let rows = "";

  const projectSelect = document.getElementById("projectId");

  projectSelect.innerHTML = `
    <option value="">Select Project</option>
  `;

  data.projects.forEach((project)=>{

    rows += `
      <tr>
        <td>${project.title}</td>
        <td>${project.description}</td>
      </tr>
    `;

    projectSelect.innerHTML += `
      <option value="${project._id}">
        ${project.title}
      </option>
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
        <td>

    <button onclick="updateTask('${task._id}')">
      Update
    </button>

    <button onclick="deleteTask('${task._id}')">
      Delete
    </button>

  </td>
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
async function deleteTask(id){

  await fetch(`${BASE_URL}/api/tasks/${id}`, {

    method:"DELETE",

    headers:{
      Authorization:`Bearer ${token}`
    }

  });

  getTasks();

  getDashboardStats();

}
async function updateTask(id){

  const status = prompt(
    "Enter status: pending, in-progress, completed"
  );

  await fetch(`${BASE_URL}/api/tasks/${id}`, {

    method:"PUT",

    headers:{
      "Content-Type":"application/json",
      Authorization:`Bearer ${token}`
    },

    body:JSON.stringify({
      status
    })

  });

  getTasks();

  getDashboardStats();

}



getDashboardStats();

getProjects();

getTasks();