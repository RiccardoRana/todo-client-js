const button = document.querySelector(".btn");
const toDoSection = document.querySelector(".toDoSection");
const input = document.querySelector(".input");
const sectionError = document.querySelector(".sectionError");
const URL = "http://localhost:8080/api/todo";


button.addEventListener('click', addToDo);



getAllToDos();



function getAllToDos() {
    axios.get(URL)
        .then((response) => {

            toDoSection.innerHTML = "";
            const elencoToDo = response.data;
            for (let i = 0; i < elencoToDo.length; i++) {
                const cDiv = document.createElement("div");
                cDiv.className = `d-flex justify-content-around mt-3`;
                cDiv.style = `${elencoToDo[i].done ? "text-decoration: line-through; background-color:lightskyblue; width:200px; height:25px; text-align:center; color:white; border-radius:6px; margin-left:38.5%; cursor:pointer;" : " background-color:lightskyblue; width:200px; height:25px; text-align:center; color:white; border-radius:6px; margin-left:38.5%; cursor:pointer;text-decoration: none;"}`
                const p = document.createElement("p");
                p.innerHTML = elencoToDo[i].nameToDo;
                p.setAttribute("ToDoId", elencoToDo[i].id);
                p.addEventListener("click", setToDoDone);



                const img = document.createElement("img");
                img.src = "img/trash.png";
                img.title = "Elimina";
                img.width = 23;
                img.height = 25;
                img.alt = "Elimina";
                img.setAttribute("ToDoId", elencoToDo[i].id);         //memorizzo l'id del corso in un attributo "courseId" dell'immagine
                img.addEventListener("click", deleteToDo);
                cDiv.appendChild(p);
                cDiv.appendChild(img);
                toDoSection.appendChild(cDiv);   // aggiungo il div del corso


            }
        })
        .catch((error) => {
            console.log(error);
        });
}


function deleteToDo(event) {

    let toDoId = event.target.getAttribute("ToDoId");

    axios.delete(URL + "/" + toDoId)
        .then((response) => {
            getAllToDos();
        })
        .catch((error) => {

            console.log(error);

        });

}


function addToDo() {
    if (input.value != "") {
        const newToDo = {
            nameToDo: input.value,
            done: false

        }
        axios.post(URL, newToDo)
            .then((response) => {
                getAllToDos();
                input.value = "";
            })
            .catch((error) => {

                console.log(error);
                sectionError.innerHTML = "Impossibile inserire: " + error.message;
            });
    } else
        alert("Inserisci una nuova cosa da fare!");
}


function setToDoDone(event) {
    let toDoId = event.target.getAttribute("ToDoId");
    axios.put(URL + "/" + toDoId)
        .then((response) => {
            getAllToDos();
        })
        .catch((error) => {
            console.log(error);
            sectionError.innerHTML = error.message;
        })




}



















