document.getElementById("submit").addEventListener("click", function (event) {
    logIn();
    event.preventDefault();
});

function logIn() {
    let name = document.getElementById("name").value;
    let pass = document.getElementById("pass").value;

    api.post("/login/", {
        name,
        pass,
    })
        .then((result) => {
            let user = result.data.dados;
            localStorage.setItem("user", JSON.stringify(user));

            Swal.fire({
                icon: "info",
                html: `Deslogando usuário...`,
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
                    location.assign(window.location.href.replace("index", "taskList")); // TROCAR PELO LINK HEROKU (abaixo)
                    // location.assign(window.location.href.replace("createAcc", "")); // o index do heroku não tem index
                },
            });
        })
        .catch((err) => {
            showErrMessage(err);
        });
}
