
let up=[false,false,false,false,false,false];
let down=[false,false,false,false,false,false]
const ups=[document.getElementById("cat0up"),
    document.getElementById("cat1up"),
    document.getElementById("cat2up"),
    document.getElementById("cat3up"),
    document.getElementById("cat4up"),
    document.getElementById("cat5up"),
];
const downs = [
    document.getElementById("cat0down"),
    document.getElementById("cat1down"),
    document.getElementById("cat2down"),
    document.getElementById("cat3down"),
    document.getElementById("cat4down"),
    document.getElementById("cat5down"),
]
const displays = [
    document.getElementById("cat0"),
    document.getElementById("cat1"),
    document.getElementById("cat2"),
    document.getElementById("cat3"),
    document.getElementById("cat4"),
    document.getElementById("cat5"),
]
async function votes(catid,disp) {
    const res=await fetch(`https://votecats.onrender.com/votes/${catid}`);
    const votes=await res.json();
    disp.textContent = "Votes: " + votes.vote;
}
async function numvotes(catid){
    const res=await fetch(`https://votecats.onrender.com/votes/${catid}`);
    const votes=await res.json();
    return votes.vote;
}
const downer = async function(down0,up0,display1,num,index){
    if (busy) return;
    try{
    if (!down[index]&&!up[index]){
    down0.style.fill='rgb(255,50,50)';
    up0.style.fill='rgb(0,150,0)';
    down[index]=true;
    const currentVote= await numvotes(num);
    const res=await fetch(`https://votecats.onrender.com/votes/${num}`,{
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ vote: currentVote - 1 })
    });
    const votes=await res.json();
    display1.textContent="Votes: " + votes.vote;
    console.log(votes);
    }
    else if(!down[index]&&up[index]){
    down0.style.fill='rgb(255,50,50)';
    up0.style.fill='rgb(0,150,0)';
    down[index]=true;
    up[index]=false;
    const currentVote= await numvotes(num);
    const res=await fetch(`https://votecats.onrender.com/votes/${num}`,{
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ vote: currentVote - 2 })
    });
    const votes=await res.json();
    display1.textContent="Votes: " + votes.vote;
    console.log(votes);
    }
    else{
    down0.style.fill='rgb(150,0,0)';
    up[index]=false;
    down[index]=false;
    const currentVote= await numvotes(num);
    const res=await fetch(`https://votecats.onrender.com/votes/${num}`,{
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ vote: currentVote + 1 })
    });
    const votes=await res.json();
    display1.textContent="Votes: " + votes.vote;
    console.log(votes);
    }}
    finally{
        busy=false;
    }
}
let busy=false;
const upper = async function(up0,down0,display1,num,index){
    if (busy) return;
    try{
    if (!up[index]&&!down[index]){
    up0.style.fill='rgb(50,255,50)';
    down0.style.fill='rgb(150,0,0)';
    up[index]=true;
    const currentVote= await numvotes(num);
    const res=await fetch(`https://votecats.onrender.com/votes/${num}`,{
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ vote: currentVote + 1 })
    });
    const votes=await res.json();
    display1.textContent="Votes: " + votes.vote;
    console.log(votes);
    }



    else if (!up[index]&&down[index]){
    up0.style.fill='rgb(50,255,50)';
    down0.style.fill='rgb(150,0,0)';
    up[index]=true;
    down[index]=false;
    const currentVote= await numvotes(num);
    const res=await fetch(`https://votecats.onrender.com/votes/${num}`,{
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ vote: currentVote + 2 })
    });
    const votes=await res.json();
    display1.textContent="Votes: " + votes.vote;
    console.log(votes);
    }


    else{
    up0.style.fill='rgb(0,150,0)';
    up[index]=false;
    down[index]=false;
    const currentVote= await numvotes(num);
    const res=await fetch(`https://votecats.onrender.com/votes/${num}`,{
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ vote: currentVote - 1 })
    });
    const votes=await res.json();
    display1.textContent="Votes: " + votes.vote;
    console.log(votes);
    }}
    finally{
        busy=false;
    }
}
for (let i=0;i<ups.length;i++){
    downs[i].addEventListener('click',() =>downer(downs[i],ups[i],displays[i],i+1,i));
    ups[i].addEventListener('click',() =>upper(ups[i],downs[i],displays[i],i+1,i));
}
for (let j=0;j<displays.length;j++){
    votes(j+1,displays[j]);
    console.log("Done");
}
votes(1,displays[0]);
console.log("Done");



const deadline= new Date(2025, 8, 31,23,59);
function ubanner(){
    const now = new Date();
    let time_left= deadline-now;
    if (time_left<=0){
        document.getElementById("banner").textContent = 'Voting is over!';
        clearInterval(timing);
        return;
    }
    const hours= Math.floor(time_left / (1000 * 60 * 60));
    const minutes= Math.floor(time_left / (1000* 60) %60);
    const seconds = Math.floor(time_left / 1000 % 60);
    document.getElementById("banner").textContent = `${hours} hours ${minutes} minutes ${seconds} seconds left to vote!`;
}
ubanner();
const timer = setInterval(ubanner,1000);
console.log("Man, if ur seeing this, you are one hell of a bum. stop hopping on chrome dev! Freak! Also, if ur reading this, vote for rich cat and you will gain aura (young black and rich)")