const BASE_URL ="https://backend-task-manager-2-2mur.onrender.com";

const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", async (e) => {

  e.preventDefault();

  const email = document.getElementById("email").value;

  const password = document.getElementById("password").value;

  const response = await fetch(`${BASE_URL}/api/auth/login`, {

    method:"POST",

    headers:{
      "Content-Type":"application/json"
    },

    body:JSON.stringify({
      email,
      password
    })

  });

  const data = await response.json();

  document.getElementById("message").innerText = data.message;

  if(data.success){

    localStorage.setItem("token", data.token);

    window.location.href = "dashboard.html";

  }

});

