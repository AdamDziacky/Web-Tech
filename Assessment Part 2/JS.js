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
        // console.log(currentQuestion.attachment);
        //instead of generating new slide every time, try to create just one, then access it and change the content.
        output.push(
          `<div class="slide">
            <p class="question"> ${currentQuestion.question} </p>
            <div id="attachment">
            <p class="answers"> ${answers.join("")} </p>
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

    // showQuestionAttachments();
  }

  function showNextSlide() {
    progress_list[currentSlide].style.textDecoration = "line-through";
    // hideQuestionAttachments();
    showSlide(currentSlide + 1);
  }
  
  function showPreviousSlide() {
    progress_list[currentSlide - 1].style.textDecoration = "initial";
    // hideQuestionAttachments();
    showSlide(currentSlide - 1);
  }

  function hideQuestionAttachments(){
    // Q3Pic.style.display = "none";
    // Q5Pic.style.display = "none";
    // Q9Pic.style.display = "none";
    // Q2Audio.style.display = "none";
    // Q7Audio.style.display = "none";
  }

  function showQuestionAttachments(){
    // if(currentSlide === 1){
    //   Q2Audio.style.display = "inherit";
    //   // console.log("Displaying Q2 Attachment.");
    // }
    // if(currentSlide === 2){
    //   Q3Pic.style.display = "inherit";
    // }
    // if(currentSlide === 4){
    //   Q5Pic.style.display = "inherit";
    // }
    // if(currentSlide === 6){
    //   Q7Audio.style.display = "inherit";
    // }
    // if(currentSlide === 8){
    //   Q9Pic.style.display = "inherit";
    // }
  }

  function showQuestionAttachmentsJS(questionNumber){

    var img = document.createElement("img");
    img.setAttribute("height", "300px");
    img.setAttribute("width", "300px");
    img.setAttribute("alt", "Question Attachment");

    if(questionNumber == 2){
      img.src = "HP_Pic.jpg";
    }

    if(questionNumber == 4){
      img.src = "Wilson.jpg";
    }

    if(questionNumber == 8){
      img.src = "Angry_Men.jpg";
    }

    var attachment_space = document.getElementById("attachment");
    attachment_space.appendChild(img)
  }

  //variables
  const quizContainer = document.getElementById('quiz');
  const resultsContainer = document.getElementById('results');
  const submitButton = document.getElementById('submit');

  var progress_list = document.getElementsByClassName("progress-ul-li");
  // var Q3Pic = document.getElementById("Q3-HP-Pic");
  // var Q5Pic = document.getElementById("Q5-Wilson");
  // var Q9Pic = document.getElementById("Q9-Angry-Men");
  // var Q2Audio = document.getElementById("Q2-LOTR-audio");
  // var Q7Audio = document.getElementById("Q7-HP-Hagrid");
  

  const myQuestions = [
    {
      question: "I am going to make him an offer he can't refuse. <br> In what movie did this line appear?",
      answers: {
        a: "The Godfather",
        b: "Scarface",
        c: "Casino Royale"
      },
      attachment: null,
      correctAnswer: "a"
    },
    {
      question: "Which character said the this line?",
      answers: {
        a: "Frodo Baggins",
        b: "Sauron",
        c: "Gandalf the Grey"
      },
      // attachment: Q2Audio,
      correctAnswer: "c"
    },
    {
      question: "What is on the picture?",
      answers: {
        a: "Geometrical shapes",
        b: "Deathly Hallows",
        c: "Illuminati sign",
      },
      // attachment: Q3Pic,
      correctAnswer: "b"
    },
    {
      question: "Which movie takes place in a Gotham City?",
      answers: {
        a: "The Dark Knight",
        b: "Daredevil",
        c: "Suicide Squad",
      },
      attachment: null,
      correctAnswer: "a"
    },
    {
      question: "What is the name of the thing on the picture?",
      answers: {
        a: "Todd",
        b: "Jack",
        c: "Wilson",
      },
      // attachment: Q5Pic,
      correctAnswer: "c"
    },
    {
      question: "Ever have that feeling when you're not sure if you're awake or dreaming? <br> What movie did this line appear in?",
      answers: {
        a: "Inception",
        b: "The Matrix",
        c: "Requiem for a Dream",
      },
      // attachment: null,
      correctAnswer: "b"
    },
    {
      question: "What was the job of the person saying these words?",
      answers: {
        a: "Headmaster",
        b: "Gamekeeper",
        c: "Auror",
      },
      // attachment: Q7Audio,
      correctAnswer: "b"
    },
    {
      question: "What was the first horrow movie to win an Oscar??",
      answers: {
        a: "The Ring",
        b: "Psycho",
        c: "Silence of the lambs",
      },
      // attachment: null,
      correctAnswer: "c"
    },
    {
      question: "In which movie can you find this scene?",
      answers: {
        a: "It's a wonderful life",
        b: "12 Angry Men",
        c: "Casablanca",
      },
      // attachment: Q9Pic,
      correctAnswer: "b"
    },
    {
      question: "What is the name of the villain in the movie Schindler's List?",
      answers: {
        a: "Mads Mikkelsen",
        b: "Ralph Fiennes",
        c: "Anthony Hopkings",
      },
      // attachment: null,
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
  // hideQuestionAttachments();
  showSlide(currentSlide);
  
  // Event listeners
  submitButton.addEventListener('click', showResults);
  previousButton.addEventListener("click", showPreviousSlide);
  nextButton.addEventListener("click", showNextSlide);


})();