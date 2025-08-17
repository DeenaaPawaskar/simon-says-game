let gameSeq=[];
let userSeq=[];
let h3=document.querySelector("h3");

let btns=["yellow","red","green","purple"];

// start the game initial flash

let started=false;
let level=0;

document.addEventListener("keypress",function(){
    if(started==false){
        started=true;
        console.log("game has started");

        levelUp();
    }
});

function btnFlash(btn){
  btn.classList.add("flash");

  setTimeout(function(){
    btn.classList.remove("flash")},300);
};

function userFlash(btn){
    btn.classList.add("userflash");
  
    setTimeout(function(){
      btn.classList.remove("userflash")},200);
  };

async function levelUp(){
    level++;
    userSeq=[];
    h3.innerText = `Level ${level}`;

    // Wait until popup finishes
    await showPopup(`Level ${level}`, 1000);

    await delay(1000);

    let randInd = Math.floor(Math.random()*4);
    let randColor = btns[randInd];
    let randbtn = document.querySelector(`.${randColor}`);

    gameSeq.push(randColor);
    console.log(randColor);

    btnFlash(randbtn);
};

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}



// event listener for button pressed

function btnPress(){
    let btn = this;
    userFlash(btn);

    userColor = btn.getAttribute("id");
    console.log(userSeq);
    console.log(gameSeq);
    userSeq.push(userColor);
    checkAns(userSeq.length-1);

};

let allBtns = document.querySelectorAll(".btn");

for(btn of allBtns){
    btn.addEventListener("click",btnPress);
}

// sequence arrangement in array
function checkAns(idx){
    
    if(userSeq[idx]===gameSeq[idx]){

        if(userSeq.length==gameSeq.length){
            setTimeout(levelUp,1000);
        }

    }else{
        score();
        h3.innerText="Game Over! Press key to start again";

        let wrong = document.querySelector("body");
        wrong.classList.add("wrong");

        setTimeout(() => {
        wrong.classList.remove("wrong");
        }, 150);
        
        reset();
    }

}

// reset score

function reset(){
    started=false;
    gameSeq=[];
    userSeq=[];
    level=0;
}

function score(){
        showPopup(`Game Over ! Your score is ${level} `, 2000);   
}

function showPopup(message, duration=2000) {
    return new Promise((resolve) => {
        let popup = document.createElement("div");
        popup.classList.add("popup");
        popup.innerText = message;

        if(message.startsWith("Game Over")) {
        popup.style.backgroundColor = "#FF8C00"; 
        popup.style.color = "black";    
        popup.style.border="2px , solid ,black";
        popup.style.fontSize="2 rem";         
        }


        document.body.appendChild(popup);

        setTimeout(() => { 
            popup.remove(); 
            resolve(); 
        }, duration);
    });
}

