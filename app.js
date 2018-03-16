let isopen=false, opened, curropen=0, currmoves=0, start=0, timeout,found=0,starsgained=3;
let seconds=0,minutes=0,hours=0,time,copy,arr;

function runModal() // in case of finishing game show Win Modal
{
    
    const modalNode=document.querySelector(".modal-stars");
    for (let i=0;i<starsgained;i++)
    {   const node=document.createElement("li");
        node.setAttribute("class","modal-star");
        const innernode=document.createElement("i");
        innernode.setAttribute("class","fas fa-star");
        node.appendChild(innernode);
        modalNode.appendChild(node);
    }
    const modalTimeNode = document.querySelector(".won-time");
    modalTimeNode.innerHTML=time;
    const movesNode = document.querySelector(".moves-no");
    movesNode.innerHTML=`${currmoves} moves`;
    document.querySelector(".win-modal").classList.add("open");
    console.log(document.querySelector(".win-modal").classList);
}

function makeCopy() // make copy of initial Dom
{
     copy = document.createDocumentFragment();
    const body = document.querySelector("body");
    for (let i = 0; i < body.children.length ; i++)
    {
        const clone = body.children[i].cloneNode(true);
        copy.appendChild(clone); 
    }
}

function openCard(ev,arr) // in case of card press
{
    if (start===0)
    {
        start=1;
        runStopWatch();
    }
    if (curropen==2)return 0;
    const givencard=ev.target;
    
    ev.stopPropagation();
    givencard.classList.add("show");
    setTimeout(()=>{givencard.classList.add("now");}, 200);
    if (isopen==false){
        opened=ev.target;
        isopen=true;
        curropen=1;
    }
    else 
    {
        if (givencard.tagName==="LI")
         curropen=2;
         else return 0;
        const moves=document.querySelector(".moves");
        moves.innerHTML=`${parseInt(moves.innerHTML[0])+1} moves`;
        currmoves++;
        if (currmoves==20)
        {
            document.getElementsByClassName("stars")[0].firstElementChild.remove();
            currmoves=0;
            starsgained--;
        }
        setTimeout(() => {
        if (givencard.firstElementChild.getAttribute("src")!==opened.firstElementChild.getAttribute("src"))
        {
            givencard.classList.remove("show");
            opened.classList.remove("show");
            givencard.classList.add("showing","wrong");
            opened.classList.add("showing","wrong");
            setTimeout(()=> {
            setTimeout(() => {    
            givencard.classList.remove("wrong","now","showing");
            opened.classList.remove("wrong","now","showing");
            }, 100);
            givencard.classList.add("close");
            opened.classList.add("close");
            },1000);
            setTimeout(()=> {
                givencard.classList.remove("close");
                opened.classList.remove("close");
            },2000);
            
            setTimeout(() => {
                curropen=0;
            }, 2100);
            

          
        }
        else {
            givencard.classList.remove("show","now");
            opened.classList.remove("show","now");
            givencard.classList.add("showing","right");
            opened.classList.add("showing","right");
        
            setTimeout(()=> {
            givencard.classList.remove("right");
            opened.classList.remove("right");   
            curropen=0;
            },1000);
            found++;
            if (found==8)
            {
                setTimeout(runModal,1000);
            }

        }
        
        isopen=false;
    }, 2000);
    
    }

}

function shuffle (x) // shuffling Cards pictures
{

    for (let i=arr.length-1;i>=0;i--)
    {
        let j=Math.floor(Math.random()*(i+1));
        [x[i],x[j]]=[x[j],x[i]];
    }
}

function add() // adding one second for the stopwatch
{
    if (start!=1)return 0;
    seconds++;
    time="";
    if (seconds==60)
    {
        seconds=0;
        minutes++;
        if (minutes==60)
        {
            minutes=0;
            hours++;
        }

    }
    if (hours>9)
    {
        time+=hours;
    }
    else {
        time+='0';
        time+=hours;
    }
    time+=':';
    if (minutes>9)
    {
        time+=minutes;
    }
    else 
    {
        time+='0';
        time+=minutes;
    }
    time+=':';
    if (seconds>9)
    {
        time+=seconds;
    }
    else 
    {
        time+='0';
        time+=seconds;
    }
    document.querySelector(".stopwatch").innerHTML="";
    document.querySelector(".stopwatch").innerHTML=time;
    runStopWatch();

}
function shuffleAndAddListners() // adding listners to elements
{
    document.querySelector(".cont").addEventListener("click",function(){ // Modal continue button press 
    
        document.querySelector(".win-modal").classList.remove("open");
    });
    document.querySelector(".rep").addEventListener("click",reset);

    arr = Array.apply(null, {length: 8}).map(Number.call,Number);
    arr = arr.concat(Array.apply(null, {length: 8}).map(Number.call,Number));
    const elem = document.getElementsByClassName("card");
    shuffle(arr);
    for (let i = 0 ; i < elem.length ; i++)
    {
        elem[i].addEventListener("click",function(){openCard(event,elem)}); // adding Event listner for each card
        let child = document.createElement("img");
        child.setAttribute("src",`img/${arr[i]+1}.png`);
        elem[i].appendChild(child);
    }
}
function runStopWatch() // running stopwatch until all cards are opened
{
    if (found==8)return 0;
    if (start!=1){seconds=0;return 0;}
    timeout=setTimeout(add, 1000);
}
function reset() // starting game from begining
{
    document.querySelector("body").remove();
    let newbody=document.createElement("body");
    newbody.appendChild(copy);
    document.querySelector("html").appendChild(newbody);
    isopen=false, curropen=0, currmoves=0, start=0,found=0, starsgained=3;
    seconds=0, minutes=0, hours=0;
    shuffleAndAddListners();
}
    makeCopy();
    shuffleAndAddListners();

    var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    console.log(w);
    console.log(h);
