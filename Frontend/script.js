
const up0=document.getElementById("cat0up");
let up=[false,false,false,false,false];
let down=[false,false,false,false,false]
const down0=document.getElementById("cat0down");
const display1= document.getElementById("cat1");

async function votes(catid,disp) {
    const res=await fetch(`http://localhost:3000/votes/${catid}`);
    const votes=await res.json();
    disp.textContent = "Votes: " + votes.vote;
}
async function numvotes(catid){
    const res=await fetch(`http://localhost:3000/votes/${catid}`);
    const votes=await res.json();
    return votes.vote;
}
down0.addEventListener("click",function() {
    down0.style.fill='rgb(255,50,50)'
    up[0]=false;
    down[0]=true;
})
up0.addEventListener('click', async () => {

    up0.style.fill='rgb(50,255,50)'
    up[0]=true;
    down[0]=false;

    const currentVote= await numvotes(1);
    const res=await fetch(`http://localhost:3000/votes/${1}`,{
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ vote: currentVote + 1 })
    });
    const votes=await res.json();
    display1.textContent="Votes: " + votes.vote;
    console.log(votes);
})
votes(1,display1)