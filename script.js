const quizData = [
  {
    question: 'What is the capital of France?',
    id: 1,
    options: ['Paris', 'London', 'Berlin', 'Madrid'],
    answer: 'Paris',
  },
  {
    question: 'Which is the only livable planet in our solar system?',
    id: 2,
    options: ['Mars', 'Saturn', 'Jupiter', 'Earth'],
    answer: 'Earth',
  },
  {
    question: 'How many colours are there in rainbow?',
    id: 3,
    options: ['10', '8', '7', '6'],
    answer: '7',
  },
  {
    question: 'What made Popeye strong in Popeye -The sailor man?',
    id: 4,
    options: ['Samosa', 'Laddoo', 'Carrot', 'Spinach'],
    answer: 'Spinach',
  },
  {
    question: 'Which is the largest ocean on Earth?',
    id: 5,
    options: [
      'Pacific Ocean',
      'Indian Ocean',
      'Atlantic Ocean',
      'Arctic Ocean',
    ],
    answer: 'Pacific Ocean',
  },
  {
    question: 'What colour is banana?',
    id: 6,
    options: ['Red', 'Yellow', 'Green', 'Orange'],
    answer: 'Yellow',
  },
  {
    question: 'Who painted the Mona Lisa?',
    id: 7,
    options: [
      'Pablo Picasso',
      'Vincent van Gogh',
      'Leonardo da Vinci',
      'Michelangelo',
    ],
    answer: 'Leonardo da Vinci',
  },
  {
    question: 'Which planet is known as the Red Planet?',
    id: 8,
    options: ['Mars', 'Venus', 'Mercury', 'Uranus'],
    answer: 'Mars',
  },
  {
    question: 'What is the national animal bird of India?',
    id: 9,
    options: [
      'Crow',
      'Peacock',
      'Humming bird',
      'Pigeon',
    ],
    answer: 'Peacock',
  },
  {
    question: 'Which animal is known as the King of the Jungle?',
    id: 10,
    options: ['Lion', 'Tiger', 'Elephant', 'Giraffe'],
    answer: 'Lion',
  },
];

const quizContainer = document.getElementById('quiz');
const resultContainer = document.getElementById('result');
const submitButton = document.getElementById('submit');
const retryButton = document.getElementById('retry');
const showAnswerButton = document.getElementById('showAnswer');

let currentQuestion = 0;
let score = 0;
let incorrectAnswers = [];

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

let voices = [];
window.speechSynthesis.onvoiceschanged = function() {
  voices = window.speechSynthesis.getVoices();
};

function displayQuestion() {
  const questionData = quizData[currentQuestion];

  const questionElement = document.createElement('div');
  questionElement.className = 'question';
  questionElement.innerHTML = questionData.question;
  questionElement.style.fontSize = '30px';
  const speechSynthesis=window.speechSynthesis;
  questionElement.addEventListener('click',()=>{
    const textToSpeech=questionData.question;
    if(textToSpeech)
    {
      const utterance=new SpeechSynthesisUtterance(textToSpeech);
      utterance.volume = 2;
      utterance.voice = voices[2];
      speechSynthesis.speak(utterance);
    }
  })
  var img = document.createElement("img");
  img.src = "images/q" + String(questionData.id) + ".webp";
  img.style.margin = '10px';
  // questionElement.appendChild(img);

  const optionsElement = document.createElement('div');
  optionsElement.className = 'options';

  const shuffledOptions = [...questionData.options];
  shuffleArray(shuffledOptions);

  for (let i = 0; i < shuffledOptions.length; i++) {
    const option = document.createElement('label');
    option.className = 'optionThis';
    
    const radio = document.createElement('input');
    radio.type = 'radio';
    radio.name = 'quiz';
    radio.value = shuffledOptions[i];

    const optionText = document.createTextNode(shuffledOptions[i]);
    option.appendChild(radio);
    option.appendChild(optionText);
    optionsElement.appendChild(option);
    option.addEventListener('dblclick',()=>{
      const textToSpeech=shuffledOptions[i];
      if(textToSpeech)
      {
        const utterance = new SpeechSynthesisUtterance(textToSpeech);
        utterance.volume = 2;
        utterance.voice = voices[2];
        speechSynthesis.speak(utterance);
      }
    })
  }

  quizContainer.innerHTML = '';
  quizContainer.appendChild(questionElement);
  quizContainer.appendChild(img);
  quizContainer.appendChild(optionsElement);
}

function checkAnswer() {
  const selectedOption = document.querySelector('input[name="quiz"]:checked');
  if (selectedOption) {
    const answer = selectedOption.value;
    if (answer === quizData[currentQuestion].answer) {
      score++;
    } else {
      incorrectAnswers.push({
        question: quizData[currentQuestion].question,
        incorrectAnswer: answer,
        correctAnswer: quizData[currentQuestion].answer,
      });
    }
    currentQuestion++;
    selectedOption.checked = false;
    if (currentQuestion < quizData.length) {
      displayQuestion();
    } else {
      displayResult();
    }
  }
}

function displayResult() {
  quizContainer.style.display = 'none';
  submitButton.style.display = 'none';
  retryButton.style.display = 'inline-block';
  showAnswerButton.style.display = 'inline-block';
  resultContainer.innerHTML = `You scored ${score} out of ${quizData.length}!`;
  const speechSynthesis=window.speechSynthesis;
  const utterance=new SpeechSynthesisUtterance(resultContainer.innerHTML);
  utterance.voice = voices[2];
  utterance.volume = 2;
  speechSynthesis.speak(utterance);
}

function retryQuiz() {
  currentQuestion = 0;
  score = 0;
  incorrectAnswers = [];
  quizContainer.style.display = 'block';
  submitButton.style.display = 'inline-block';
  retryButton.style.display = 'none';
  showAnswerButton.style.display = 'none';
  resultContainer.innerHTML = '';
  displayQuestion();
}

function showAnswer() {
  quizContainer.style.display = 'none';
  submitButton.style.display = 'none';
  retryButton.style.display = 'inline-block';
  showAnswerButton.style.display = 'none';

  let incorrectAnswersHtml = '';
  for (let i = 0; i < incorrectAnswers.length; i++) {
    incorrectAnswersHtml += `
      <p>
        <strong>Question:</strong> ${incorrectAnswers[i].question}<br>
        <strong>Your Answer:</strong> ${incorrectAnswers[i].incorrectAnswer}<br>
        <strong>Correct Answer:</strong> ${incorrectAnswers[i].correctAnswer}
      </p>
    `;
  }

  resultContainer.innerHTML = `
    <p>You scored ${score} out of ${quizData.length}!</p>
    <p>Incorrect Answers:</p>
    ${incorrectAnswersHtml}
  `;
}

submitButton.addEventListener('click', checkAnswer);
retryButton.addEventListener('click', retryQuiz);
showAnswerButton.addEventListener('click', showAnswer);
shuffleArray(quizData)
displayQuestion();