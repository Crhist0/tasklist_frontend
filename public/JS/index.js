document.getElementById("submit").addEventListener("click", function (event) {
    logIn();
    event.preventDefault();
});

function logIn() {
    let name = document.getElementById("name").value;
    let pass = document.getElementById("pass").value;

    api.post("/user/login/", {
        name,
        pass,
    })
        .then((result) => {
            // let user = result.data;
            localStorage.setItem("userId", JSON.stringify(result.data.user.id));
            localStorage.setItem("token", JSON.stringify(result.data.token));

            Swal.fire({
                icon: "info",
                html: `Logando usuário...`,
                timer: 1500,
                timerProgressBar: true,
                didOpen: () => {
                    Swal.showLoading();
                    const b = Swal.getHtmlContainer().querySelector("b");
                    timerInterval = setInterval(() => {
                        b.textContent = Swal.getTimerLeft();
                    }, 100);
                },
                willClose: () => {
                    clearInterval(timerInterval);
                    location.assign(window.location.href.replace("index", "taskList"));
                },
            });
        })
        .catch((err) => {
            showErrMessage(err);
        });
}
