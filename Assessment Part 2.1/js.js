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
          if (currentQuestion.att_type == "N/A") {
            output.push(
              `<div class="slide">
                <div class="question"> ${currentQuestion.question} </div>
                <br>
                <div class="answers"> ${answers.join("")} </div>
              </div>`
            );
          }

          if (currentQuestion.att_type == "Image") {
            output.push(
              `<div class="slide">
                <div class="question"> ${currentQuestion.question} </div>
                <img src="${currentQuestion.att}" alt="Question Image" style="width:300px;height:300px;">
                <div class="answers"> ${answers.join("")} </div>
              </div>`
            );
          }          

          if (currentQuestion.att_type == "Audio") {
            output.push(
              `<div class="slide">
                <div class="question"> ${currentQuestion.question} </div>
                <br>
                <audio controls>
                  <source src="${currentQuestion.att}" type="audio/mp3">
                  <source src="${currentQuestion.att}" type="audio/mpeg">
                  Your browser does not support the audio element.
                </audio>
                <br>
                <div class="answers"> ${answers.join("")} </div>
              </div>`
            );
          }          
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
          att_type: "N/A",
          correctAnswer: "a"
        },
        {
          question: "Which character said the this line?",
          answers: {
            a: "Frodo Baggins",
            b: "Sauron",
            c: "Gandalf the Grey"
          },
          att_type: "Audio",
          att: "gandalf_shallnotpass.mp3",
          correctAnswer: "c"
        },
        {
          question: "What is on the picture?",
          answers: {
            a: "Geometrical shapes",
            b: "Deathly Hallows",
            c: "Illuminati sign",
          },
          att_type: "Image",
          att: "HP_Pic.jpg",
          correctAnswer: "b"
        },
        {
          question: "Which movie takes place in a Gotham City?",
          answers: {
            a: "The Dark Knight",
            b: "Daredevil",
            c: "Suicide Squad",
          },
          att_type: "N/A",
          correctAnswer: "a"
        },
        {
          question: "What is the name of the thing on the picture?",
          answers: {
            a: "Todd",
            b: "Jack",
            c: "Wilson",
          },
          att_type: "Image",
          att: "Wilson.jpg",
          correctAnswer: "c"
        },
        {
          question: "Ever have that feeling when you're not sure if you're awake or dreaming? <br> What movie did this line appear in?",
          answers: {
            a: "Inception",
            b: "The Matrix",
            c: "Requiem for a Dream",
          },
          att_type: "N/A",
          correctAnswer: "b"
        },
        {
          question: "What was the job of the person saying these words?",
          answers: {
            a: "Headmaster",
            b: "Gamekeeper",
            c: "Auror",
          },
          att_type: "Audio",
          att: "wizzard.mp3",
          correctAnswer: "b"
        },
        {
          question: "What was the first horrow movie to win an Oscar??",
          answers: {
            a: "The Ring",
            b: "Psycho",
            c: "Silence of the lambs",
          },
          att_type: "N/A",
          correctAnswer: "c"
        },
        {
          question: "In which movie can you find this scene?",
          answers: {
            a: "It's a wonderful life",
            b: "12 Angry Men",
            c: "Casablanca",
          },
          att_type: "Image",
          att: "Angry_Men.jpg",
          correctAnswer: "b"
        },
        {
          question: "What is the name of the villain in the movie Schindler's List?",
          answers: {
            a: "Mads Mikkelsen",
            b: "Ralph Fiennes",
            c: "Anthony Hopkings",
          },
          att_type: "N/A",
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
  