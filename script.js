
const inputFile = document.getElementById("input-file");
const topBtn = document.getElementById("top-btn");

//for reading input file
inputFile.addEventListener("change", (e) => {
    const fl_file = e.target.files[0];
    let reader = new FileReader(); // built in API

    // Read the file as text.
    reader.readAsText(fl_file);

    reader.onload = function () {
        try {
            // reader.result is actually a string that looks similar to json, JSON.parse coverts json like strings to js objects
            let jsonData = JSON.parse(reader.result);
            // console.log(jsonData);
            //a new event for handling json data is created and dispatched too.
            let event = new CustomEvent("JSONDataLoaded", {
                bubbles: true,
                detail: jsonData,
            })
            document.dispatchEvent(event);
        } catch (e) {
            console.error("JSON Parsing Error: Error is ", e)
        }

    };

    reader.onerror = function () {
        console.log(reader.error);
    };


}, false) // run a callback function when status of inputFile changes, but dont submit the form

document.addEventListener("JSONDataLoaded", (e) => {
    let finalData = [...e.detail];
    alert(finalData.length)
    alert(Object.entries(finalData[0]))

    const tableBody = document.getElementById("table-body");
    const wholeTable = document.querySelector(".table");

    wholeTable.classList.remove("d-none");

    finalData.forEach((data) => {
        // console.log(data);
        const tableData = `<th scope="row">${data.id}</th>` +
            `<td>${data.fname} ${data.lname}</td>` +
            `<td>${data.balance}</td>` +
            `<td><button type="button" class="btn btn-primary" id="${data.id}" data-bs-toggle="modal" data-bs-target="#exampleModal">Details</button></td>`;

        const tableRow = document.createElement("tr");
        tableRow.innerHTML = tableData;
        tableBody.appendChild(tableRow);
    })

    modelDescription(finalData);

})


function modelDescription(fD) {
    let finalData = fD;
    const btns = document.querySelectorAll(".btn-primary");

    const fullName = document.getElementById("full-name");
    const userAge = document.getElementById("user-age");
    const userDetail = document.getElementById("user-detail");

    btns.forEach((btn) => {
        btn.addEventListener("click", () => {
            userDetail.innerHTML = "";
            finalData.forEach((data) => {
                if (btn.id == data.id) { //here, btn.id is string and data.id is number
                    fullName.innerText = data.fname + " " + data.lname + ", ";
                    userAge.innerText = data.age + " ";

                    for (let key in data) {
                        if (key === "fname" || key === "lname" || key === "age") {
                            continue;
                        }
                        let li = document.createElement("li");
                        li.innerText = `${key}: ${data[key]}`;
                        userDetail.appendChild(li);
                    }
                }
            })
        })
    })
}


document.addEventListener("JSONDataLoaded",()=>{
    topBtn.innerText = "File Selected";
    topBtn.style.backgroundColor = "#818CF8";
})



