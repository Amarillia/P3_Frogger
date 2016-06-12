// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = speed;
};

function makeRandomSpeed() {
    var speedArray = [30, 50, 70, 90, 120, 180, 220];
    var randSpeed = speedArray[Math.floor(Math.random() * speedArray.length)];
    return randSpeed;
}

function makeRandomY() {
    var yArray = [60, 145, 230];
    var randY = yArray[Math.floor(Math.random() * yArray.length)];
    return randY;
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

// Now write your own player class

var Player = function(playerX, playerY, playerSpeed){
    this.sprite = 'images/char-boy.png';
    this.x = playerX;
    this.y = playerY;
    this.speed = playerSpeed;
};

Player.prototype.render = function() {ctx.drawImage(Resources.get(this.sprite), this.x, this.y);};

Player.prototype.update = function() {
    if (this.y === -50) {
        this.reset(); //reset if player when reach water // why it isn't working with lower values??
    }
    else if (this.y > 400)  //player can not go lower than starting position
    {this.y = 400;}
    else if (this.x > 450) //if the player passed on the right side, appear again on left side
    {this.x = -50;}
    else if (this.x < -50) //if the player passes on the left side, appear again on right side
    {this.x = 450;}
    else {
        for (var i = 0; i < allEnemies.length; i++) {
            if ((allEnemies[i].x > this.x - 70 && allEnemies[i].x < this.x + 50) && (allEnemies[i].y == this.y)) 
            {this.reset(); //Check if the enemy is on the same x (range added) and y coordinates as the player
            }
        }
    }
};

//function needs a parameter, the key what we pressed
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
    }
}

Player.prototype.reset = function() {
    this.x = 200;
    this.y = 400;
};

// Now instantiate your objects.

var allEnemies = [];

for (var i = 0; i < 5; i++) {
    var enemy = new Enemy(-3, makeRandomY(), makeRandomSpeed());
    allEnemies.push(enemy);
};

var player = new Player(200,400,100);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});