const signin = (event) => {
  event.preventDefault();

  const name = document.getElementById("uName").value;
  const password = document.getElementById("uPassword").value;

  let data = JSON.stringify({
    username: name,
    password: password,
  });

  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: "http://localhost:3000/signin",
    headers: {
      "Content-Type": "application/json",
      Cookie:
        "connect.sid=s%3AlfDkLFHlHjnTj4LyBsYnI_kpvlUDZtSg.9gNthPxLzYnr7m30cjIwTOjNe6snGL8CkswlHetAHYU",
    },
    withCredentials: true,
    data: data,
  };

  axios
    .request(config)
    .then((response) => {
      console.log(JSON.stringify(response.data.response.msg));
      alert("User Login Successfully!");
      location.href = "./success.html";
    })
    .catch((error) => {
      console.log(error);
    });
};

const signinBtn = document.querySelector("button[type='submit']");
signinBtn.addEventListener("click", signin);
