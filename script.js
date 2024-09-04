


const ticTacToe = 
{
    player1Name: "",
    player2Name: "",
    player1Mark: "x", 
    player2Mark: "y",
    currentPlayer: "x",
    movesPlayed: counter(),
    gameBoard: [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""]
    ],
    gameStatus:"",
    updateTheGameBoardArray: function(cellValue)
    {
        const arr = ["00", "01", "02", "10", "11", "12", "20", "21", "22"];
        const cellValueFromUser = +cellValue;
        const arrayEquivalent = arr[cellValueFromUser];
        console.log(arrayEquivalent);
        if(this.checkIfAlreadyFilled([...arrayEquivalent]) === false)
        {
            this.gameBoard[[...arrayEquivalent[0]]][[...arrayEquivalent[1]]] = "x";
            console.log(this.gameBoard); 
            return "updated";
        }
        else 
        {
            console.log("Already Filled");
            return "not updated";
        }
        
    },
    checkIfAlreadyFilled: function(xyArray)
{
    if(this.gameBoard[+xyArray[0]][+xyArray[1]] !== "")
    {
        return true;
    }
    else
    {
        return false;
    }
},
    assignCurrentPlayerMoves: function()
    {
        if(this.currentPlayer === "x")
        {
            this.currentPlayer = "y";
        }
        else if (this.currentPlayer === "y")
        {
            this.currentPlayer = "x";
        }
    }, 
    updateTheDisplay: function(cell)
    {
        const cellValue = cell.getAttribute("value");
        console.log(cellValue);
        const imgRef = document.querySelector(`.img${cellValue}`);
        console.log(imgRef);
        if(this.currentPlayer === "x")
        {
            imgRef.src = "img/x.png";
        }
        else if (this.currentPlayer === "o")
        {
            imgRef.src = "img/o.png";
        }
    },
    playTheGame: function(cell)
    {
         getTheUserName();
         getTheOpponentChoice();
         addEventListenerToTheCells();
         
    },

    googleGemini: function()
    {
        let geminiChoice = Math.floor(Math.random()* 9);
        while (this.updateTheGameBoardArray(geminiChoice) === "not updated")
        {
            geminiChoice = Math.floor(Math.random() * 9);
        }

        const imgRef = document.querySelector(`.img${geminiChoice}`);
        if(this.currentPlayer === "x")
            {
                imgRef.src = "img/x.png";
            }
            else if (this.currentPlayer === "o")
            {
                imgRef.src = "img/o.png";
            }
    },
}




function addEventListenerToTheCells()
{
    const gameBoardNodes = document.querySelectorAll(".cell");
[...gameBoardNodes].forEach(cell => {
    cell.addEventListener("click", () =>  getWhatCellUserClicked(cell));
});
}

function getTheUserName()
{
    const userInputField = document.querySelector("#uname");
    let userName = userInputField.value;
    userInputField.value = "";
    if(userName === "")
        {
            ticTacToe.player1Name = "player-1";
        }
        else 
        {
            ticTacToe.player1Name = userName;
        }
        console.log(ticTacToe.player1Name);
        const submitButton = document.querySelector(".user-name-submit");
        submitButton.addEventListener("click", getTheUserName);
}


function getTheOpponentChoice() {
    const opponentSelect = document.querySelector('.choice-button select');
    const selectedOption = opponentSelect.value;
    console.log(selectedOption);
    opponentSelect.addEventListener("change", getTheOpponentChoice);
    ticTacToe
}

function getWhatCellUserClicked(cell)
{
    const userCellClickedValue = cell.getAttribute("value");
    console.log(userCellClickedValue);
    ticTacToe.updateTheGameBoardArray(userCellClickedValue);
    ticTacToe.updateTheDisplay(cell);
}

function counter()
{
    let a = 0;
     function actualCounter()
    {
        a++;
        return a;
    }
    return actualCounter;
}




























// Helper Function

function working()
{
    console.log("working");
}