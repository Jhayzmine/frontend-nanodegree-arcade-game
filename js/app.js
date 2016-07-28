// Enemies our player must avoid
var Enemy = function(x, y, speed) {
	// Variables applied to each of our instances go here,
	// we've provided one for you to get started
	'use strict';
	this.x = x;
	this.y = y;
	this.speed = speed;
	// The image/sprite for our enemies, this uses
	// a helper we've provided to easily load images
	this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
	// You should multiply any movement by the dt parameter
	// which will ensure the game runs at the same speed for
	// all computers.
	'use strict';
	this.x = this.x + this.speed * dt;
	this.reset();
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
	'use strict';
	ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Enemy.prototype.reset = function() {
	'use strict';
	if (this.x >= 570) {
		this.x = -90;
	}
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function(x, y) {
	'use strict';
	this.x = x;
	this.y = y;
	this.sprite = 'images/char-horn-girl.png';
};

//Collisions
Player.prototype.checkCollisions = function() {
	'use strict';
	for (var i = 0; i < allEnemies.length; i++) {
		if (this.x < allEnemies[i].x + 70 &&
			this.x + 70 > allEnemies[i].x &&
			this.y < allEnemies[i].y + 70 &&
			this.y + 70 > allEnemies[i].y) {
			this.x = 204;
			this.y = 400;
			alert('You Died! Try again.');
		}
	}
};

Player.prototype.update = function() {
	'use strict';
	this.checkCollisions();
};

Player.prototype.render = function() {
	'use strict';
	ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//Move Player
Player.prototype.handleInput = function(move) {
	'use strict';
	if (move === 'up') {
		this.y = this.y - 83;
	} else if (move === 'down') {
		this.y = this.y + 83;
	} else if (move === 'left') {
		this.x = this.x - 101;
	} else if (move === 'right') {
		this.x = this.x + 101;
	}
	// To Keep Player on Game Board
	if (this.x < 0) {
		this.x = 0;
	} else if (this.x > 400) {
		this.x = 400;
	}
	if (this.y > 400) {
		this.y = 400;
	} else if (this.y < 0) {
		this.y = 0;
		alert('Good Job!');
		this.reset();
	}
};

Player.prototype.reset = function() {
	'use strict';
	this.x = 204;
	this.y = 400;
};

// Now instantiate your objects.
var enemy_1 = new Enemy(-50, 65, 40);
var enemy_2 = new Enemy(-150, 150, 60);
var enemy_3 = new Enemy(-200, 230, 30);

// Place all enemy objects in an array called allEnemies
var allEnemies = [];
allEnemies.push(enemy_1, enemy_2, enemy_3);

// Place the player object in a variable called player
var player = new Player(204, 400);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
	'use strict';
	var allowedKeys = {
		37: 'left',
		38: 'up',
		39: 'right',
		40: 'down'
	};

	player.handleInput(allowedKeys[e.keyCode]);
});