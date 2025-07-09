const game = document.getElementById('game');
const scoreDisplay = document.getElementById('score');
let score = 0
const genres = [
    {
        name: 'Books',
        id: 10
    },
    {
        name: 'Film',
        id: 11
    },
    {
        name: 'Music',
        id: 12
    },
    {
        name: 'Video Games',
        id: 15
    }
];
const levels = ['easy','medium','hard'];
function addGenre(genre){
    const div1 = document.createElement('div');
    div1.classList.add('genre-column');
    div1.innerHTML = genre.name
    game.append(div1)
    levels.forEach(level => {
        const div2 = document.createElement('div');
        div2.classList.add('card');
        div1.append(div2);
        if (level === 'easy') {
            div2.innerHTML = 100;
        }
        if (level === 'medium') {
            div2.innerHTML = 200;
        }
        if (level === 'hard') {
            div2.innerHTML = 300;
        }
        fetch(`https://opentdb.com/api.php?amount=1&category=${genre.id}&difficulty=${level}&type=boolean`)
            .then(response => response.json())
            .then(data => {
                div2.setAttribute('data-question',data.results[0].question);
                div2.setAttribute('data-answer',data.results[0].correct_answer);
                div2.setAttribute('data-value',div2.getInnerHTML);
            })
            .then(done => div2.addEventListener('click',flipCard));
    })
}
genres.forEach(genre => addGenre(genre))
function flipCard() {
    this.innerHTML = "";
    this.style.fontSize = '15px';
    const textDisplay = document.createElement('div');
    const trueButton = document.createElement('button');
    const falseButton = document.createElement('button');
    trueButton.innerHTML = 'True';
    falseButton.innerHTML = 'False';
    trueButton.classList.add('true-button');
    falseButton.classList.add('false-button');
    trueButton.addEventListener('click',getResult);
    falseButton.addEventListener('click',getResult);
    textDisplay.innerHTML = this.getAttribute('data-question');
    this.append(textDisplay,trueButton,falseButton);
    const allCards = Array.from(document.querySelectorAll('.card'));
    allCards.forEach(card => card.removeEventListener('click',flipCard));
}
function getResult(){
    const allCards = Array.from(document.querySelectorAll('.card'));
    allCards.forEach(card => card.addEventListener('click',flipCard));
    const cardOfButton = this.parentElement;
    if(cardOfButton.getAttribute('data-answer') === this.innerHTML){
        score = score + parseInt(cardOfButton.getAttribute('data-value'));
        scoreDisplay.innerHTML = score
        cardOfButton.classList.add('correct-answer');
        setTimeout(() => {
            while(cardOfButton.firstChild){
                cardOfButton.removeChild(cardOfButton.lastChild);
            }
            cardOfButton.innerHTML = cardOfButton.getAttribute('data-value');
        },100)
    }else {
        cardOfButton.classList.add('wrong-answer');
        setTimeout(() => {
            while(cardOfButton.firstChild){
                cardOfButton.removeChild(cardOfButton.lastChild);
            }
            cardOfButton.innerHTML = 0;
        },100)
    }
    cardOfButton.removeEventListener('click',flipCard);
}