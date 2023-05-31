// DOM elements
const nameContainer = document.getElementById('name-container');
const nameInput = document.getElementById('name-input');
const startButton = document.getElementById('start-button');
const optionsContainer = document.getElementById('options-container');
const categoryButtons = document.querySelectorAll('.category-button');
const questionContainer = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const questionOptions = document.getElementById('question-options');
const nextButton = document.getElementById('next-button');
const resultContainer = document.getElementById('result-container');
const scoreElement = document.getElementById('score-value');
const percentageElement = document.getElementById('percentage-value');
const attemptedElement = document.getElementById('attempted-value');
const correctElement = document.getElementById('correct-value');
const incorrectElement = document.getElementById('incorrect-value');
const restartButton = document.getElementById('restart-button');

// Quiz data
const questions = [
  {
    category: 'profit-loss',
    question: 'Question 1: 1. Anurag buys an old laptop for Rs. 17500 and spends Rs. 2,500 for its repair. He is not satisfied from his laptop and sells the laptop at Rs. 22,500. Find his profit percent?',
    options: ['20%', '12.5%', ' 15%', '14.5%'],
    answer: 2
  },
  {
    category: 'profit-loss',
    question: 'Question 2: 2. A invests some amount in a business. After 6 months his friend B joined him with the triple amount that A invests in starting of business. If in the business the total profit earned by both of them is Rs.16480, then find the difference between the share of profit between A and B',
    options: ['4296 RS.', '3296 RS.', '3290 RS', '6396 RS'],
    answer: 2
  },
  {
    category: 'profit-loss',
    question: 'Question 3: 3. A shopkeeper is selling a fan at a discount of 30% on the mark price. If the marked price is 20% above the cost price and the fan was sold for Rs.420 then the cost price is',
    options: ['RS.400', 'RS.700', 'B. RS.500', 'RS.850'],
    answer: 2
  },
  {
    category: 'profit-loss',
    question: 'Question 4: 4. Amit sells a Chair at 20% profit to Rahul. Rahul sells it to Sanjay at 30% profit. If Sanjay sells it to Dev at 50% profit and difference between Cost price of chair for Dev and Amit was Rs.2680. Then, how much Rahul pays to Amit for the chair?',
    options: ['RS.2400', ' RS.3400', 'RS.3000', 'RS.2200'],
    answer: 1
  },
  {
    category: 'probability',
    question: 'Question 1: If A and B are independent and P (A) = 1/3 P(B) = 1/4, find P(A∩B)',
    options: [' 1/12 ', '2/12', '7/12', '12/21'],
    answer: 1
  },
  {
    category: 'probability',
    question: 'Question 2: A coin is tossed thrice. What is the chance of getting all heads?',
    options: ['5/78', '1/8', '2/8', '4/6'],
    answer: 2
  },
  {
    category: 'probability',
    question: 'Question 3: If P(A) = 0.9, P(B/A) = 0.8, find P(A ÇB)',
    options: ['0.72', '0.21', '0.55', '0.77'],
    answer: 1
  },
  {
    category: 'probability',
    question: 'Question 4: If P(A) = 1/3, P(B) = 3/4 , find (P È B) = 11/12, find P(A/B) and P(B/A)',
    options: ['2/9, 1/4', '2/9, 7/2', '2/6, 1/2', '2/9, 1/2'],
    answer: 4
  },
  {
    category: 'pipes',
    question: 'Question 1: Pipes?',
    options: ['Option 1', 'Option 2', 'Option 3', 'Option 4'],
    answer: 0
  },
  {
    category: 'pipes',
    question: 'Question 2: Pipes?',
    options: ['Option 1', 'Option 2', 'Option 3', 'Option 4'],
    answer: 1
  },
  {
    category: 'pipes',
    question: 'Question 3: Pipes?',
    options: ['Option 1', 'Option 2', 'Option 3', 'Option 4'],
    answer: 2
  },
  {
    category: 'pipes',
    question: 'Question 4: Pipes?',
    options: ['Option 1', 'Option 2', 'Option 3', 'Option 4'],
    answer: 3
  }
];

// Quiz variables
let currentQuestionIndex = 0;
let score = 0;
let attemptedQuestions = 0;

// Function to start the quiz
function startQuiz() {
  const playerName = nameInput.value.trim();

  if (playerName !== '') {
    nameContainer.style.display = 'none';
    optionsContainer.style.display = 'block';
    questionContainer.style.display = 'none';
    resultContainer.style.display = 'none';
  }
}

// Function to start a category
function startCategory(category) {
  optionsContainer.style.display = 'none';
  questionContainer.style.display = 'block';

  // Filter questions based on category
  const categoryQuestions = questions.filter(question => question.category === category);

  if (categoryQuestions.length > 0) {
    // Display the first question
    showQuestion(categoryQuestions[0]);
  }
}

// Function to display a question
function showQuestion(question) {
  questionElement.textContent = question.question;
  questionOptions.innerHTML = '';

  question.options.forEach((option, index) => {
    const li = document.createElement('li');
    const input = document.createElement('input');
    const label = document.createElement('label');

    input.type = 'radio';
    input.name = 'option';
    input.value = index;
    input.id = `option${index + 1}`;

    label.setAttribute('for', `option${index + 1}`);
    label.textContent = option;

    li.appendChild(input);
    li.appendChild(label);

    questionOptions.appendChild(li);
  });
}

// Function to check the answer and move to the next question
function checkAnswer() {
  const selectedOption = document.querySelector('input[name="option"]:checked');

  if (selectedOption) {
    const selectedAnswer = Number(selectedOption.value);

    const currentQuestion = questions[currentQuestionIndex];
    attemptedQuestions++;

    if (selectedAnswer === currentQuestion.answer) {
      score++;
    }

    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
      showQuestion(questions[currentQuestionIndex]);
    } else {
      showResult();
    }
  }
}

// Function to display the quiz result
function showResult() {
  questionContainer.style.display = 'none';
  resultContainer.style.display = 'block';

  const percentage = (score / attemptedQuestions) * 100;

  scoreElement.textContent = score;
  percentageElement.textContent = percentage.toFixed(2) + '%';
  attemptedElement.textContent = attemptedQuestions;
  correctElement.textContent = score;
  incorrectElement.textContent = attemptedQuestions - score;
}

// Function to restart the quiz
function restartQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  attemptedQuestions = 0;

  resultContainer.style.display = 'none';
  optionsContainer.style.display = 'block';
  nameInput.value = '';

  // Clear selected options
  const selectedOption = document.querySelector('input[name="option"]:checked');
  if (selectedOption) {
    selectedOption.checked = false;
  }
}

// Event listeners
startButton.addEventListener('click', startQuiz);

categoryButtons.forEach(button => {
  button.addEventListener('click', () => {
    const category = button.dataset.category;
    startCategory(category);
  });
});

nextButton.addEventListener('click', checkAnswer);

restartButton.addEventListener('click', restartQuiz);
