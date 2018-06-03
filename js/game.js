// Create audio elements to append later
var $sound = $("<audio preload=auto>");
$sound.attr("src", "assets/sounds/sound.mp3");

var $soundStart = $("<audio preload=auto>");
$soundStart.attr("src", "assets/sounds/Buzz-loser.mp3");

var $soundReset = $("<audio preload=auto>");
$soundReset.attr("src", "assets/sounds/Horn-winner.mp3");

//wait for document to laod then run the code
$(document).ready(function () {

    //select a function to reset the game "reload the page"
    $(".reset").click(function () {
        location.reload(true);

    });

    //select a function to start the game and assign it to the start button click event 
    $(".start").click(trivia);

    function trivia() {
        $soundStart[0].play();
        //empty array to hold the user scores 
        var scoreAry = [];

        //array of questions as objects with questions, multiple choice answers, correct answer and score
        //q=question
        //c=choices of answers
        //a=answer

        var questions = [{
            q: "What was the first web browser?",
            c: ["WorldWideWeb", "Mosaic", "NeXT", "Netscape"],
            a: "WorldWideWeb",
            correct: 0
        }, {
            q: "How many websites were on the Internet as of February 2017?",
            c: ["Almost 10 billion", "Almost 5 billion", "Almost 1 billion", "Almost 25 billion"],
            a: "Almost 5 billion",
            correct: 0
        }, {
            q: "How many feet of tape would you find in the typical C60 compact audio cassette?",
            c: ["281 feet (85 meters)", "196 feet (60 meters)", "842 feet (256 meters)", "98 feet (30 meters)"],
            a: "281 feet (85 meters)",
            correct: 0
        }, {
            q: "What was the first video game console to have a controller with an integrated mic?",
            c: ["Sega Master System", "Famicom", "Nintendo 64", "Atari 2600"],
            a: "Famicom",
            correct: 0
        }, {
            q: "The PlayStation 2's external design wasn't an original concept by Sony, but was instead borrowed from which unreleased console?",
            c: ["Sega Neptune", "Atari Falcon040", "Panasonic M2", "Taito Wowow"],
            a: "Atari Falcon040",
            correct: 0
        }, {
            q: "In 2010, the United States Air Force used more than a thousand game consoles to build a supercomputer... which one?",
            c: ["Xbox", "Nintendo Wii", "Xbox 360", "PlayStation 3"],
            a: "PlayStation 3",
            correct: 0
        }, {
            q: "Charles Babbage is known for creating the first... ?",
            c: ["Vacuum tube transistor", "Mechanical computer", "Software language", "General-purpose digital computer"],
            a: "Mechanical computer",
            correct: 0
        }, {
            q: "Which sign of the zodiac would you be if your birthday was on October 18?",
            c: ["Virgo", "Cancer", "Libra", "Pices"],
            a: "Libra",
            correct: 0
        }, {
            q: "In which country is Mount Everest?",
            c: ["The Himalayas", "Nepal", "Tibet", "India"],
            a: "Nepal",
            correct: 0
        }, {
            q: "Where is the world's largest desert?",
            c: ["Western Sahara", "Antartica", "Mongolia", "Saudi Arabia"],
            a: "Antartica",
            correct: 0
        }
    ];

        // initiate a counter to keep track of the game 
        var counter = questions.length;
        

        //get the question and answer data from the questions array and append it to the #questions div
        //create and append a NEXT button to move to the next question
        function createQuestion(questions) {
            
            for (var i = 0; i < counter; i++) {
                //hide start button to allow for NEXT button placehold
                $(".start").hide();
                //append the questions here 
                var randQuestion = questions[Math.floor(Math.random() * counter)];
                $("#questions").append('<form id="' + i + '" class="center-text"><p>Question ' + (i + 1) + ' of ' + counter + '</p><h3 class="question">' + randQuestion.q + '</h3>' + radioButtons(randQuestion.c, i) + '<button type="submit" class="next">NEXT</button></p></form>');
            }
            //questions have been created but wee only want to show one at a time 
            //This hides all except the first question
            for (var k = counter - 1; k > 0; k--) {
                $('#' + k).hide();
            }
        }
        //grab the answer choices from the questions array and returns them to createQuestion() function
        function radioButtons(arr, questionNumb) {
            var answers = [];
            for (var i = 0; i < arr.length; i++) {
                //could use ` to avoid "''" and many + 
                answers.push('<label><input type="radio" name="' + questionNumb + '" value="' + arr[i] + '">' + arr[i] + '</label>');
            }
            return answers.join(" ");
            console.log(answer)
            console.log(arr[i])
        }
        

        //add the correct values in the questions array
        function sumScore(randQuestion) {
            return scoreAry.reduce(function (previousValue, currentValue, index, array) {
                return previousValue + currentValue;
            });
        }

        //check the user's answer and update the score
        function checkAnswer(answer, questionNumb, randQuestion) {
            if (answer === questions[questionNumb].a) {
                randQuestion[questionNumb].correct = 1;
                scoreAry.push(randQuestion[questionNumb].correct);
            } else {
                scoreAry.push(randQuestion[questionNumb].correct);
            }
        }

        createQuestion(questions);
        //=============================================================================================

        $(".next").click(function (event) {

            //stop the form from submitting  by default
            event.preventDefault();

            // append sound to next question
            $sound[0].play();


            //get the question number
            var questionNumb = $(this).closest("form").attr("id");

            // grab the user's selected answer
            var userInput = $('input[name=' + questionNumb + ']:radio:checked').val();
            if (counter > 1) {
                checkAnswer(userInput, questionNumb, questions);
                $("#" + questionNumb).hide();
                $("#" + questionNumb).next().show();
                counter--;
            } else if (counter === 1) {
                checkAnswer(userInput, questionNumb, questions);
                $("#questions").find("form").remove();
                $("#questions").append('<h3 class="result"></h3>');
                $(".result").text('You answered ' + sumScore(questions) + ' questions correctly out of 10.');

                // log in the wrong answers for the user to view
                for (j = 0; j < scoreAry.length; j++) {
                    if (scoreAry[j] === 0) {
                        console.log(questions[j].q, questions[j].a);
                        $("#questions").append('<p class="missed-' + j + '">You missed: ' + questions[j].q + ' ' + questions[j].a + '</p>');
                        $soundReset[0].play();
                    }
                }
            } else {
                return false;
                $soundReset[0].play();
            }
        });
    }
});