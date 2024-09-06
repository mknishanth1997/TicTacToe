


const ticTacToe = 
{
    player1Name: "",
    player2Name: "",
    player1Mark: "x", 
    player2Mark: "y",
    currentPlayer: "x",
    movesPlayed: 0,
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
        // console.log(arrayEquivalent);
        if(this.checkIfAlreadyFilled([...arrayEquivalent]) === false)
        {
            this.gameBoard[[...arrayEquivalent[0]]][[...arrayEquivalent[1]]] = this.currentPlayer;
            // console.log(this.gameBoard); 
            this.movesPlayed++;
            // console.log(this.movesPlayed);
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
        // console.log(cellValue);
        const imgRef = document.querySelector(`.img${cellValue}`);
        imgRef.src = "img/x.png";
    },
    playTheGame: function(cell)
    {
        if(this.checkTheWinner()[0] === "won")
        {
            console.log("Winner: Game Ended");
            this.announeTheWinner(this.checkTheWinner()[1]);
            removeClicks();
        }
        else
        {
            if(this.movesPlayed < 9)
            {
                console.log("No Winner: Play The Computer Move");
                this.assignCurrentPlayerMoves();
                if(this.player2Name === "gemini")
                {
                    this.googleGemini();
                }
                else if (this.player2Name === "chatgpt")
                {
                    this.chatGpt();
                }
                else if (this.player2Name === "human")
                {
                    this.human();
                    return;
                }
                if(this.checkTheWinner()[0] === "won")
                {
                    this.announeTheWinner();
                    console.log("winner: Pc part Game Ending");
                    this.announeTheWinner(this.checkTheWinner()[1]);
                    removeClicks();
                }
                else 
                {
                    this.assignCurrentPlayerMoves();
                }
            }
            else
            {
                console.log("It's a Godamnn Tie");
                removeClicks();
                const winnerDisplay = document.querySelector(".gwd");
                winnerDisplay.textContent = `It's a Tie`;
            }
        }
        console.log(this.gameBoard);
    },

    googleGemini: function()
    {
            let geminiChoice = Math.floor(Math.random()* 9);
            while (this.updateTheGameBoardArray(geminiChoice) === "not updated")
            {
                geminiChoice = Math.floor(Math.random() * 9);
            }
    
            const imgRef = document.querySelector(`.img${geminiChoice}`);
            imgRef.src = "img/o.png";
            return geminiChoice;
    },

    checkTheWinner: function()
    {
        // checking Rows:
         for (let index = 0; index < 3; index++) {  
            if(this.gameBoard[index][0] === this.gameBoard[index][1] && this.gameBoard[index][1] === this.gameBoard[index][2] && this.gameBoard[index][0] !== "")
                {
                    console.log('Row Win');
                    return ["won", this.gameBoard[index][0], index, "row"]; 
                    // this.gameBoard[index][0];
                }  
        }
    
        // Checking Columns:
    
        for (let i = 0; i < 3; i++) {
            if(this.gameBoard[0][i] === this.gameBoard[1][i] && this.gameBoard[1][i] === this.gameBoard[2][i] && this.gameBoard[0][i] !== "")
            {
                console.log('Col win');
                return ["won", this.gameBoard[0][i], i, "col"];
            }
        }
    
        // Check Diagonals:
    
        if (this.gameBoard[0][0] === this.gameBoard[1][1] && this.gameBoard[1][1] === this.gameBoard[2][2] && this.gameBoard[0][0] !== "")
        {
            console.log('1st Diag win');
            return ["won", this.gameBoard[0][0], 11, "1d"];
        }
    
        if (this.gameBoard[0][2] === this.gameBoard[1][1] && this.gameBoard[1][1] === this.gameBoard[2][0] && this.gameBoard[0][2] !== "")
        {
            console.log('2nd Diag win');
            return ["won", this.gameBoard[0][2], 22, "2d"];
        }
    
        return ["not-won", 11];
    },

    announeTheWinner: function(winner)
    {
        console.log("announcing the Winner", winner);
        
        const winnerDisplay = document.querySelector(".gwd");
        if(winner === "x")
        {
            winnerDisplay.textContent = `${this.player1Name} Is The Winner`;
        }
        else if (winner === "y")
        {
            winnerDisplay.textContent = `${this.player2Name} is The Winner`;
        }
        this.colorTheWinner();
    },
    colorTheWinner: function()
    {
        // removeClicks();
        const winner = this.checkTheWinner();
        const wahtIsWinner = winner[3];
        console.log("color the winner");
        const rowRep = 
        [
            ["cell0", "cell1", "cell2"],
            ["cell3", "cell4", "cell5"],
            ["cell6", "cell7", "cell8"]
        ];
        const colRep = 
        [
            ["cell0", "cell3", "cell6"],
            ["cell1", "cell4", "cell7"],
            ["cell2", "cell5", "cell8"]
        ];

        if (wahtIsWinner === "2d" || wahtIsWinner === "1d")
        {
            if (wahtIsWinner === "1d")
            {
                const one = document.querySelector(".cell0");
                const two = document.querySelector(".cell4");
                const three = document.querySelector(".cell8");
                one.style.backgroundColor = "green";
                two.style.backgroundColor = "green";
                three.style.backgroundColor = "green";
            }
            else if (wahtIsWinner === "2d")
            {
                const one = document.querySelector(".cell2");
                const two = document.querySelector(".cell4");
                const three = document.querySelector(".cell6");
                one.style.backgroundColor = "green";
                two.style.backgroundColor = "green";
                three.style.backgroundColor = "green";
            }
        }
        else if (wahtIsWinner === "row" || wahtIsWinner === "col")
        {
            if (wahtIsWinner === "row")
            {
                for (let i = 0; i < 3; i++) {
                    let imgRef = document.querySelector(`.${rowRep[winner[2]][i]}`);
                    imgRef.style.backgroundColor = "greenyellow";
                }
            }
            else if (wahtIsWinner === "col")
            {
                for (let i = 0; i < 3; i++) {
                    let imgRef = document.querySelector(`.${colRep[winner[2]][i]}`);
                    imgRef.style.backgroundColor = "greenyellow";
                }
            }
        }
    }, 

    chatGpt: function()
    {
        let bestScore = -Infinity;
        let bestMove;
    
        // Loop through each cell to evaluate the best move
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (this.gameBoard[i][j] === "") {
                    // Try a move for AI (player2)
                    this.gameBoard[i][j] = this.player2Mark;
                    this.movesPlayed++;
                    let score = this.minimax(this.gameBoard, 0, false); // Minimax call
                    this.gameBoard[i][j] = ""; // Undo move
                    this.movesPlayed--;
                    
                    // Pick the move with the highest score
                    if (score > bestScore) {
                        bestScore = score;
                        bestMove = { i, j };
                    }
                }
            }
        }
    
        // Make the best move
        this.gameBoard[bestMove.i][bestMove.j] = this.player2Mark;
        this.movesPlayed++;
    
        // Update the display for AI move
        const cellIndex = bestMove.i * 3 + bestMove.j; // Convert 2D index to 1D index
        const imgRef = document.querySelector(`.img${cellIndex}`);
        imgRef.src = "img/o.png";
    
        return cellIndex;
    },

    minimax: function(board, depth, isMaximizingPlayer) {
        let winnerCheck = this.checkTheWinner();
        
        // Base cases: return scores based on game outcome
        if (winnerCheck[0] === "won") {
            if (winnerCheck[1] === this.player2Mark) {
                return 10 - depth; // If the AI wins, return a positive score
            } else if (winnerCheck[1] === this.player1Mark) {
                return depth - 10; // If the player wins, return a negative score
            }
        } else if (this.movesPlayed === 9) {
            return 0; // Tie condition
        }
        
        if (isMaximizingPlayer) {
            let bestScore = -Infinity;
            
            // Loop through each cell on the board
            for (let i = 0; i < 3; i++) {
                for (let j = 0; j < 3; j++) {
                    if (board[i][j] === "") {
                        // Try a move for the maximizing player (AI)
                        board[i][j] = this.player2Mark;
                        this.movesPlayed++;
                        let score = this.minimax(board, depth + 1, false); // Recursive call
                        board[i][j] = ""; // Undo move
                        this.movesPlayed--;
                        bestScore = Math.max(score, bestScore); // Keep track of the best score
                    }
                }
            }
            return bestScore;
        } else {
            let bestScore = Infinity;
            
            // Loop through each cell on the board
            for (let i = 0; i < 3; i++) {
                for (let j = 0; j < 3; j++) {
                    if (board[i][j] === "") {
                        // Try a move for the minimizing player (human)
                        board[i][j] = this.player1Mark;
                        this.movesPlayed++;
                        let score = this.minimax(board, depth + 1, true); // Recursive call
                        board[i][j] = ""; // Undo move
                        this.movesPlayed--;
                        bestScore = Math.min(score, bestScore); // Keep track of the worst score for the opponent
                    }
                }
            }
            return bestScore;
        }
    },
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
    ticTacToe.player2Name = selectedOption;
}

function getWhatCellUserClicked(cell)
{
    const userCellClickedValue = cell.getAttribute("value");
    console.log(`getWhatuserclicked${userCellClickedValue}`);
    if (!userCellClickedValue) {
        console.log('Error: Cell value is null or undefined.');
        return; // Return early to avoid further processing
    }
    if(ticTacToe.updateTheGameBoardArray(userCellClickedValue) === "updated")
    {
        console.log("going in");
        ticTacToe.updateTheDisplay(cell);
        ticTacToe.playTheGame();
    }
    else
    {
        console.log('The Cell Is Already Filled');
    }
}

function startTheGame()
{
    const start = document.querySelector(".start");
    start.addEventListener("click", () => 
    {
        if(ticTacToe.movesPlayed === 0)
        {
            // getTheUserName();
            getTheOpponentChoice();
            addEventListenerToTheCells();
            ticTacToe.currentPlayer = "x";
            // ticTacToe.movesPlayed++;
            playerDisplay();
        }
        else if(ticTacToe.movesPlayed > 0)
        {
            console.log("Game is Being Played");
        }

    });
}

function resetTheGame()
{
    document.querySelector(".reset").
    addEventListener("click", () => location.reload());
}




// Step 1: Create a named function that handles the cell click
function handleCellClick(event) {
    const cell = event.target;
    getWhatCellUserClicked(cell); // Call your original function
}

// Step 2: Modify the function that adds event listeners to use the named function
function addEventListenerToTheCells() {
    const gameBoardNodes = document.querySelectorAll(".cell");
    [...gameBoardNodes].forEach(cell => {
        cell.addEventListener("click", handleCellClick); // Use named function
    });
}

// Step 3: Modify the function that removes event listeners to use the named function
function removeClicks() {
    console.log("Remove Event Listener");
    const gameBoardNodes = document.querySelectorAll(".cell");
    [...gameBoardNodes].forEach(cell => {
        cell.removeEventListener("click", handleCellClick); // Use the same named function
    });
}

function playerDisplay()
{
    console.log("player vs player");
    const pd = document.querySelector(".pvsp");
    pd.textContent = `${ticTacToe.player1Name} VS ${ticTacToe.player2Name}`;
}

startTheGame();
resetTheGame();
getTheUserName();



