function readTaskByUserId() {
    api.get(`/task/readTasksByUserId?token=${localStorage.getItem("token")}`)
        .then((result) => {
            showList(result.data.taskList);
        })
        .catch((err) => {
            handleError(err);
        });
}

readTaskByUserId();

function addTask() {
    let description = document.getElementById("description").value;
    let detail = document.getElementById("detail").value;
    let token = JSON.parse(localStorage.getItem("token"));

    api.post("/task/create", {
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
    let description = document.getElementById("floatingDescription" + `'${id}'`).value;
    let detail = document.getElementById("floatingDetails" + `'${id}'`).value;

    api.put("/task/update", {
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
    api.delete(`/task/delete?token=${localStorage.getItem("token")}&id=${id}`)
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
