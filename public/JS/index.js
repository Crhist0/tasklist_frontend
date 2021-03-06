document.getElementById("submit").addEventListener("click", function (event) {
    logIn();
    event.preventDefault();
});

function logIn() {
    initLoader();

    let name = document.getElementById("name").value;
    let pass = document.getElementById("pass").value;

    api.post("/user/login/", {
        name,
        pass,
    })
        .then((result) => {
            stopLoader();
            localStorage.setItem("token", JSON.stringify(result.data.data));

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
            handleError(err);
        });
}
