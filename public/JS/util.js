const api = axios.create({
    baseURL: "https://tasklist-back-crhist0.herokuapp.com", // produção
    // baseURL: "http://localhost:8081", // desenvolvimento
});

// funções

// handlers
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
        title: `${err.response.data.mensagem}`,
    }).then((result) => {
        if (result.isConfirmed || result.isDismissed) {
            localStorage.removeItem("userId");
            localStorage.removeItem("token");
            location.assign(window.location.href.replace("taskList", "index"));
        }
    });
}

function handleError(err) {
    err.response.status == 400
        ? showErrMessage(err)
        : showErrMessage401(err).then((result) => {
              if (result.isConfirmed || result.isDismissed) {
                  location.assign(window.location.href.replace("taskList", "index"));
              }
          });
}
// fim handlers

// faz um auth check
function isLogged() {
    if (localStorage.getItem("token") == null) {
        return Swal.fire({
            icon: "error",
            title: `Nenhum usuário logado`,
        }).then((result) => {
            if (result.isConfirmed || result.isDismissed) {
                location.assign(window.location.href.replace("taskList", "index"));
            }
        });
    }
}

// imprime a lista de tarefas
function showList(taskList) {
    let x = taskList.length;
    y = 0;
    document.getElementById("tBody").innerHTML = "";
    while (x > 0) {
        x--;
        document.getElementById("tBody").innerHTML +=
            '<tr id="tableLine" class="row">' +
            '<td id="table" scope="row indexTable" class="col-1">' +
            (y + 1) +
            "</td>" +
            '<td id="tableDescription' +
            y +
            '" class="col-3"> <p style="max-width: 10vw; overflow: auto; scrollbar-width: thin; ">' +
            taskList[y].description +
            "</p></td>" +
            '<td id="tableDetails' +
            y +
            '" class="col-6"> <p style="max-width: 65vw; overflow: auto; scrollbar-width: thin; ">' +
            taskList[y].detail +
            "</p></td>" +
            '<td class="col-2 d-flex justify-content-end" id="tableAction' +
            y +
            '">' +
            '<button style="margin-right: 8px;" type="button" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#exampleModal' +
            y +
            '">Apagar</button>' +
            '<button id="tableEdit" type="button" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#editModal' +
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
            `'${taskList[y].id}'` +
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
            `'${taskList[y].id}'` +
            '" placeholder=" " value="' +
            taskList[y].description +
            '" >' +
            '<label for="floatingDescription">Descrição</label>' +
            "</div>" +
            '<div class="form-floating">' +
            '<input type="text" class="form-control" id="floatingDetails' +
            `'${taskList[y].id}'` +
            '" placeholder=" " value="' +
            taskList[y].detail +
            '" >' +
            '<label id="detailsHistory" for="floatingDetails">Detalhamento</label>' +
            "</div>" +
            "</div>" +
            '<button style="margin: 0px 16px 0px;" type="button" class="btn btn-secondary"data-bs-dismiss="modal">Cancelar</button>' +
            '<button style="margin: 8px 16px 16px;" type="button" class="btn btn-primary"onclick="saveEdit(' +
            `'${taskList[y].id}'` +
            ')">Salvar</button>' +
            "</div>" +
            "</div>" +
            "</div>";
        y++;
        // detailsHistory.value.innerText = `${detailsHistory}`;
    }
}

// faz logout (apaga token)
function logout() {
    localStorage.removeItem("userId");
    localStorage.removeItem("token");
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
            location.assign(window.location.href.replace("taskList", "index"));
        },
    });
}

// limpa imputs
function deleteAccCreationInputs() {
    document.getElementById("formName").value = "";
    document.getElementById("formPass").value = "";
    document.getElementById("formRepeatPass").value = "";
}
