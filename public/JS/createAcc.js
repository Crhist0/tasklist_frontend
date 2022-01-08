document.getElementById("submit").addEventListener("click", function (event) {
    createAcc();
    event.preventDefault();
});

function createAcc() {
    initLoader();

    let name = document.getElementById("formName").value;
    let pass = document.getElementById("formPass").value;
    let Rpass = document.getElementById("formRepeatPass").value;

    deleteAccCreationInputs();

    api.post("/user/create/", {
        name,
        pass,
        Rpass,
    })
        .then((result) => {
            showOkMessage(result).then((result) => {
                if (result.isConfirmed || result.isDismissed) {
                    location.assign(window.location.href.replace("createAcc", "index"));
                }
            });
        })
        .catch((err) => {
            showErrMessage(err);
        });
}
