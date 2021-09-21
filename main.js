document.querySelector(".button-content span").onclick=function(){

    let yourName=prompt("Enter your Name ! ");
    if(yourName!=="" && yourName!==null){

        document.querySelector(".box-name span").innerHTML=yourName;
        
    }
    else
    {
        document.querySelector(".box-name span").textContent="UnKnown";
       
    }

    document.querySelector(".button-content").remove();

    flipped();
}



// function flippedd 
let back=document.querySelectorAll(".box-contanier-game .block-game");

function flipped()
{
    document.querySelector("#start-ad").play();

    back.forEach((b)=>{
        b.classList.add("is-flipped");
       })
    setTimeout(()=>{
        
       back.forEach((b)=>{
        b.classList.remove("is-flipped");
       })
    },2000)
}

let duration=1000;
let containerBlock=document.querySelector(".box-contanier-game");
let blocks=Array.from(containerBlock.children);
let orderRang=[...Array(blocks.length).keys()];
shuffle(orderRang);
blocks.forEach((b,index)=>{

    b.style.order=orderRang[index];
   b.addEventListener("click",()=>{
       flipBock(b);
   })
})
function flipBock(select){
    select.classList.add("is-flipped");
    let allFlipped=blocks.filter(f=>f.classList.contains("is-flipped"));
    if(allFlipped.length === 2){
        stopClicking()

        checkMachBlock(allFlipped[0],allFlipped[1]);
    }
}


function stopClicking(){
    containerBlock.classList.add("cliking-none");
    setTimeout(()=>{
    containerBlock.classList.remove("cliking-none");

    },duration)
}

function checkMachBlock(fristBlock,secondBlock){
    let triesNum=document.querySelector(".box-tries span");
    if(fristBlock.dataset.num===secondBlock.dataset.num)
    {
       fristBlock.classList.remove("is-flipped");
       secondBlock.classList.remove("is-flipped");

       fristBlock.classList.add("has-match");
       secondBlock.classList.add("has-match");
       document.querySelector("#success").play();
    }
    else
    {
       
        triesNum.textContent=parseInt(triesNum.textContent)+1;
        setTimeout(()=>{
            document.querySelector("#filld").play();
        },100);
       setTimeout(()=>{
           
        fristBlock.classList.remove("is-flipped");
        secondBlock.classList.remove("is-flipped");
       },duration)

       if(triesNum.textContent>25){
        
        document.querySelector(".filld").style.display="block";

         document.querySelector("#error").play();
            setTimeout(()=>{
               window.location.reload();
           },5000)
       }
    }

}
function shuffle(arr){

    let current=arr.length;
    let temp,random;
    while(current >0){
        random=Math.floor(Math.random() * current);
        current--;

        temp=arr[current];
        arr[current]=arr[random];
        arr[random]=temp;

    }
    return arr;
}

function goodplayer(){


    blocks.forEach(b => {
    b.addEventListener("click",()=>{
        let allFlipped=blocks.filter(f=>f.classList.contains("has-match"));
        
        if(allFlipped.length ===20){
    
           document.querySelector("#good").play();
           let banner=document.createElement("div");
           banner.className="banner";
           document.body.appendChild(banner);
        
           setTimeout(()=>{
               window.location.reload();
           },8000)
        }
    }) 
   });

   
}
goodplayer();