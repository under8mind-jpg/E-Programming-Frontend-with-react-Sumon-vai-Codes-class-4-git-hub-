let mainCapital = document.getElementById("total")
let mainCapitalVal = 0

let depositBtn = document.getElementById("depositBtn");
let depositInput = document.getElementById("depositInput");
let depositTotal = document.getElementById("depositTotal");
let totalDep = 0

let withdrawBtn = document.getElementById("withdrawBtn");
let withdrawInput = document.getElementById("withdrawInput");
let withdrawTotal = document.getElementById("withdrawTotal");
let totalWithdraw = 0






function depositValueShow(){

    let depositAmount = Number(depositInput.value);

    if (isNaN(depositAmount) == true || depositAmount < 0) {
        mainCapital.innerText = `Invalid Numbers`
        mainCapital.style.color = "red"
        mainCapital.style.backgroundColor = "white"
        mainCapital.style.padding = "70px"
    }
    else{
        mainCapital.style.backgroundColor = "#059669";
        mainCapital.style.color = "white"
        totalDep = totalDep + depositAmount 
        depositTotal.innerText = `${totalDep.toLocaleString()}$`
        depositInput.value = " "
        mainCapitalVal = mainCapitalVal + depositAmount

        mainCapitalCalc()
    }

}


function withdrawValueShow() {

    let withdrawAmount = Number(withdrawInput.value);

    if (isNaN(withdrawAmount) || withdrawAmount <= 0) {
        alert("Please enter a valid amount.");
        return;
    }

    if (mainCapitalVal < withdrawAmount) {

        mainCapital.innerText = "Your Capital Is Low";
        mainCapital.style.color = "red";
        mainCapital.style.backgroundColor = "white";
        mainCapital.style.padding = "70px";

    } else {

        mainCapital.style.backgroundColor = "#059669";
        mainCapital.style.color = "white"
        totalWithdraw = totalWithdraw + withdrawAmount;
        withdrawTotal.innerText = `${totalWithdraw.toLocaleString()}$`;
        withdrawInput.value = "";
        mainCapitalVal = mainCapitalVal - withdrawAmount;

        mainCapitalCalc();
    }
}

function mainCapitalCalc(){

    mainCapital.innerText = `${mainCapitalVal.toLocaleString()}$`

}




depositBtn.addEventListener("click", depositValueShow)
withdrawBtn.addEventListener("click", withdrawValueShow)

