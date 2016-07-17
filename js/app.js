var canvas_width = 707;


// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = speed;
};

function makeRandomSpeed() {
    var speedArray = [30,50,70,90,110,130,150,170,190,210,230];
    return speedArray[Math.floor(Math.random() * speedArray.length)];
}

function makeRandomY() {
    var yArray = [60, 145, 230];
    return yArray[Math.floor(Math.random() * yArray.length)];
}

Enemy.prototype.update = function(dt) {
    this.x += this.speed * dt;
        if (this.x > 600) {
        this.reset();
    }
};

Enemy.prototype.render = function() {ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//Resetting the enemy with the random values
Enemy.prototype.reset = function() {
    this.x = -2;
    this.y = makeRandomY();
    this.speed = makeRandomSpeed();
};

// ----------------------Player class
var playerSprites = ['images/char-boy.png',
        'images/char-cat-girl.png',
        'images/char-horn-girl.png',
        'images/char-pink-girl.png',
        'images/char-princess-girl.png'];
        
var Player = function(playerX, playerY, playerSpeed){
    //random character at the start of the game
    this.sprite = playerSprites[Math.floor(Math.random() * playerSprites.length)];
    this.x = playerX;
    this.y = playerY;
    this.speed = playerSpeed;
    this.lives = 3;
    this.score = 0;
    // Set game_over parameter to false on instantiation
    this.GameEnd = false;
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.update = function() {
    if (this.y === -50) {
        this.score +=10;
        this.reset(); //reset if player when reach water // why it isn't working with lower values??
    }
    else if (this.y > 400)  //player reach the bottom of the canvas, go back to the starting position
    {this.y = 400;}
    else if (this.x > 600) //if the player reach the right side, can't move out from the canvas
    {this.x = 600;}
    else if (this.x < 0) //if the player reach the left side, can't move out from the canvas
    {this.x = 0;}
    else {
        for (var i = 0; i < allEnemies.length; i++) {
            if ((allEnemies[i].x > this.x - 70 && allEnemies[i].x < this.x + 50) && (allEnemies[i].y == this.y)) 
            {this.reset(); //Check if the enemy is on the same x (range added) and y coordinates as the player
            }
        }
    }
    
    //if the player hit it means 10 points deducted and loses 1 life
    //if he/she runs out from points and lives, both values are stay 0.
    if (this.collide(allEnemies) === true) {
        this.lives--;
        this.score-=10;
        this.reset();
        if (this.score < 1){
            this.score = 0;}
        if (this.lives < 1){
            this.lives = 0;} 
    };
};



// ----------------------function for keys pressed
Player.prototype.handleInput = function(key_pressed)  {
    if (key_pressed === 'up') {
        this.y -= 90;
        console.log("Up");
    } else if (key_pressed === 'down') {
        this.y += 90;
        console.log("Down");
    } else if (key_pressed === 'left') {
        this.x -= 100;
        console.log("Left");
    } else if (key_pressed === 'right') {
        this.x += 100;
        console.log("Right");
    }else if (key_pressed == 'c') {
        // Change the player sprite image
        this.sprite = playerSprites[Math.floor(Math.random() * playerSprites.length)];
    }
}

Player.prototype.reset = function() {
    this.x = 300;
    this.y = 400;
};

Player.prototype.collide = function(enemy){
    for (var i=0, il=allEnemies.length; i < il; i++){
        if (allEnemies[i].x < this.x + 40 &&
            allEnemies[i].x + 55 > this.x &&
            allEnemies[i].y < this.y + 55 &&
            40 + allEnemies[i].y > this.y){
            return true;
        }
        if (this.lives === 0) {
        // Remove the key input listener to prevent player from moving after gameover.
        document.removeEventListener('keyup', passKeyUpValue);
        this.reset();
        }
    }
}

// -------------------------------Instantiate Objects.

var allEnemies = [];

for (var i = 0; i < 7; i++) {
    var enemy = new Enemy(-3, makeRandomY(), makeRandomSpeed());
    allEnemies.push(enemy);
};

//New player created at the starting point

var player = new Player(300,400,100);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',
        67: 'c'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});

var ScoreBoard = function() {
    this.message = "Win the game, Get to the Water!";
};

// -----------------------------------Scoreboard class

// Display lives and messages
var ScoreBoard = function() {
    this.message = "Win the game, Get to the Water!";
};

// Update the scoreboard
ScoreBoard.prototype.update = function() {
    scoreBoardElement.innerHTML = this.message +
    "<br>Press 'C' to change character" +
    "<br>Press F5 to start over."  +
    "<br><div id='lives'>" + player.lives + " LIVES</div>  " +
    "<div id='score'>" + "SCORE: " + player.score + "</div>"
};

// Create scoreBoard

var scoreBoard = new ScoreBoard();
