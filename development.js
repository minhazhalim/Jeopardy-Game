const game = document.getElementById('game');
const scoreDisplay = document.getElementById('score-display');
let score = 0;
const genres = [
     {
          name: 'Books',
          id: 10,
     },
     {
          name: 'Film',
          id: 11,
     },
     {
          name: 'Music',
          id: 12,
     },
     {
          name: 'Video Games',
          id: 15,
     },
];
const levels = ['easy','medium','hard'];
function flipCard(){
     this.innerHTML = "";
     this.style.fontSize = '15px';
     const div3 = document.createElement('div');
     const button1 = document.createElement('button');
     const button2 = document.createElement('button');
     button1.innerHTML = 'True';
     button2.innerHTML = 'False';
     button1.classList.add('true-button');
     button2.classList.add('false-button');
     button1.addEventListener('click',getResult);
     button2.addEventListener('click',getResult);
     div3.innerHTML = this.getAttribute('data-question');
     this.append(div3,button1,button2);
     const card = Array.from(document.querySelectorAll('.card'));
     card.forEach(cards => cards.removeEventListener('click',flipCard));
}
function getResult(){
     const card = Array.from(document.querySelectorAll('.card'));
     card.forEach(cards => cards.addEventListener('click',flipCard));
     const cardOfButton = this.parentElement;
     if(cardOfButton.getAttribute('data-answer') === this.innerHTML){
          score = score + parseInt(cardOfButton.getAttribute('data-value'));
          scoreDisplay.innerHTML = score;
          cardOfButton.classList.add('correct-answer');
          setTimeout(() => {
               while(cardOfButton.firstChild){
                    cardOfButton.removeChild(cardOfButton.lastChild);
               }
               cardOfButton.innerHTML = cardOfButton.getAttribute('data-value');
          },100);
     }else{
          cardOfButton.classList.add('wrong-answer');
          setTimeout(() => {
               while(cardOfButton.firstChild){
                    cardOfButton.removeChild(cardOfButton.lastChild);
               }
               cardOfButton.innerHTML = 0;
          },100);
     }
     cardOfButton.removeEventListener('click',flipCard);
}
function addGenre(genre){
     const div1 = document.createElement('div');
     div1.classList.add('genre-column');
     div1.innerHTML = genre.name;
     game.append(div1);
     levels.forEach(level => {
          const div2 = document.createElement('div');
          div2.classList.add('card');
          div1.append(div2);
          if(level === 'easy'){
               div2.innerHTML = 100;
          }
          if(level === 'medium'){
               div2.innerHTML = 200;
          }
          if(level === 'hard'){
               div2.innerHTML = 300;
          }
          fetch(`https://opentdb.com/api.php?amount=1&category=${genre.id}&difficulty=${level}&type=boolean`)
               .then(response => response.json())
               .then(data => {
                    div2.setAttribute('data-question',data.results[0].question);
                    div2.setAttribute('data-answer',data.results[0].correct_answer);
                    div2.setAttribute('data-value',div2.getInnerHTML());
               })
               .then(done => div2.addEventListener('click',flipCard));
     });
}
genres.forEach(genre => addGenre(genre));