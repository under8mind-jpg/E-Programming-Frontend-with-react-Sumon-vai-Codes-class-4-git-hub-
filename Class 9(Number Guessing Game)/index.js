
let playerOneInput = document.querySelector(".playerOneInput")
let playerOneSubmit = document.querySelector(".switch")

let playerTwoInput = document.querySelector(".playerTwoInput")
let playerTwoSubmit = document.querySelector(".playerTwoSubmit")
let playerOneValue = ""
let playerTwoValue = ""

let failedAttempts = 0

function hideP1X(){    

    
    if (isNaN(Number(playerOneInput.value)) == true || playerOneInput.value == "" || playerOneInput.value >= 11 ||playerOneInput.value < 0){

       document.querySelector(".result").innerHTML = "<b>Error: </b>Input Numbers between 0 to 10"
       document.querySelector(".result").style.color = "red"

    }

    else{

         document.querySelector(".playerOne").style.display = "none"
         document.querySelector(".playerTwo").style.display = ""
         document.querySelector(".result").innerHTML = "Player Two's Turn"
         document.querySelector(".result").style.color = "green"

         playerOneValue = playerOneInput.value 
         playerOneInput.value = ""

    }

}

function compare(){
    playerTwoValue = playerTwoInput.value
    playerTwoInput.value = ""

    if (parseInt(playerOneValue) == parseInt(playerTwoValue)){
        document.querySelector(".result").innerText = "Player 2 Win!"
        document.querySelector(".playerTwo").style.display = "none"

    }
    else{
         failedAttempts++
         document.querySelector(".result").innerText = `Try Again ${failedAttempts}/5`
         if(failedAttempts == 5){
              document.querySelector(".result").innerText = "Player 1 Win!"
              document.querySelector(".result").style.color = "red"
              document.querySelector(".playerTwo").style.display = "none"
         }

    }

}

document.querySelector(".switch").addEventListener('click', hideP1X)
document.querySelector(".playerTwoSubmit").addEventListener('click', compare)

