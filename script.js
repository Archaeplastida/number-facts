//Gets 4 facts about the user inputted number from the API.

const submitButton = document.querySelector("button")
const listToPutItIn = document.getElementById("facts");

function addLi(text, parent) {
    let newLi = document.createElement("li")
    newLi.innerText = text
    parent.append(newLi)
}

submitButton.addEventListener("click", submitButtonEventHandler)


//The old way
// function submitButtonEventHandler(event) {
//     event.preventDefault();
//     numberChosen = document.getElementById("userInput").value;
//     listToPutItIn.innerHTML = ""

//     axios.get(`http://numbersapi.com/${numberChosen}/trivia`)
//         .then(resp => {
//             addLi(resp.data, listToPutItIn)
//             return axios.get(`http://numbersapi.com/${numberChosen}/math`)
//         }
//         )
//         .then(resp => {
//             addLi(resp.data, listToPutItIn)
//             return axios.get(`http://numbersapi.com/${numberChosen}/year`)
//         }
//         )
//         .then(resp => {
//             addLi(resp.data, listToPutItIn)
//             return axios.get(`http://numbersapi.com/${numberChosen}/date`)
//         }
//         )
//         .then(resp => {
//             addLi(resp.data, listToPutItIn)
//         })
//         .catch(err => console.log(err))
// }

//The new way
async function submitButtonEventHandler(event) {
    event.preventDefault();
    numberChosen = document.getElementById("userInput").value;
    listToPutItIn.innerHTML = ""

    let promises = [
        axios.get(`http://numbersapi.com/${numberChosen}/trivia`),
        axios.get(`http://numbersapi.com/${numberChosen}/math`),
        axios.get(`http://numbersapi.com/${numberChosen}/year`),
        axios.get(`http://numbersapi.com/${numberChosen}/date`)
    ]

    let numberFacts = await Promise.all(promises)

    for (let fact of numberFacts) {
        addLi(fact.data, listToPutItIn)
    }
}

//Gets 50 random number facts from one request.


//The old way
// let anotherListToPutIn = document.getElementById("random")

// let randNumbStart = Math.floor((Math.random() * 500))

// axios.get(`http://numbersapi.com/${randNumbStart}..${randNumbStart + 50}`)
//     .then(resp => {
//         for (let x = randNumbStart; x <= randNumbStart + 50; x++) {
//             addLi(resp.data[x], anotherListToPutIn)
//         }
//     }
//     ).catch(err => console.log(err))

//The new way
async function fiftyNumberFacts() {
    let anotherListToPutIn = document.getElementById("random")
    let randNumbStart = Math.floor((Math.random() * 500))
    let theNumbers = await axios.get(`http://numbersapi.com/${randNumbStart}..${randNumbStart + 50}`)

    for (let x = randNumbStart; x <= randNumbStart + 50; x++) {
        addLi(theNumbers.data[x], anotherListToPutIn)
    }
}

fiftyNumberFacts();