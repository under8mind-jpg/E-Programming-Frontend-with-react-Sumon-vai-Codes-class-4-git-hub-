

let p1 = document.querySelector(".One")
let p2 = document.querySelector(".Two")
let Switch = document.querySelector(".Switch")


function toggle(){

   if(p1.style.display == "block"){

        p1.style.display = "none"
        p2.style.display = "block"

   }
   else{

        p1.style.display = "block"
        p2.style.display = "none"
   }

}


Switch.addEventListener("click", toggle)


