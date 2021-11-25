const api = axios.create({
    baseURL: "https://tasklist-back-crhist0.herokuapp.com",
});

// funções

function showOkMessage(result) {
    return Swal.fire({
        icon: "success",
        title: `${result.data.mensagem}`,
    });
}

function showErrMessage(err) {
    return Swal.fire({
        icon: "error",
        title: `${err.response.data.mensagem}`,
    });
}

function showErrMessage401(err) {
    localStorage.removeItem("user");
    return Swal.fire({
        icon: "error",
        title: `${err.response.data.titulo}`,
        text: `${err.response.data.mensagem}`,
    }).then((result) => {
        if (result.isConfirmed || result.isDismissed) {
            location.assign(window.location.href.replace("taskList", "index")); // TROCAR PELO LINK HEROKU (abaixo)
            // location.assign(window.location.href.replace("createAcc", "")); // o index do heroku não tem index
        }
    });
}

function isLogged() {
    if (localStorage.getItem("user") == null) {
        return Swal.fire({
            icon: "error",
            title: `Nenhum usuário logado`,
        }).then((result) => {
            if (result.isConfirmed || result.isDismissed) {
                location.assign(window.location.href.replace("taskList", "index")); // TROCAR PELO LINK HEROKU (abaixo)
                // location.assign(window.location.href.replace("createAcc", "")); // o index do heroku não tem index
            }
        });
    } else {
        getLoggedUser();
        return true;
    }
}

function getLoggedUser() {
    let loggedUser = JSON.parse(localStorage.getItem("user"));
    console.log(`${loggedUser.name} está logado`);
    return loggedUser;
}

function showList(loggedUser) {
    let taskList = loggedUser.taskList;
    let x = taskList.length;
    y = 0;
    document.getElementById("tBody").innerHTML = "";
    while (x > 0) {
        x--;
        document.getElementById("tBody").innerHTML +=
            '<tr id="tableLine">' +
            '<td id="table" scope="row indexTable">' +
            (y + 1) +
            "</td>" +
            '<td id="tableDescription' +
            y +
            '"> <p style="max-width: 10vw; overflow: auto; scrollbar-width: thin; ">' +
            taskList[y].description +
            "</p></td>" +
            '<td id="tableDetails' +
            y +
            '"> <p style="max-width: 65vw; overflow: auto; scrollbar-width: thin; ">' +
            taskList[y].detail +
            "</p></td>" +
            '<td id="tableAction' +
            y +
            '">' +
            '<button style="margin-right: 8px;" type="button" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#exampleModal' +
            y +
            '">Apagar</button>' +
            '<button id="tableEdit" type="button" class="btn btn-success" ' +
            // 'onclick="editTask(' +
            // y +
            // ')"' +
            'data-bs-toggle="modal" data-bs-target="#editModal' +
            y +
            '">Editar</button>' +
            "</td>" +
            "</tr>" +
            '<div class="modal fade" id="exampleModal' +
            y +
            '" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">' +
            '<div class="modal-dialog">' +
            '<div class="modal-content">' +
            '<div class="modal-header">' +
            '<h5 class="modal-title" id="exampleModalLabel">Apagar tarefa</h5>' +
            '<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">' +
            "</button>" +
            "</div>" +
            '<div class="modal-body">Deseja apagar esta tarefa?</div>' +
            '<div class="modal-footer">' +
            '<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>' +
            '<button id="apagar" type="button" class="btn btn-danger" onclick="deleteTask(' +
            y +
            ')">Apagar</button></div></div></div></div>' +
            '<div class="modal fade" id="editModal' +
            y +
            '" tabindex="-1" aria-labelledby="exampleModalLabel"aria-hidden="true">' +
            '<div class="modal-dialog modal-xl"><div class="modal-content">' +
            '<div class="modal-header">' +
            '<h5 class="modal-title" id="exampleModalLabel">Editar tarefa</h5>' +
            '<button type="button" class="btn-close" data-bs-dismiss="modal"aria-label="Close"></button>' +
            "</div>" +
            '<div class="modal-body">' +
            '<div class="form-floating mb-3">' +
            '<input type="text" class="form-control" id="floatingDescription' +
            y +
            '" placeholder=" " value="' +
            taskList[y].description +
            '" >' +
            '<label for="floatingDescription">Descrição</label>' +
            "</div>" +
            '<div class="form-floating">' +
            '<input type="text" class="form-control" id="floatingDetails' +
            y +
            '" placeholder=" " value="' +
            taskList[y].detail +
            '" >' +
            '<label id="detailsHistory" for="floatingDetails">Detalhamento</label>' +
            "</div>" +
            "</div>" +
            '<button style="margin: 0px 16px 0px;" type="button" class="btn btn-secondary"data-bs-dismiss="modal">Cancelar</button>' +
            '<button style="margin: 8px 16px 16px;" type="button" class="btn btn-primary"onclick="saveEdit(' +
            y +
            ')">Salvar</button>' +
            "</div>" +
            "</div>" +
            "</div>";
        y++;
        // detailsHistory.value.innerText = `${detailsHistory}`;
    }
}

function logout() {
    localStorage.removeItem("user");
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
            location.assign(window.location.href.replace("taskList", "index")); // TROCAR PELO LINK HEROKU (abaixo)
            // location.assign(window.location.href.replace("createAcc", "")); // o index do heroku não tem index
        },
    });
}
