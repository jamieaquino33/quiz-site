
/* 
This is an IIFE - Immediately Invoked Function Expression
IIFE's run as soon as they are defined
*/ 

//This variable exists in the global scope, AKA it can be used anywhere
var global;

(function() {
//Because this variable is inside of an IIFE, it is not in the global scope
var variable = 10;

//Make reference to our elements that we're going to imteract with
var quizConatiner = document.getElementById("quiz");
var resultContainer = document.getElementById("results");
var submitButton = document.getElementById("submit");
var resetButton = document.getElementById("reset");

var myQuestions = [];

//What does a quiz question consist of?
//Question Text, Answer Choices, Correct Answers

var question1 = {
    question: "What color is the sky?",
    answers: {
    a: "Blue",
    b: "Brown",
    c: "Green",
  },
  correctAnswer: "a"
}

console.log(question1.question); //Get the question text
console.log(question1.answers.b); //Get answer b

var question2 = {
    question: "What is the capital city of Peru?",
    answers: {
        a: "Lima",
        b: "Cusco",
        c: "No idea"
    },
    correctAnswer: "a"
}

var question3 = {
    question: "Where is Waldo really?",
    answers: {
        a: "Antartica",
        b: "Exploring the Pacific Ocean",
        c: "Sitting in a tree",
        d: "Minding his own business, so stop asking"
    },
    correctAnswer: "d"

}

//Add the question objects to our array of questions
myQuestions.push(question1, question2, question3);


//function to build a quiz that goes through our question objects and generates HTML for each question

function buildQuiz() {
    //We need to go through each of our questions objects and use them to build out the HTML to show a question

    for (var i = 0; i < myQuestions.length; i++) {
        //Create a display for the question text
        var questionDiv = document.createElement("div");

        //Get the question text from the question we are looking at with this iteration of the loop
        questionDiv.innerText = myQuestions[i].question;

        

        //Display the answer choices (and take user input to select an answer)

        //creating a div to hold the question answers
        var answersDiv = document.createElement("div");
        answersDiv.classList.add("answers");

        //For each property in the current question's answers object
        //A for-in loop is used to go through the properties of an object
        for (letter in myQuestions[i].answers) {

            //Create the label for the radio button input
            var label = document.createElement("label");

            //Create a radio buttin for each answer for this question
            var input = document.createElement("input");
            //Configure the input element
            input.type = "radio";
            input.name = "question" + i;
            input.value = letter;

            //Create some text from the current letter we're looking at and the corresponding answer for that letter
            label.appendChild(input);

            //Create some text from the current letter we're looking at and bthe corresponding answer for that letter 
            var labelText = document.createTextNode(`${letter} : ${myQuestions[i].answers[letter]}`);

            //Add text to the label
            label.appendChild(labelText);

            //Add the label to the answers div
            answersDiv.appendChild(label);
        }
        //Once all the answers are added, add the answwerDiv to the questionDiv
        questionDiv.appendChild(answersDiv);
        //Add the questionDiv to the quiz container
        quizConatiner.appendChild(questionDiv);
    }

}

buildQuiz();

function showResults() {
    //Get all the answer containers from our quiz 
    var answerContainers = quizConatiner.querySelectorAll(".answers"); //This will basically give us back an array containing everything in the quizContainer with the class "answers"

    //Variable to keep track of how many they got right
    var numCorrect = 0;

    for (var i = 0; i < answerContainers.length; i++) {
        //get the current answer container we're looking at for the loop
        var answerContainer = answerContainers[i];

        //String to find which input is checked for the current question
        var selector = `input[name=question${i}]:checked`;

        var userAnswer = (answerContainer.querySelector(selector) ||{}).value; //If it can't find a selected input for a question, querySelector will give back null, since {}.value gives back undefined instead of null

        if (userAnswer === myQuestions[i].correctAnswer) {
            //they got it right
            //Add 1 to numCorrect
            numCorrect++;
            answerContainer.style.color = "green";
        } else {
            //they got it wrong
            answerContainer.style.color = "red";
        }
    }

    //Add text to results container to show how many the got right 
    resultContainer.innerText = "You got " + numCorrect + " out of " + myQuestions.length;
}
//Call the showResults button when the submit button is clicked
submitButton.addEventListener("click", showResults);

function resetQuiz() {
    //Clear out what is in the results container
    resultContainer.innerText = "";
    //clear out the quiz container
    quizConatiner.innerHTML = "";
    //rebuild quiz
    buildQuiz();
}

//Call the resetQuiz function when the reset buttom is clicked
resetButton.addEventListener("click", resetQuiz);
})();