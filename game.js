let buttonColours = ["red", "blue", "green", "yellow"];

let gamePattern = [];
let userClickedPattern = [];

let started = false;
let level = 0;

//detectar si una tecla fuepresionada
$(document).keypress(function() {
  if (!started) {
    //se setea el titulo a level 0
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

$(document).keypress(function(event) {
  let option = event.key;
  
  switch (option) {
    case "q":
      userClickedPattern.push("green");
      playSound("green");
      animatePress("green");
      checkAnswer(userClickedPattern.length - 1);
      break;
    case "w":
      userClickedPattern.push("red");
      playSound("red");
      animatePress("red");
      checkAnswer(userClickedPattern.length - 1);
      break;
    case "a":
      userClickedPattern.push("yellow");
      playSound("yellow");
      animatePress("yellow");
      checkAnswer(userClickedPattern.length - 1);
      break;
    case "s":
      userClickedPattern.push("blue");
      playSound("blue");
      animatePress("blue");
      checkAnswer(userClickedPattern.length - 1);
      break;
  }

});

//agregar evento click a todos los de la clase .btn
$(".btn").click(function() {

  //guardar el id de color del btn clickeado
  let userChosenColour = $(this).attr('id');

  //agregar a la ultima posicion del array el color del boton clickeado
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  //2. Call checkAnswer() after a user has clicked and chosen their answer, passing in the index of the last answer in the user's sequence.
  checkAnswer(userClickedPattern.length - 1);
});

function checkAnswer(currentLevel) {

  //3. Write an if statement inside checkAnswer() to check if the most recent user answer is the same as the game pattern. If so then log "success", otherwise log "wrong".
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

    //console.log("success");

    //4. If the user got the most recent answer right in step 3, then check that they have finished their sequence with another if statement.
    if (userClickedPattern.length === gamePattern.length) {

      //5. Call nextSequence() after a 1000 millisecond delay.
      setTimeout(function() {
        nextSequence();
      }, 1000);

    }

  } else {
    if (started != false){
    //console.log("wrong");
    playSound("wrong");
    playSound("wrong2");
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
    $("#level-title").html("Game Over! <br>Press SPACE to Restart");

    startOver();
  }
}

}

function nextSequence() {

  //6. Once nextSequence() is triggered, reset the userClickedPattern to an empty array ready for the next level.
  userClickedPattern = [];
  //se suma el nivel
  level++;

  //setear el texto del titulo al nivel
  $("#level-title").html("<br>Level " + level);

  //numeros del 0 al 3
  let randomNumber = Math.floor(Math.random() * 4);

  //se guarda un color aleatorio del array entre los indices 0 y 3
  let randomChosenColour = buttonColours[randomNumber];

  //se agrega al patron del juego
  gamePattern.push(randomChosenColour);

  //animacion del boton
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomChosenColour);
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor) {
  //agregar clase pressed de css en el boton clickeado
  $("#" + currentColor).addClass("pressed");

  //quitar la calse pressed en 100ms
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}
