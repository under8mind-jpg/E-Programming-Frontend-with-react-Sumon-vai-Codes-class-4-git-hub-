
let playerOneInput = document.querySelector(".playerOneInput")
let playerOneSubmit = document.querySelector(".switch")

let playerTwoInput = document.querySelector(".playerTwoInput")
let playerTwoSubmit = document.querySelector(".playerTwoSubmit")
let playerOneValue = ""
let playerTwoValue = ""

function hideP2X(){    
    document.querySelector(".playerOne").style.display = "none"
    document.querySelector(".playerTwo").style.display = ""

    playerOneValue = playerOneInput.value 
    playerOneInput.value = ""

}

function compare(){
    playerTwoValue = playerTwoInput.value
     playerTwoInput.value = ""

    if (parseInt(playerOneValue) == parseInt(playerTwoValue)){
        document.querySelector(".result").innerText = "Success"
    }
    else{
         document.querySelector(".result").innerText = "Failed"
    }

}

document.querySelector(".switch").addEventListener('click', hideP2X)
document.querySelector(".playerTwoSubmit").addEventListener('click', compare)

