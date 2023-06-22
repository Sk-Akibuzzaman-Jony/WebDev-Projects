
const colors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;



$(document).keypress(function() {
    if (!started) {
      $("#level-title").text("Level " + level);
      nextSequence();
      started = true;
    }
  });


$('.btn').click(function(event) {
    var userChosenColour =  $(this).attr('id');
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);

    $("#"+userChosenColour).addClass("pressed").delay(100).queue(function(){
        $(this).removeClass("pressed").dequeue();
    });

    console.log(userClickedPattern);
    checkAns(userClickedPattern.length-1);
});


function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function nextSequence() {
    userClickedPattern = [];
    $('h1').text("Level "+level);
    level++;
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColor = colors[randomNumber];
    gamePattern.push(randomChosenColor);


    $('#'+randomChosenColor).delay("7").animate({
        opacity : '0',
    });
    $('#'+randomChosenColor).animate({
        opacity : '1',
    });
    
    

    playSound(randomChosenColor);
}



function checkAns(currentLevel) {
    if (gamePattern[currentLevel] == userClickedPattern[currentLevel]) {
        


        if (userClickedPattern.length === gamePattern.length){

            console.log("success");
            setTimeout(function () {
                nextSequence();
              }, 1000);
    
    
}
}
else {

    $('h1').text("Game Over, Press Any Key to Restart");
    $("body").addClass("game-over").delay(200).queue(function(){
        $(this).removeClass("game-over").dequeue();
    });

    startOver()
    console.log("wrong");

  }
}

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}