const BASE_URL = " https://backend-task-manager-2-2mur.onrender.com";

const registerForm = document.getElementById("registerForm");

registerForm.addEventListener("submit", async (e) => {

  e.preventDefault();

  const name = document.getElementById("name").value;

  const email = document.getElementById("email").value;

  const password = document.getElementById("password").value;

  const role = document.getElementById("role").value;

  const response = await fetch(`${BASE_URL}/api/auth/register`, {

    method:"POST",

    headers:{
      "Content-Type":"application/json"
    },

    body:JSON.stringify({
      name,
      email,
      password
    })

  });

  const data = await response.json();
  console.log(data);

  document.getElementById("message").innerText = data.message;

  if(data.success){
    window.location.href = "login.html";
  }

});