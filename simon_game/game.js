var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var clicked = 0;

//play sound acording to the color chosen
function playSound(colorName) {
  var colorAudio = new Audio("sounds/" + colorName + ".mp3");
  colorAudio.play();
}

//animates the button selected
function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");

  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

//calls next color in the sequence
function nextSequence() {
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  setTimeout(function () {
    $("#" + randomChosenColor)
      .fadeOut(100)
      .fadeIn(100);
    playSound(randomChosenColor);
  }, 500);

 
  $("h1").text("Level " + level);
  level++;
  userClickedPattern = [];
}

//detects first keyboard pressing and starts the game
$(document).one("keydown", function () {
  setTimeout(nextSequence(), 1000);
});

//detects player click
$(".btn").on("click", function () {
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);

  //counts clicks and checkes to see if player has ended the sequence,
  //if ended then check entire array for error
  clicked++;
  if(clicked === level) {
    clicked = 0;
    checkAnswer(level);
    setTimeout(nextSequence(), 1000);
  }

});

function checkAnswer(currentLevel) {
    for(var i = 0; i < currentLevel; i++){
      if (userClickedPattern[i] === gamePattern[i]) {
        console.log("success");
      } else {
        console.log("wrong");
        var wrongAudio = new Audio("sounds/wrong.mp3");
        wrongAudio.play();
        $("body").addClass("game-over");
        setTimeout($("body").removeClass("game-over"), 200);
        $("h1").text("Game over, Press Any Key to Restart.");
      }
    }
}