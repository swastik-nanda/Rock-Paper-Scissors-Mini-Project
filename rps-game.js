const rockbutton = document.querySelector("#rockbut");
const paperbutton = document.querySelector("#paperbut");
const scissorbutton = document.querySelector("#scisbut");
const resetbutton = document.querySelector("#resetbut");
const displayscore = document.querySelector(".js-score");
const displayresult = document.querySelector(".js-result");
const displaymove = document.querySelector(".js-moves");
const autoplaybutton = document.querySelector(".autoplaybutton");
let isAutoplaying = false;
let intervalId;

let score = JSON.parse(localStorage.getItem('score'));
if(!score){
 score = {
  wins : 0,
  losses : 0,
  ties : 0
 };
}

updateScoreElement();

document.body.addEventListener("keydown", (event) => {
  if(event.key === "r"){
    playGame("Rock");
  }
  else if(event.key === "p"){
    playGame("Paper");
  }
  else if(event.key === "s"){
    playGame("Scissors");
  }
});

rockbutton.addEventListener("click", () => {
  playGame("Rock");
});
paperbutton.addEventListener("click", () => {
  playGame("Paper");
});
scissorbutton.addEventListener("click", () => {
  playGame("Scissors");
});
resetbutton.addEventListener("click", () => {
  resetScore();
  updateScoreElement();
});
autoplaybutton.addEventListener("click", () => {
 let text = autoplaybutton.textContent;
 if(text === "Auto Play"){
  autoplaybutton.textContent = "Stop Play";
  autoPlay();
 }
 else{
  autoplaybutton.textContent = "Auto Play"
  autoPlay();
 }

});
function pickComputerMove(){
  let randNum = Math.random();
  let computerMove;

  if(randNum >= 0 && randNum < 1/3){
    computerMove = "Rock";
  }
  else if(randNum >= 1/3 && randNum < 2/3){
    computerMove = "Paper";
  }
  else if(randNum >= 2/3 && randNum < 1){
    computerMove = "Scissors";
  }
  return computerMove;
}
function playGame(playerMove){
  const computerMove = pickComputerMove()
  let result;

  if(playerMove == "Rock"){
    if(computerMove === "Rock"){
      result = `Tie!`;
    }
    else if(computerMove === "Paper"){
      result = "You Lose!";
    }
    else if(computerMove === "Scissors"){
      result = "You Win!";
    }
  }
  else if(playerMove == "Paper"){
    if(computerMove === "Rock"){
      result = `You Win!`;
    }
    else if(computerMove === "Paper"){
      result = `Tie!`;
    }
    else if(computerMove === "Scissors"){
      result = `You Lose!`;
    }
  }
  else if(playerMove == "Scissors"){
    if(computerMove === "Rock"){
      result = `You Lose!`;
    }
    else if(computerMove === "Paper"){
      result = `You Win!`;
    }
    else if(computerMove === "Scissors"){
      result = `Tie!`;
    }
  }

  if(result === "You Win!"){
   score.wins += 1;
  }
  else if(result === "You Lose!"){
   score.losses +=1;
  }
  else if(result === "Tie!"){
    score.ties += 1;
  }

  localStorage.setItem('score', JSON.stringify(score));
  updateScoreElement();
  displayresult.innerHTML = result;
  displaymove.innerHTML = ` You <img src="/JavaScript Projects/icons/${playerMove}-emoji.png" class="moveicon">
  <img src="/JavaScript Projects/icons/${computerMove}-emoji.png" class="moveicon"> Computer`;
}

function updateScoreElement(){
  displayscore.innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}
function resetScore(){
  score.wins = 0;
  score.losses = 0;
  score.ties = 0;
  localStorage.removeItem('score');
}
function autoPlay(){
  if(!isAutoplaying){
      intervalId = setInterval(() => {
      const playerMove = pickComputerMove();
      playGame(playerMove);
    }, 1000);
    isAutoplaying = true;
  }
  else{
    clearInterval(intervalId);
    isAutoplaying = false;
  }
 
}
