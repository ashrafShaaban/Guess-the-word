let gamename= "Guess The Word";

document.title=gamename;
document.querySelector("h1").innerHTML=gamename;


let numbersoftrys= 6;
let numbersofletters=6;
let currenttry =1;
let numberofhints =2;

let gethintbtn=document.querySelector(".hint");
document.querySelector(".hint span").innerHTML=numberofhints;

let wordToguess;
let words = ["Ashrof","Create","Upload","Branch",];
wordToguess = words[Math.floor(Math.random() * words.length)].toLowerCase();

function generatinputs(){
    let inputsdiv= document.querySelector('.inputs');
    for(let i =1;i<=numbersoftrys;i++){
      const trydiv = document.createElement("div");
      trydiv.classList.add(`try-${i}`);
      trydiv.innerHTML=`<span>Try ${i}</span>`;

      
   
    if(i !== 1) trydiv.classList.add("disabled-try");

    for(let j=1;j<=numbersofletters;j++){
        let inputletter=document.createElement("input");
        inputletter.type="text";

        inputletter.id=`try-${i}-letter-${j}`;
        inputletter.setAttribute("maxlength","1");

        trydiv.appendChild(inputletter);
    }
    inputsdiv.appendChild(trydiv);
 }
inputsdiv.children[0].children[1].focus();

// disable inputs in disabled try
const disabledintputs = document.querySelectorAll(".disabled-try input");
disabledintputs.forEach((input)=>{
    input.disabled=true;
})
 // make all inputs value upper
 const inputs =document.querySelectorAll(".inputs input");
 inputs.forEach((input,index)=> {
    input.addEventListener("input",function(event){
        input.value =input.value.toUpperCase();
       const nextinput = inputs[index+1];
       if(nextinput ) nextinput.focus();

    })
    input.addEventListener("keydown",function(e){
       const currentindex = Array.from(inputs).indexOf(e.target);
       
      
       if(e.key ===  "ArrowRight"){
        const nextindex=currentindex+1;
        if(nextindex < inputs.length) inputs[nextindex].focus()
       }

       if(e.key ==="ArrowLeft"){
        const previosindex=currentindex-1;
        if(previosindex >= 0) inputs[previosindex].focus()
       }
    
    });
   
 });
}
let checkbtn=document.querySelector(".check-word");
let message = document.querySelector(".message");
checkbtn.addEventListener("click",HandleGuess);
console.log(wordToguess);
function HandleGuess(){
    let SuccessGuess= true;
    console.log(wordToguess);
    for(let i =1;i<=numbersofletters;i++){
        let inputfield=document.querySelector(`#try-${currenttry}-letter-${i}`);
        let letter=inputfield.value.toLowerCase();
        let actualletter = wordToguess[i-1];
        
        if(letter === actualletter){
            inputfield.classList.add("yes-in-place");
        }else if(letter !== "" && wordToguess.includes(letter)){
            inputfield.classList.add("not-in-place");
            SuccessGuess=false;
        }else
        {
            inputfield.classList.add("no");
            SuccessGuess= false;
        }
   }
   if(SuccessGuess === true){
    message.innerHTML = `Congrats,You win the Word is <span>${wordToguess}</span>`;
    if(numberofhints === 2){
        message.innerHTML = `Congrats,You win without using hints`;
    }
    let allinputs = document.querySelectorAll(".inputs > div");
    allinputs.forEach((inp)=>{
        inp.classList.add("disabled-try");
    })
  
    gethintbtn.disabled=true;
    checkbtn.disabled=true;
   }else{
    document.querySelector(`.try-${currenttry}`).classList.add("disabled-try");
    const currentinputstry= document.querySelectorAll(`.try-${currenttry} input`);
    currentinputstry.forEach((input)=>{
        input.disabled = true;
    })

    currenttry++;

    const nextinputstry= document.querySelectorAll(`.try-${currenttry} input`);
      nextinputstry.forEach((input)=>{
        input.disabled = false;
    })

    const element = document.querySelector(`.try-${currenttry}`);
    if(element){
      document.querySelector(`.try-${currenttry}`).classList.remove("disabled-try");
      element.children[1].focus();
     
    }
    else{
        message.innerHTML= `You lose, The Word is <span>${wordToguess}</span>`;
        checkbtn.disabled= true;
    }


   }
}


gethintbtn.addEventListener("click",gethintHandler);


function gethintHandler(){
   if(numberofhints > 0){
    numberofhints --;
    document.querySelector(".hint span").innerHTML=numberofhints;
     
   }
   if(numberofhints === 0){
    gethintbtn.disabled = true;
   }
   const enabledinputs = document.querySelectorAll("input:not([disabled])");

   const emptyenabledinputs = Array.from(enabledinputs).filter((input)=> input.value === "");
   

    if(emptyenabledinputs.length > 0 ){
        let randomindex = Math.floor(Math.random() * emptyenabledinputs.length);
        let randominput=emptyenabledinputs[randomindex];


        let indextofill=Array.from(enabledinputs).indexOf(randominput);
        
        if(indextofill !== -1){
           randominput.value=wordToguess[indextofill].toUpperCase();
        }
       
    }

   
}
function BackspaceHandler(e){
  if(e.key === "Backspace"){
     const inputs =document.querySelectorAll(".inputs input");
     const currentindex = Array.from(inputs).indexOf(document.activeElement);
     if(currentindex >0){
        const currentinput=inputs[currentindex];
        const previosinput=inputs[currentindex -1];
        currentinput.value = "";
        previosinput.value ="";
        previosinput.focus();
     }
  } 
}
document.addEventListener("keydown",BackspaceHandler);
window.onload = function(){
    generatinputs();
}

