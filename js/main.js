//when typed on the box, we should receive what words input
//variables
const wordInput = document.querySelector('.word-input');
const wordDisplay = document.querySelector('.word-display');
const scoreDisplay = document.querySelector('.score');
const timeDisplay = document.querySelector('.time');
const button = document.querySelector('.button');
const Game_Time = 3;
let score = 0;
let time = Game_Time;
let timeInterval ;
let words =[];
let checkInterval;
let isPlaying =false;
init();



//function
function init(){
    
    buttonChange("로딩 중...");
    getWords();  
    wordInput.addEventListener('input',checkMatch)  //addEventListener( event, function)
}
//run game
function run(){
    if(isPlaying) return;
    isPlaying=true;
    score=0;
    time = Game_Time;
    wordInput.focus();
    scoreDisplay.innerText=0;
    timeInterval= setInterval(countDown,1000); // countDown every 1 second
    checkInterval = setInterval(checkStatus,50);
    buttonChange("---게임 중---");// is not 게임 시작, so it can be clicked.(회색 아이콘)

}

function checkStatus(){
    if(!isPlaying && time === 0 ){
        buttonChange("게임 시작");
        clearInterval(checkInterval);
    }
}

//call words
function getWords(){
    axios.get('https://random-word-api.herokuapp.com/word?number=100')
    .then(function (response) {
        // handle success
        console.log(response);
        response.data.forEach(word => {
            if(word.length<10){
                words.push(word)
            }
        });
        buttonChange("게임 시작");
        }) 
    .catch(function (error) {
        // handle error
        console.log(error);
        });
}

//compare words
function checkMatch(){
    if(wordInput.value.toLowerCase() === wordDisplay.innerText.toLowerCase()) { //compare input
        // innerHTML = context in html, trim() = clear all blank 
        // but we use innerText = only text in html 
        wordInput.value = "";
        if(!isPlaying){
            return;
        }
        score++; 
        scoreDisplay.innerText = score;
        time = Game_Time;
        const randomIndex = Math.floor(Math.random()*words.length);
        wordDisplay.innerText = words[randomIndex];
    }
}



function countDown(){
    time > 0 ?  time-- : isPlaying = false;
    if(!isPlaying){ //if isplaying = True, clearInterval
        clearInterval(timeInterval);
    }
    timeDisplay.innerText = time;
}

function buttonChange(text){
    button.innerText = text;
    text === '게임 시작' ?  button.classList.remove('loading') : button.classList.add('loading');
}