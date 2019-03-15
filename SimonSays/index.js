//Global arrays for use
var gamePattern = [];
var started = false;
var userClicked = [];
var count = 1;
var correctAnswers = 0;
var highScore = 0;
var clicksPerRound = 0;

$(document).keypress(function() //Used to run a function when any key has been pressed
{
  if(!started) {
    playSequence();
    started = true;
  }
});

function playSequence() //Used to play out the sequence each round + generates a random colour for use each round
{
  userClicked=[];
  $("h1").text("Round" + " " + count);
  var randomNumber = Math.floor(Math.random() * 4 + 1);
  var buttonColours = ["red", "blue", "yellow", "green"];
  var randomColour = buttonColours[randomNumber - 1];
  gamePattern.push(randomColour);

  for( i = gamePattern.length - 1; i > -1; i-- )
  {
    (function (i)
    {
      console.log(i);
      setTimeout(function ()
      {
        console.log(i);
        $("." + gamePattern[i]).delay(10).fadeOut('fast').fadeIn('fast');
        playAudio(randomColour);
      }, 1000*i);
    })(i);
  }
}

$(".btn").click(function(event) //On button click it registers which button was clicked and checks to see if it was correct, then runs code based on a right or wrong answer
{
  userClicked.push(event.target.id);
  animateButton(event.target.id);
  clicksPerRound++;

  if (userClicked[clicksPerRound - 1] === gamePattern[clicksPerRound - 1])
  {
    correctAnswers++;
    playAudio(event.target.id);
  } else
  {
    //Play the error sound
    playAudio(event.target.id);
    restartGame();
  }

  if (correctAnswers === count)
  {
    count++;
    clicksPerRound = 0;
    correctAnswers = 0;
    setTimeout(function(){
      playSequence();
    }, 1000);
  }
});

function animateButton(currentColour) //animates the pressed buttons
{
  $("." + currentColour).addClass("pressed");
  setTimeout(function()
  {
    $("." + currentColour).removeClass("pressed");
  }, 10);
}

function restartGame()
{
  //Update the high score if the player reached a new one
  if (count > highScore) {
    highScore = count - 1;
    $("h2").text("High Score: " + highScore);
  }
  //Reset all the variables used
  gamePattern = [];
  userClicked = [];
  count = 1;
  clicksPerRound = 0;
  //Add an error message to the h1 tag and allow the use of a key to restart the game
  $("h1").text("Game Over! Press any key to restart");
  started = false;
}

function playAudio(audioName) //plays the audo required for each sequence + button presses
{
  var audio = new Audio("sounds/" + audioName  + ".mp3");
  audio.play();
}
