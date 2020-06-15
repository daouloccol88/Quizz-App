const url = 'https://opentdb.com/api.php?amount=1';
const answer1 = document.getElementById('answer1');
const answer2 = document.getElementById('answer2');
const answer3 = document.getElementById('answer3');
const answer4 = document.getElementById('answer4');
const pop = document.getElementById('pop')
const difficulty = document.getElementById('difficulty');
const category = document.getElementById('category');
const good = document.getElementById('good');
const bad = document.getElementById('bad');
const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');
const restartButton = document.getElementById('restart');
const questionContainerElement = document.getElementById('question-container');
const questionElement = document.getElementById("question");
const answerButtonsElement = document.getElementById("answer-button");

let goodVar = good.textContent;
let badVar = bad.textContent;
let correctanswer;
setSave();
save();
requestQuestion();


function requestQuestion(){
    fetch(url).then(response => {
        return response.json();
    }).then(data => {
        const results = data.results[0];
        showQuestion(results);
    })
};

function ajout(){
    good.textContent = goodVar;
    bad.textContent = badVar;
}

function setSave(){
    goodVar = localStorage.getItem('good');
    badVar = localStorage.getItem('bad');
    good.textContent = goodVar;
    bad.textContent = badVar;
}

function save(){
    localStorage.setItem('good', good.textContent);
    localStorage.setItem('bad', bad.textContent);
    setSave();

    if(!goodVar&& !goodVar){
        good.textContent = 0;
        bad.textContent = 0;
    }
}

function restart(){
    localStorage.clear();
    good.textContent = 0;
    bad.textContent = 0;
}

restartButton.addEventListener('click', () => {
    restart();
    requestQuestion();
    clearAttribute(answer1);
    clearAttribute(answer2);
    clearAttribute(answer3);
    clearAttribute(answer4);
})

nextButton.addEventListener('click', () => {
    requestQuestion();
    clearAttribute(answer1);
    clearAttribute(answer2);
    clearAttribute(answer3);
    clearAttribute(answer4);
})



function showQuestion(results){
    correctanswer = results.correct_answer;
    let response1 = results.correct_answer;
    let response2 = results.incorrect_answers[0];
    let response3 = results.incorrect_answers[1];
    let response4 = results.incorrect_answers[2];
    let table = [response1,response2,response3,response4];
    pop.classList.add('hide');
    
    
    function shuffle(array) {
        var currentIndex = array.length, temporaryValue, randomIndex;
        while (0 !== currentIndex) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }
              
        return array;
        }
    questionsArr = shuffle(table);
    difficulty.innerHTML = results.difficulty;
    category.innerHTML = results.category;
    questionElement.innerHTML = results.question;
    answer1.innerHTML = questionsArr[0];
    answer2.innerHTML = questionsArr[1];
    answer3.innerHTML = questionsArr[2];
    answer4.innerHTML = questionsArr[3];
    save();
    setSave();
}

function clearAttribute(item){
    item.setAttribute('class','btn btn-block bg-light');
    item.disabled = false;
}

function checkAnswer(item){
    if(item.textContent == correctanswer){
        item.setAttribute('class', 'btn btn-block bg-success');
        goodVar = Number(good.textContent) + 1;
        pop.classList.remove('hide');
    }else if(item.textContent != correctanswer){
        item.setAttribute('class', 'btn btn-block bg-danger');
        badVar = Number(bad.textContent) + 1;
        pop.classList.remove('hide');
    }
}

answer1.addEventListener('click', (event) => {
    event.stopPropagation();
    checkAnswer(answer1);
    ajout();
    event.target.disabled = true;
})
answer2.addEventListener('click', (event) => {
    event.stopPropagation();
    checkAnswer(answer2);
    ajout();
    event.target.disabled = true;
})
answer3.addEventListener('click', (event) => {
    event.stopPropagation();
    checkAnswer(answer3);
    ajout();
    event.target.disabled = true;
})
answer4.addEventListener('click', (event) => {
    event.stopPropagation();
    checkAnswer(answer4);
    ajout();
    event.target.disabled = true;
})