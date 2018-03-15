let isopen=false;
let opened;
let curropen=0;
function openCard(ev,arr)
{
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

        }
        
        isopen=false;
    }, 2000);
    
    }

}
function shuffle (x)
{

    for (let i=arr.length-1;i>=0;i--)
    {
        let j=Math.floor(Math.random()*(i+1));
        [x[i],x[j]]=[x[j],x[i]];
    }
}
    const elem = document.getElementsByClassName("card");
    let arr=Array.apply(null, {length: 8}).map(Number.call,Number);
    arr=arr.concat(Array.apply(null, {length: 8}).map(Number.call,Number));
    shuffle(arr);
    for (let i=0;i<elem.length;i++)
    {
        elem[i].addEventListener("click",function(){openCard(event,elem)});
        let child = document.createElement("img");
        child.setAttribute("src",`img/${arr[i]+1}.png`);
        elem[i].appendChild(child);
    }