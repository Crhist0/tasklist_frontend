document.getElementById("submit").addEventListener("click", function (event) {
    createAcc();
    event.preventDefault();
});

function createAcc() {
    getAccCreationInputs();
    deleteAccCreationInputs();
    api.post("/create/", {
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
