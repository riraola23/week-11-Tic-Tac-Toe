let playerText = document.getElementById('playerText') // from html
let restartBtn = document.getElementById('restartBtn') // from html
let boxes = Array.from(document.getElementsByClassName('box')) // from html, will turn into array instead of html format (creates array from array like elements)

let winnerIndicator = getComputedStyle(document.body).getPropertyValue('--winning-blocks') //grab from css, highlights the winner combo

const O_TEXT = "O"
const X_TEXT = "X"
let currentPlayer = X_TEXT // first player
let spaces = Array(9).fill(null) //will fill the box with 'null' so the boxes cant be clicked again and overwritten.

const startGame = () => {
    boxes.forEach(box => box.addEventListener('click', boxClicked))
} // for each of the boxes, when a click happens, the boxclicked functino will start

function boxClicked(e) {
    const id = e.target.id // will save id from boxes clicked. DOM element 'e' is passed. 

    if(!spaces[id]){ // is spaces is equal to null
        spaces[id] = currentPlayer // will fill spaces with current player, not null anymore
        e.target.innerText = currentPlayer // change inner text of spaces to the current player

        if(playerHasWon() !==false){
            playerText.innerHTML = `${currentPlayer} has won!`
            let winning_blocks = playerHasWon()

            winning_blocks.map( box => boxes[box].style.backgroundColor=winnerIndicator)
            // will map the winning combo, and highlight it from css file
            return
        }

        currentPlayer = currentPlayer == X_TEXT ? O_TEXT : X_TEXT // if current player =  Xtext change to Otext or else change it to Xtext
    }
}

const winningCombos = [ //combinations for winning a game
    [0,1,2],            // index of array
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
  //[a,b,c] 
]

function playerHasWon() {
    for (const condition of winningCombos) {
        let [a, b, c] = condition //a/b/c are the spaces in winning combo array

        if(spaces[a] && (spaces[a] == spaces[b] && spaces[a] == spaces[c])) {
            // if array spaces is equal in position a-b-c
            return [a,b,c]
        }
    }
    return false
}

restartBtn.addEventListener('click', restart) // when btn is clicked, restart function will start

function restart() {
    spaces.fill(null) // will change the array space to null "empty"

    boxes.forEach( box => {
        box.innerText = '' // will change physical text to empty
        box.style.backgroundColor='' //change background color back to normal instead of highlighted area
    })

    playerText.innerHTML = 'Tic Tac Toe'

    currentPlayer = X_TEXT //will go back to first player for another game
}

startGame()