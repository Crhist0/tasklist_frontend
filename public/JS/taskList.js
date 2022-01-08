function readTaskByUserId() {
    api.get(`/task/readTasksByUserId?token=${localStorage.getItem("token")}`)
        .then((result) => {
            showList(result.data.taskList);
        })
        .catch((error) => {
            showErrMessage(error).then((result) => {
                if (result.isConfirmed || result.isDismissed) {
                    location.assign(window.location.href.replace("taskList", "index"));
                }
            });
        });
}

readTaskByUserId();

function addTask() {
    try {
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
                showErrMessage(err).then((result) => {
                    if (result.isConfirmed || result.isDismissed) {
                        location.reload();
                    }
                });
            });
    } catch (err) {
        showErrMessage(err).then((result) => {
            if (result.isConfirmed || result.isDismissed) {
                location.reload();
            }
        });
    }
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
            localStorage.setItem("user", JSON.stringify(result.data.dados));
            showOkMessage(result).then((result) => {
                if (result.isConfirmed || result.isDismissed) {
                    location.reload();
                }
            });
        })
        .catch((err) => {
            err.response.status == 400
                ? showErrMessage(err).then((result) => {
                      if (result.isConfirmed || result.isDismissed) {
                          location.assign(window.location.href.replace("taskList", "index"));
                      }
                  })
                : showErrMessage401(err).then((result) => {
                      if (result.isConfirmed || result.isDismissed) {
                          location.assign(window.location.href.replace("taskList", "index"));
                      }
                  });
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
            console.log(err);
        });
}

isLogged();
