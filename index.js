//variables declared for html elements
const cells = document.querySelectorAll(".cell")
const statusText = document.querySelector("#statusText")
const restartBtn = document.querySelector("#restartBtn")

//scoreboard span tags in html
var xWinsTrackerSpanTag = document.getElementById("xScoreData")
var oWinsTrackerSpanTag = document.getElementById("oScoreData")
var tieTrackerSpanTag = document.getElementById("tieScoreData")

//scoreboard value defaults
xWinsTrackerSpanTag.textContent = 0;
oWinsTrackerSpanTag.textContent = 0;
tieTrackerSpanTag.textContent = 0;

//win conditions set by using arrays
const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

//this block of code helps set start of program
let options = ["", "", "", "", "", "", "", "", ""]
let currentPlayer = "X"
let running = false;

//game function
function initializeGame() {
    cells.forEach(cell => cell.addEventListener("click", cellClicked))
    restartBtn.addEventListener("click", restartGame)
    statusText.textContent = `${currentPlayer}'s turn`
    running = true
}
//what happens when cell clicked here and how to keep game running
function cellClicked() {
    const cellIndex = this.getAttribute("cellIndex")

    if (options[cellIndex] != "" || !running) {
        return
    }
    updateCell(this, cellIndex)
    checkWinner()
}
//updateCell and changePlayer function help make cell either
//o or x.

function updateCell(cell, index) {
    options[index] = currentPlayer
    cell.textContent = currentPlayer
}
function changePlayer() {
    currentPlayer = (currentPlayer == "X") ? "O" : "X"
    statusText.textContent = `${currentPlayer}'s turn`
}
function checkWinner() {
    let roundWon = false
//loop is used to apply all possible win conditons by the array index.
    for (let i = 0; i < winConditions.length; i++) {
        const condition = winConditions[i];
        const cellA = options[condition[0]]
        const cellB = options[condition[1]]
        const cellC = options[condition[2]]

        if (cellA == "" || cellB == "" || cellC == "") {
            continue
        }
        if (cellA == cellB && cellB == cellC) {
            roundWon = true

            break
        }
    }
    if (roundWon) {
        statusText.textContent = `${currentPlayer} wins!`
        if (currentPlayer === "X"){
            xWinsTrackerSpanTag.textContent++
        }else {
            oWinsTrackerSpanTag.textContent++
        }
        running = false
        
    } else if (!options.includes("")) {
        statusText.textContent = `Battle again Samurais!`
        tieTrackerSpanTag.textContent++
        running = false
        
    }
    else {
        changePlayer()
    }


}
//restarts game here
function restartGame() {
    currentPlayer = "X"
    options = ["", "", "", "", "", "", "", "", ""]
    statusText.textContent = `${currentPlayer}'s turn`
    cells.forEach(cell => cell.textContent = "")
    running = true
}
//calls largest function here
initializeGame()