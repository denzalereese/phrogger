// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = speed;
};

//get random int to randomize enemy speed and where enemy is rendered on the Y-axis
Enemy.prototype.getRandomIntInclusive = function(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + this.speed * dt;
    if (this.x >= 500) {
        this.x = this.getRandomIntInclusive(-300, -100);
    }
    //checks collisions and resets player if they collide
    if ((player.x >= this.x - 48 && player.x <= this.x + 48) && this.y === player.y) {
        player.x = 200;
        player.y = 400;
    }
};

// Draw the enemy on the screen
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

var Player = function() {
    this.sprite = "images/char-boy.png";
    this.x = 200;
    this.y = 400;
};

Player.prototype.update = function() {
    //reset player if they win by reaching the other side!
    if (this.y === 0) {
        this.x = 200;
        this.y = 400;
    }
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    if (this.y < 0) {
        this.y = 400;
        this.x = 200;
    }
};

Player.prototype.handleInput = function(key) {
    if (key == "left" && this.x > 0) {
        this.x -= 101;
    } else if (key == "up" && this.y > 0) {
        this.y -= 83;
    } else if (key == "right" && this.x <= 300) {
        this.x += 101;
    } else if (key == "down" && this.y <= 300) {
        this.y += 83;
    }
};

var allEnemies = [];
for (i = 0; i < 6; i++) {
    var yVals = [68, 151, 234]; //possible y-axis positions the enemy can be rendered
    var xVal = Enemy.prototype.getRandomIntInclusive(-300, -100);
    var startY = Enemy.prototype.getRandomIntInclusive(0, 2);
    var startSpeed = Enemy.prototype.getRandomIntInclusive(50, 200);
    allEnemies.push(new Enemy(xVal, yVals[startY], startSpeed));
}

var player = new Player();

//listens for key presses to move Player
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        13: 'enter',
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});
