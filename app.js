function openCard(ev)
{
    const givencard=ev.target;
    givencard.classList.add("show");
    console.log(givencard);

}
const elem = document.getElementsByClassName("card");
for (let i=0;i<elem.length;i++){
elem[i].addEventListener("click",function(){openCard(event)});
}