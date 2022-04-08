(function(){
    // Functions
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
    }
  
    function showNextSlide() {
      showSlide(currentSlide + 1);
    }
  
    function showPreviousSlide() {
      showSlide(currentSlide - 1);
    }
  
    // Variables
    const quizContainer = document.getElementById('quiz');
    const resultsContainer = document.getElementById('results');
    const submitButton = document.getElementById('submit');
    const myQuestions = [
        {
          question: "I am going to make him an offer he can't refuse. <br> In what movie did this line appear?",
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
          question: "What is on the picture?",
          answers: {
            a: "Geometrical shapes",
            b: "Deathly Hallows",
            c: "Illuminati sign",
          },
          correctAnswer: "b"
        },
        {
          question: "Which movie takes place in a Gotham City?",
          answers: {
            a: "The Dark Knight",
            b: "Daredevil",
            c: "Suicide Squad",
          },
          correctAnswer: "a"
        },
        {
          question: "What is the name of the thing on the picture?",
          answers: {
            a: "Todd",
            b: "Jack",
            c: "Wilson",
          },
          correctAnswer: "c"
        },
        {
          question: "Ever have that feeling when you're not sure if you're awake or dreaming? <br> What movie did this line appear in?",
          answers: {
            a: "Inception",
            b: "The Matrix",
            c: "Requiem for a Dream",
          },
          correctAnswer: "b"
        },
        {
          question: "What was the job of the person saying these words?",
          answers: {
            a: "Headmaster",
            b: "Gamekeeper",
            c: "Auror",
          },
          correctAnswer: "b"
        },
        {
          question: "What was the first horrow movie to win an Oscar??",
          answers: {
            a: "The Ring",
            b: "Psycho",
            c: "Silence of the lambs",
          },
          correctAnswer: "c"
        },
        {
          question: "In which movie can you find this scene?",
          answers: {
            a: "It's a wonderful life",
            b: "12 Angry Men",
            c: "Casablanca",
          },
          correctAnswer: "b"
        },
        {
          question: "What is the name of the villain in the movie Schindler's List?",
          answers: {
            a: "Mads Mikkelsen",
            b: "Ralph Fiennes",
            c: "Anthony Hopkings",
          },
          correctAnswer: "a"
        }
      ];
  
    // Kick things off
    buildQuiz();
  
    // Pagination
    const previousButton = document.getElementById("previous");
    const nextButton = document.getElementById("next");
    const slides = document.querySelectorAll(".slide");
    let currentSlide = 0;
  
    // Show the first slide
    showSlide(currentSlide);
  
    // Event listeners
    submitButton.addEventListener('click', showResults);
    previousButton.addEventListener("click", showPreviousSlide);
    nextButton.addEventListener("click", showNextSlide);
  })();
  