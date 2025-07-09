const game = document.getElementById('game');
const scoreDisplay = document.getElementById('score-display');
let score = 0;
const jeopardyCategories = [
     {
          genre: 'WHO',
          questions: [
               {
                    question: 'Who wrote the Harry Potter books?',
                    answers: ['JK Rowling', 'JRR Tolkien'],
                    correct: 'JK Rowling',
                    level: 'easy',
               },
               {
                    question: 'Who was born on Krypton',
                    answers: ['Aquaman', 'Superman'],
                    correct: 'Superman',
                    level: 'medium',
               },
               {
                    question: 'Who designed the first car?',
                    answers: ['Karl Benz', 'Henry Ford'],
                    correct: 'Karl Benz',
                    level: 'hard',
               },
          ],
     },
     {
          genre: 'WHERE',
          questions: [
               {
                    question: 'Where is Buckingham Palace?',
                    answers: ['Richmond', 'London'],
                    correct: 'London',
                    level: 'easy',
               },
               {
                    question: 'Where is the Colosseum',
                    answers: ['Rome', 'Milan'],
                    correct: 'Rome',
                    level: 'medium',
               },
               {
                    question: 'Where is Mount Kilamanjaro',
                    answers: ['Zimbabwe', 'Tanzania'],
                    correct: 'Tanzania',
                    level: 'hard',
               },
          ],
     },
     {
          genre: 'WHEN',
          questions: [
               {
                    question: 'When is Christmas?',
                    answers: ['30th Dec', '24th/25th Dec'],
                    correct: '24th/25th Dec',
                    level: 'easy',
               },
               {
                    question: 'When was JFK Shot?',
                    answers: ['1963', '1961'],
                    correct: '1963',
                    level: 'hard',
               },
               {
                    question: 'When was WW2?',
                    answers: ['1932', '1941'],
                    correct: '1941',
                    level: 'medium',
               },
          ],
     },
     {
          genre: 'WHAT',
          questions: [
               {
                    question: 'What is the capital of Saudi Arabia?',
                    answers: ['Jeddah', 'Riyadh'],
                    correct: 'Riyadh',
                    level: 'hard',
               },
               {
                    question: 'What do Koalas eat?',
                    answers: ['Straw', 'Eucalypt'],
                    correct: 'Eucalypt',
                    level: 'medium',
               },
               {
                    question: 'What is a kg short for',
                    answers: ['Kilojoule', 'Kilogram'],
                    correct: 'Kilogram',
                    level: 'easy',
               },
          ],
     },
     {
          genre: 'HOW MANY',
          questions: [
               {
                    question: 'How many players in a football team?',
                    answers: ['15', '11'],
                    correct: '11',
                    level: 'easy',
               },
               {
                    question: 'How many seconds in an hour?',
                    answers: ['36000', '3600'],
                    correct: '3600',
                    level: 'medium',
               },
               {
                    question: 'How many people in China?',
                    answers: ['1.1 bil', '1.4 bil'],
                    correct: '1.4 bil',
                    level: 'hard',
               },
          ],
     },
];
function addCategory(category){
     const div1 = document.createElement('div');
     div1.classList.add('genre-column');
     const div2 = document.createElement('div');
     div2.classList.add('genre-title');
     div2.innerHTML = category.genre;
     div1.append(div2);
     game.append(div1);
     category.questions.forEach((question) => {
          const div3 = document.createElement('div');
          div3.classList.add('card');
          div1.append(div3);
          if(question.level == 'easy'){
               div3.innerHTML = 100;
          }
          if(question.level == 'medium'){
               div3.innerHTML = 200;
          }
          if(question.level == 'hard'){
               div3.innerHTML = 300;
          }
          div3.setAttribute('data-question',question.question);
          div3.setAttribute('data-answer-1',question.answers[0]);
          div3.setAttribute('data-answer-2',question.answers[1]);
          div3.setAttribute('data-correct',question.correct);
          div3.setAttribute('data-value',div3.getInnerHTML);
          div3.addEventListener('click',flipCard);
     });
}
jeopardyCategories.forEach((category) => addCategory(category));
function flipCard(){
     this.innerHTML = "";
     this.style.fontSize = '15px';
     this.style.lineHeight = '30px';
     const div4 = document.createElement('div');
     div4.classList.add('card-text');
     const button1 = document.createElement('button');
     const button2 = document.createElement('button');
     button1.classList.add('first-button');
     button2.classList.add('second-button');
     button1.innerHTML = this.getAttribute('data-answer-1');
     button2.innerHTML = this.getAttribute('data-answer-2');
     button1.addEventListener('click',getResult);
     button2.addEventListener('click',getResult);
     this.append(div4,button1,button2);
     div4.innerHTML = this.getAttribute('data-question');
     const card = Array.from(document.querySelectorAll('.card'));
     card.forEach((cards) => cards.removeEventListener('click',flipCard));
}
function getResult(){
     const card = Array.from(document.querySelectorAll('.card'));
     card.forEach((cards) => cards.addEventListener('click',flipCard));
     const cardOfButton = this.parentElement;
     if(cardOfButton.getAttribute('data-correct') == this.innerHTML){
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
