function readTaskByUserId() {
    initLoader();
    api.get(`/task/readTasksByUserId?token=${localStorage.getItem("token")}`)
        .then((result) => {
            stopLoader();
            showList(result.data.taskList);
        })
        .catch((err) => {
            handleError(err);
        });
}

readTaskByUserId();

function addTask() {
    initLoader();
    let description = document.getElementById("description").value;
    let detail = document.getElementById("detail").value;
    let token = JSON.parse(localStorage.getItem("token"));

    api.post("/task/", {
        token,
        description,
        detail,
    })
        .then((result) => {
            showOkMessage(result).then((result) => {
                if (result.isConfirmed || result.isDismissed) {
                    readTaskByUserId();
                }
            });
        })
        .catch((err) => {
            handleError(err);
        });
}

function saveEdit(id) {
    initLoader();

    let description = document.getElementById("floatingDescription" + `'${id}'`).value;
    let detail = document.getElementById("floatingDetails" + `'${id}'`).value;

    api.put("/task/", {
        token: localStorage.getItem("token"),
        id,
        description,
        detail,
    })
        .then((result) => {
            showOkMessage(result).then((result) => {
                if (result.isConfirmed || result.isDismissed) {
                    location.reload();
                }
            });
        })
        .catch((err) => {
            handleError(err);
        });
}

function deleteTask(id) {
    initLoader();

    api.delete(`/task/?token=${localStorage.getItem("token")}&id=${id}`)
        .then((result) => {
            showOkMessage(result).then((result) => {
                if (result.isConfirmed || result.isDismissed) {
                    location.reload();
                }
            });
        })
        .catch((err) => {
            handleError(err);
        });
}

isLogged();
