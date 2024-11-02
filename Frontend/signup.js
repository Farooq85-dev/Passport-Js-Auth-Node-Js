const register = (event) => {
  event.preventDefault();
  const name = document.getElementById("uName").value;
  const email = document.getElementById("uEmail").value;
  const password = document.getElementById("uPassword").value;

  const data = JSON.stringify({ name, email, password });

  const config = {
    method: "post",
    url: "http://localhost:3000/Signup",
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };

  axios
    .request(config)
    .then((response) => {
      console.log("Response:", response.data);
      alert("User Registered Successfully!");
      location.href = "./signin.html";
    })
    .catch((error) => {
      if (error.response) {
        console.log("Error Data:", error.response.data);
        console.log("Error Status:", error.response.status);
        console.log("Error Headers:", error.response.headers);
      } else if (error.request) {
        console.log("No response received:", error.request);
      } else {
        console.log("Error Message:", error.message);
      }
    });
};

const registerBtn = document.querySelector("button[type='submit']");
registerBtn.addEventListener("click", register);
