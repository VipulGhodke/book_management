console.log("Script working");
function fetchData()
{
    console.log("data");
    let xhr = new XMLHttpRequest();
    xhr.open("GET", "http://localhost:8080/books", true);
    xhr.onload = function ()
    {
        displayRecords(JSON.parse(xhr.responseText));
    }
    xhr.send();
}
window.onload = fetchData();

function refresh()
{
    location.reload();
}
function displayRecords(records)
{
    // head
    let table = document.getElementById("table");
    let colgroup = document.createElement("colgroup");
    let col = document.createElement('col');
    // col.setAttribute("style", "width:10vw;background:rgb(241,241,241)")
    let col1 = document.createElement('col');
    // col1.setAttribute("style", "width:20vw");
    let col2 = document.createElement('col');
    // col2.setAttribute("style", "width:20vw;background:rgb(241,241,241)");
    let col3 = document.createElement('col');
    // col3.setAttribute("style", "width:20vw")
    let col4 = document.createElement('col');
    // col4.setAttribute("style", "width:30vw;background:rgb(241,241,241)");
    let col5 = document.createElement('col');
    // col5.setAttribute("style", "width:20vw")
    let col6 = document.createElement('col');
    // col6.setAttribute("style", "width:30vw;background:rgb(241,241,241)");
    let col7 = document.createElement('col');
    // col7.setAttribute("style", "width:20vw")
    let col8 = document.createElement('col');
    // col8.setAttribute("style", "width:30vw;background:rgb(241,241,241)");
    let col9 = document.createElement('col');
    // col9.setAttribute("style", "width:20vw")
    let col10 = document.createElement('col');
    // col10.setAttribute("style", "width:30vw;background:rgb(241,241,241)");
    colgroup.appendChild(col);
    colgroup.appendChild(col1);
    colgroup.appendChild(col2);
    colgroup.appendChild(col3);
    colgroup.appendChild(col4);
    colgroup.appendChild(col5);
    colgroup.appendChild(col6);
    colgroup.appendChild(col7);
    colgroup.appendChild(col8);
    colgroup.appendChild(col9);
    colgroup.appendChild(col10);
    table.appendChild(colgroup)
    const headings = Object.keys(records[0]);
    let tr = document.createElement("tr");
    let th = document.createElement('th');
    th.innerHTML = "Sr No.";
    tr.appendChild(th);
    let th1 = document.createElement('th');
    th1.innerHTML = "ID";
    tr.appendChild(th1);
    let th2 = document.createElement('th');
    th2.innerHTML = "TITLE";
    tr.appendChild(th2);
    let th3 = document.createElement('th');
    th3.innerHTML = "AUTHOR";
    tr.appendChild(th3);
    let th4 = document.createElement('th');
    th4.innerHTML = "GENRE";
    tr.appendChild(th4);
    let th6 = document.createElement('th');
    th6.innerHTML = "PUBLICATION YEAR";
    tr.appendChild(th6);
    let th5 = document.createElement('th');
    th5.innerHTML = "LANGUAGE";
    tr.appendChild(th5);
    let th10 = document.createElement('th');
    th10.innerHTML = "PRICE";
    tr.appendChild(th10);
    let th8 = document.createElement('th');
    th8.innerHTML = "ISBN";
    tr.appendChild(th8);
    let th7 = document.createElement('th');
    th7.innerHTML = "PUBLISHER";
    tr.appendChild(th7);
    let th9 = document.createElement('th');
    th9.innerHTML = "RATING";
    tr.appendChild(th9);
    th = document.createElement('th');
    th.innerText = "FUNCTION";
    th.style.borderRadius = '5px';
    tr.appendChild(th);
    table.appendChild(tr);
    console.log(records);
    records.forEach((record, index) =>
    {
        let tr = document.createElement("tr");
        let td = document.createElement('td');
        td.innerText = index + 1;
        tr.appendChild(td);

        headings.forEach(heading =>
        {
            let td = document.createElement('td');
            let input = document.createElement('input');
            input.type = 'text';
            input.name = heading;
            input.value = record[heading];
            input.disabled = true;
            input.setAttribute('class', 'ip' + record.id);
            input.setAttribute('id', 'inputBox');
            td.appendChild(input);
            tr.appendChild(td);
        })
        td = document.createElement('td');
        td.innerHTML = `<div class='rowbtns'><button id='editBtn' class= "editbtn ip${record.id}" onClick="editRecord(${record.id})"> <i class="fa-solid fa-pen"></i></button> <button id='dltBtn' class = "dltbtn ip${record.id}" onClick='deleteRecord(${record.id})'> <i class="fa-solid fa-trash"></i></button></div>`
        td.style.borderRadius = "5px";
        tr.appendChild(td);
        table.appendChild(tr);
    })
    applyTableStyles();
}

function applyTableStyles()
{
    let table = document.getElementById('table');
    table.style.width = '80%';
    table.style.position = 'absolute';
    table.style.marginTop = '10px';
    table.style.marginLeft = '10%';
    table.style.textAlign = 'left';
    table.style.borderCollapse = 'collapse';
    let th = table.querySelectorAll('th');
    th.forEach(header =>
    {
        header.style.padding = '10px';
        header.style.borderBottom = '1px solid rgb(211, 211, 219)';
    });
    let td = table.querySelectorAll('td');
    td.forEach(cell =>
    {
        cell.style.padding = '10px';
        cell.style.borderTop = '1px solid rgb(211, 211, 219)';
    });
    // let col = table.querySelector('col');
}

function searchById()
{
    event.preventDefault();
    let id = document.getElementById("searchById").value;
    console.log(id);
    id.innerText = "";
    if (!id) {
        alert("Enter ID to search")
    } else {
        let xhr = new XMLHttpRequest();
        xhr.open("GET", `http://localhost:8080/books/id=${id}`, true);
        xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xhr.onreadystatechange = function ()
        {
            if (xhr.readyState === 4 && xhr.status === 200) {
                let table = document.getElementById('table');
                table.innerText = "";
                displayRecords(JSON.parse(xhr.responseText));
            } else if (xhr.status === 404) {
                alert(`Book with id ${id} Not Founc`)
            }
        };
        xhr.send();
    }

}
//update
function editRecord(id)
{
    let dltbtn = document.querySelector(`.dltbtn.ip${id}`);
    dltbtn.setAttribute("style", "border-radius: 0");
    dltbtn.setAttribute("style", "border-radius: 0");
    let allfields = document.querySelectorAll(`.ip${id}`);
    console.log(allfields)
    if (allfields[2].parentElement.childElementCount) {
        let savBtn = document.createElement('button');
        savBtn.setAttribute('class', `btn ip${id}`);
        savBtn.setAttribute('id', 'saveBtn');
        savBtn.addEventListener('click', () => updateRecords(allfields));
        savBtn.innerHTML = `<i class="fa-solid fa-circle-arrow-up"></i>`;
        allfields[10].parentElement.appendChild(savBtn);
        allfields[0].disabled = false;
        allfields[0].focus();
        allfields.forEach(ip =>
        {

            if (ip.tagName !== "BUTTON") {
                ip.style.border = "3px solid black"
                ip.style.borderRadius = "4px"
                ip.disabled = false;
            }
        })
        allfields.forEach(ip => ip.addEventListener('keypress', function (event)
        {
            if (event.key === "Enter") {
                updateRecords(allfields);
            }
        }))
    }
}
function updateRecords(fields)
{
    let errorFlag = false;
    fields.forEach(ip =>
    {
        if (ip.tagName !== "BUTTON" && ip.value === '') {
            alert(`${ip.name} Cannot be empty`)
            errorFlag = true;
            return;
        }
    });
    if (!errorFlag) {
        // console.log(fields);
        let className = fields[0].getAttribute('class');
        let match = className.match(/\d+/);
        let id;
        if (match) {
            id = match[0];
        }
        let xhr = new XMLHttpRequest();
        xhr.open("PUT", `http://localhost:8080/books/id=${id}`, true);
        xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        console.log(fields[2].value);
        xhr.onreadystatechange = function ()
        {
            if (xhr.readyState === 4 && xhr.status === 200) {
                let table = document.getElementById('table');
                table.innerText = ""
                fetchData();
                alert('Updates SuccessFully');
                let dltbtn = document.querySelector(`.dltbtn.ip${id}`);
                dltbtn.setAttribute("style", "border-top-right-radius: 5px");
                dltbtn.setAttribute("style", "border-bottom-right-radius: 5px");
            }
        };
        xhr.send(JSON.stringify({
            "id": id,
            "title": fields[1].value,
            "author": fields[2].value,
            "genre": fields[3].value,
            "publication_year": fields[4].value,
            "language": fields[5].value,
            "price": fields[6].value,
            "isbn": fields[7].value,
            "publisher": fields[8].value,
            "rating": fields[9].value,
        }));
    }
}


///deleting Records
function getResponse(id)
{
    let amount = "";
    let xhr = new XMLHttpRequest();
    xhr.open("GET", `http://localhost:8080/books/id=${id}`, true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

    xhr.onload = function ()
    {
        if (xhr.status === 200) {
            console.log(xhr.responseText);
            amount = JSON.parse(xhr.responseText).Amount;
            parseId(id);
        }
    }
    xhr.send();
}

function parseId(id)
{
    let dlttext = document.getElementById('deleteText');
    dlttext.innerHTML = `<h2> Deleting Book with ID: ${id} <h2>`
}
let flag = false;
function showpopup(dltId)
{
    getResponse(dltId)
    let popup = document.getElementById("popup");
    popup.style.display = "block";
    flag = true;
}
let dltId = null;
function deleteRecord(id)
{
    if (!flag) {
        dltId = id
        showpopup(dltId);
    } else {
        console.log("deleting");
        let xhr = new XMLHttpRequest();
        xhr.open("DELETE", `http://localhost:8080/books/id=${dltId}`, true);

        xhr.onreadystatechange = function ()
        {
            if (xhr.readyState === 4 && xhr.status === 200) {
                let table = document.getElementById('table');
                alert('Book Details Deleted');
                fetchData();
                let dlttext = document.getElementById('deleteText');
                dlttext.innerHTML = ""
            }
        };
        xhr.send();
        table.innerText = "";
        fetchData();
        closePopUp();
    }
}
function closePopUp()
{
    let popup = document.getElementById("popup");
    popup.style.display = "none";
    flag = false;
}
function showForm()
{
    let form = document.getElementById("userForm");
    let table = document.getElementById("table");
    table.style.display = 'none';
    form.style.display = "block";
}
function addExpense(event)
{
    event.preventDefault();
    let id = document.getElementById('id');
    let title = document.getElementById('title');
    let author = document.getElementById('author');
    let genre = document.getElementById('genre');
    let publication_year = document.getElementById('publication_year');
    let language = document.getElementById('language');
    let price = document.getElementById('price');
    let isbn = document.getElementById('isbn');
    let publisher = document.getElementById('publisher');
    let rating = document.getElementById('rating');
    // console.log(Name.value + age.value + state.varating

    if (!id.value || !title.value || !author.value || !genre.value || !publication_year.value || !language.value || !price.value || !isbn.value || !publisher.value || !rating.value) {
        alert("fill all required Fields");
        return;
    }
    let xhr = new XMLHttpRequest();
    xhr.open("POST", 'http://localhost:8080/books/', true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.onreadystatechange = function ()
    {
        if (xhr.readyState === 4 && xhr.status === 201) {
            let form = document.getElementById('userForm')
            let table = document.getElementById('table');
            form.style.display = "none";
            table.innerText = "";
            fetchData();
            id.value = "";
            title.value = "";
            author.value = "";
            genre.value = "";
            publication_year.value = "";
            language.value = "";
            price.value = "";
            isbn.value = "";
            publisher.value = "";
            rating.value = "";
            alert("New Book Added")
            table.style.display = "block";

        }
    }
    xhr.send(JSON.stringify({
        "id": id.value,
        "title": title.value,
        "author": author.value,
        "genre": genre.value,
        "publication_year": publication_year.value,
        "language": language.value,
        "price": price.value,
        "isbn": isbn.value,
        "publisher": publisher.value,
        "rating": rating.value,
    }));
}