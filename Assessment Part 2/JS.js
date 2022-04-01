// https://www.sitepoint.com/simple-javascript-quiz/
(function(){
  function buildQuiz(){
    // variable to store the HTML output
    const output = [];

    // for each question...
    myQuestions.forEach(
      (currentQuestion, questionNumber) => {

        // variable to store the list of possible answers
        const answers = [];

        // and for each available answer...
        for(letter in currentQuestion.answers){

          // ...add an HTML radio button
          answers.push(
            `<label>
              <input type="radio" name="question${questionNumber}" value="${letter}">
              ${letter} :
              ${currentQuestion.answers[letter]}
            </label>`
          );
        }

        // add this question and its answers to the output
        output.push(
          `<div class="slide">
            <div class="question"> ${currentQuestion.question} </div>
            <div class="answers"> ${answers.join("")} </div>
          </div>`
        );
      }
    );

    // finally combine our output list into one string of HTML and put it on the page
    quizContainer.innerHTML = output.join('');
  }

  function showResults(){

    // gather answer containers from our quiz
    const answerContainers = quizContainer.querySelectorAll('.answers');

    // keep track of user's answers
    let numCorrect = 0;

    // for each question...
    myQuestions.forEach( (currentQuestion, questionNumber) => {

      // find selected answer
      const answerContainer = answerContainers[questionNumber];
      const selector = `input[name=question${questionNumber}]:checked`;
      const userAnswer = (answerContainer.querySelector(selector) || {}).value;

      // if answer is correct
      if(userAnswer === currentQuestion.correctAnswer){
        // add to the number of correct answers
        numCorrect++;

        // color the answers green
        answerContainers[questionNumber].style.color = 'lightgreen';
      }
      // if answer is wrong or blank
      else{
        // color the answers red
        answerContainers[questionNumber].style.color = 'red';
      }
    });

    // show number of correct answers out of total
    resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length}`;
  }

  function showSlide(n) {
    slides[currentSlide].classList.remove('active-slide');
    slides[n].classList.add('active-slide');
    currentSlide = n;

    if(currentSlide === 0){
      previousButton.style.display = 'none';
    }
    else{
      previousButton.style.display = 'inline-block';
    }
    if(currentSlide === slides.length-1){
      nextButton.style.display = 'none';
      submitButton.style.display = 'inline-block';
    }
    else{
      nextButton.style.display = 'inline-block';
      submitButton.style.display = 'none';
    }

    showQuestionAttachments();
  }

  function showNextSlide() {
    progress_list[currentSlide].style.textDecoration = "line-through";
    showSlide(currentSlide + 1);
  }
  
  function showPreviousSlide() {
    progress_list[currentSlide - 1].style.textDecoration = "initial";
    showSlide(currentSlide - 1);
  }

  function hideQuestionAttachments(){
    Q3Pic.style.display = "none";
    Q5Pic.style.display = "none";
    Q9Pic.style.display = "none";
    Q2Audio.style.display = "none";
    Q7Audio.style.display = "none";
  }

  function showQuestionAttachments(){
    if(currentSlide === 1){
      Q2Audio.style.display = "inherit";
    }
    else{
      hideQuestionAttachments();
    }
  }

  //variables
  const quizContainer = document.getElementById('quiz');
  const resultsContainer = document.getElementById('results');
  const submitButton = document.getElementById('submit');
  const myQuestions = [
    {
      question: "I am going to make him an ??? he can't refuse. In what movie did this line appear?",
      answers: {
        a: "The Godfather",
        b: "Scarface",
        c: "Casino Royale"
      },
      correctAnswer: "a"
    },
    {
      question: "Which character said the this line?",
      answers: {
        a: "Frodo Baggins",
        b: "Sauron",
        c: "Gandalf the Grey"
      },
      correctAnswer: "c"
    },
    {
      question: "Which tool can you use to ensure code quality?",
      answers: {
        a: "Angular",
        b: "jQuery",
        c: "RequireJS",
        d: "ESLint"
      },
      correctAnswer: "d"
    }
  ];

  // Kick things off
  buildQuiz();

  // Pagination
  const previousButton = document.getElementById("previous");
  const nextButton = document.getElementById("next");
  const slides = document.querySelectorAll(".slide");
  let currentSlide = 0;

  var progress_list = document.getElementsByClassName("progress-ul-li");
  var Q3Pic = document.getElementById("Q3-HP-Pic");
  var Q5Pic = document.getElementById("Q5-Wilson");
  var Q9Pic = document.getElementById("Q9-Angry-Men");
  var Q2Audio = document.getElementById("Q2-LOTR-audio");
  var Q7Audio = document.getElementById("Q7-HP-Hagrid");
  
  // Show the first slide
  hideQuestionAttachments();
  showSlide(currentSlide);
  
  // Event listeners
  submitButton.addEventListener('click', showResults);
  previousButton.addEventListener("click", showPreviousSlide);
  nextButton.addEventListener("click", showNextSlide);


})();