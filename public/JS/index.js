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
            showOkMessage(result).then((result) => {
                if (result.isConfirmed || result.isDismissed) {
                    location.assign(window.location.href.replace("index", "taskList")); // TROCAR PELO LINK HEROKU (abaixo)
                }
            });
        })
        .catch((err) => {
            showErrMessage(err);
        });
}
