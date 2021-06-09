const words = [
    'sigh','tense','airplane','smile','warlike','loving','juice', 'pies', 'dependent', 'feeble', 'admit',
    'highfalutin','north', 'superficial', 'quince', 'drag', 'steer','extravagent'
];

const word = document.getElementById('word');
const text = document.getElementById('text');

const scoreEl = document.getElementById('score');
const timeEl = document.getElementById('time');

const endgameEl = document.getElementById('end-game-container');
const settindbtn = document.getElementById('settings-btn');
const settingsForm = document.getElementById('settings-form');
const difficultySelect = document.getElementById('difficulty');

// init score
let randomWord;
let score = 0;
let time = 10;

let difficulty = localStorage.getItem('difficulty') != null ? localStorage.getItem('difficulty') : 'medium';

difficultySelect.value = localStorage.getItem('difficulty') !== null ? localStorage.getItem('difficulty') : 'medium';

//start counting down

const timeInterval = setInterval(updateTime, 1000);

//generate a random word

function getRandomWord(){
    return words[Math.floor(Math.random() * words.length)];
}

//add word to DOM

function addWordToDOM(){
    randomWord = getRandomWord();
    word.innerHTML = randomWord;
    // console.log(word);
}

function updateScore(){
    score++;
    scoreEl.innerHTML = score;
}

function updateTime(){
    time--;
    timeEl.innerHTML = time + 's';

    if(time === 0){
        clearInterval(timeInterval);
        gameOver();
    }
}

function gameOver(){
    endgameEl.innerHTML = 
    `<h1> Time ran out </h1>
    <p> Your final score is ${score} </p>
    <button onclick ='location.reload()'>Reload</button> `;
    endgameEl.style.display = 'flex';
}

addWordToDOM();

text.addEventListener('input', e => {
    const insertedText = e.target.value;

    if(insertedText === randomWord){
        addWordToDOM();
        updateScore();
        e.target.value ='';

        if(difficulty === 'hard'){
            time += 2;
        }else if(difficulty === 'medium'){
            time += 3;
        }else{
            time += 5;
        }
        updateTime();
    }
});

settindbtn.addEventListener('click', () => settingsForm.classList.toggle('hide'));

settingsForm.addEventListener('change' , e =>{
    difficulty = e.target.value;
    localStorage.setItem('difficulty', difficulty);
});





