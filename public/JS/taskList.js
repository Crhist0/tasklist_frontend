let loggedUser = JSON.parse(localStorage.getItem("user"));

function addTask(position) {
    let loggedUser = JSON.parse(localStorage.getItem("user"));
    let description = document.getElementById("description").value;
    let detail = document.getElementById("detail").value;
    let name = loggedUser.name;
    let token = loggedUser.token;

    api.post("/addTask/", {
        name,
        token,
        description,
        detail,
        position,
    })
        .then((result) => {
            localStorage.setItem("user", JSON.stringify(result.data.dados));
            showOkMessage(result).then((result) => {
                if (result.isConfirmed || result.isDismissed) {
                    showList(getLoggedUser());
                }
            });
        })
        .catch((err) => {
            err.response.status == 400 ? showErrMessage(err) : showErrMessage401(err);
        });
}

function saveEdit(index) {
    let loggedUser = JSON.parse(localStorage.getItem("user"));
    let description = document.getElementById("floatingDescription" + index).value;
    let detail = document.getElementById("floatingDetails" + index).value;
    let name = loggedUser.name;
    let token = loggedUser.token;

    api.put("/saveEdit/", {
        name,
        token,
        description,
        detail,
        index,
    })
        .then((result) => {
            localStorage.setItem("user", JSON.stringify(result.data.dados));
            showOkMessage(result).then((result) => {
                if (result.isConfirmed || result.isDismissed) {
                    showList(getLoggedUser());
                    location.reload(); // sem esse location.reload a tela ficava esmaecida e travada, não entendi o pq :/
                }
            });
        })
        .catch((err) => {
            err.response.status == 400 ? showErrMessage(err) : showErrMessage401(err);
        });
}

function deleteTask(index) {
    let loggedUser = JSON.parse(localStorage.getItem("user"));
    let name = loggedUser.name;
    let token = loggedUser.token;

    api.delete("/deleteTask/", {
        params: {
            name,
            token,
            taskIndex,
        },
    })
        .then((result) => {
            localStorage.setItem("user", JSON.stringify(result.data.dados));
            showOkMessage(result).then((result) => {
                if (result.isConfirmed || result.isDismissed) {
                    showList(getLoggedUser());
                    location.reload(); // sem esse location.reload a tela ficava esmaecida e travada, não entendi o pq :/
                }
            });
        })
        .catch((err) => {
            err.response.status == 400 ? showErrMessage(err) : showErrMessage401(err);
        });
}

isLogged();
showList(getLoggedUser());
