function Invaders() {
    this.nColumns = 11;
    this.nRows = 5;
    this.invaders = [];
    this.invaderMotionDelay = 500;
    this.smallestMotionDelay = 10;
    this.invadersDirection = 1;
    this.changeDirection = false;
    this.livingInvaders = 55;
    this.invaderSound = 0;
    this.invaderSoundDelay = 1000;
    this.alive = false;
}

Invaders.prototype.initInvaders = function () {
    this.alive = true;
    for (var row = 0; row < this.nRows; row++) {
        this.invaders.push([]);
        for (var column = 0; column < this.nColumns; column++) {
            this.invaders[row].push(new Invader(row, column));
            if (row == this.nRows - 1 && column == this.nColumns - 1) {
                var that = this;
                setTimeout(function () {
                    that.manageInvaderPositions();
                    that.manageInvaderSound();
                }, 800);
            }
        }
    }
}

Invaders.prototype.destroyInvaders = function () {
    for (var row = 0; row < this.nRows; row++) {
        for (var column = 0; column < this.nColumns; column++) {
            this.invaders[row][column].destroy();
        }
    }
}

Invaders.prototype.manageInvaderPositions = function () {
    var that = this;
    var invaderMotionTimeout = setTimeout(function () {
        clearTimeout(invaderMotionTimeout);

        if (!freezeBetweenLives) {
            if (that.changeDirection) {
                that.moveInvadersY();
            } else {
                that.moveInvadersX();
            }
        }

        that.manageInvaderPositions();
    }, this.invaderMotionDelay);

}

Invaders.prototype.moveInvadersX = function () {
    this.flagChangeDirection = false;
    this.moveLineX(4);
    var that = this;
    var t1 = setTimeout(function () {
        that.moveLineX(3);
    }, this.invaderMotionDelay * 0.1);
    var t2 = setTimeout(function () {
        that.moveLineX(2);
    }, this.invaderMotionDelay * 0.2);
    var t3 = setTimeout(function () {
        that.moveLineX(1);
    }, this.invaderMotionDelay * 0.3);
    var t4 = setTimeout(function () {
        that.moveLineX(0);
    }, this.invaderMotionDelay * 0.4);
}

Invaders.prototype.moveLineX = function (line) {
    for (var i = 0; i < this.invaders[line].length; i++) {
        var invader = this.invaders[line][i];
        invader.moveInvaderX(this.invadersDirection);
        var invaderX = invader.getX();
        if (this.invadersDirection == 1) {
            if (invader.alive) {
                if (!this.flagChangeDirection && invaderX >= 530) {
                    this.flagChangeDirection = true;
                }
            }
            if (line == 0 && i == this.invaders[line].length - 1) {
                if (this.flagChangeDirection) {
                    if (this.flagChangeDirection) {
                        this.changeDirection = true;
                        this.invadersDirection = -1;
                    }
                }
            }
        } else {
            if (invader.alive) {
                if (!this.flagChangeDirection && invaderX <= 43) {
                    this.flagChangeDirection = true;
                }
            }
            if (line == 0 && i == this.invaders[line].length - 1) {
                if (this.flagChangeDirection) {
                    this.changeDirection = true;
                    this.invadersDirection = 1;
                }
            }
        }
    }
}

Invaders.prototype.moveInvadersY = function () {
    this.moveLineY(4);
    var that = this;
    var t1 = setTimeout(function () {
        that.moveLineY(3);
    }, 50);
    var t2 = setTimeout(function () {
        that.moveLineY(2);
    }, 100);
    var t3 = setTimeout(function () {
        that.moveLineY(1);
    }, 150);
    var t4 = setTimeout(function () {
        that.moveLineY(0);
    }, 200);

    that.changeDirection = false;
}

Invaders.prototype.moveLineY = function (line) {
    for (var i = 0; i < this.invaders[line].length; i++) {
        this.invaders[line][i].moveInvaderY();
    }
}

Invaders.prototype.checkIfHit = function (torpedo) {
    for (var i = 0; i < 5; i++) {
        for (var j = 0; j < 11; j++) {
            var hit = this.invaders[i][j].checkIfHit(torpedo);
            if (hit) {
                this.speedUp();
                this.livingInvaders -= 1;
                if(this.livingInvaders === 5) {
                    // clearTimeout(invaderSoundTimeout);
                    invaders.destroyInvaders();
                    createNewWave();
                }
                if(this.livingInvaders % 6 === 0) {
                    this.reduceInvaderSoundDelay();
                }
                return true;
            }
        }
    }
}

Invaders.prototype.speedUp = function () {
    if (this.invaderMotionDelay > this.smallestMotionDelay) {
        this.invaderMotionDelay -= 10;
    } else {
        this.invaderMotionDelay = this.smallestMotionDelay;
    }
}

Invaders.prototype.getRandomLowestInvaderPosition = function () {
    foundInvaderAlive = false;
    while (!foundInvaderAlive) {
        var column = getRandomInteger(1, 11);
        for (var i = this.nRows - 1; i >= 0; i--) {
            if (this.invaders[i][column - 1].alive) {
                foundInvaderAlive = true;
                return {
                    x: this.invaders[i][column - 1].container.x,
                    y: this.invaders[i][column - 1].container.y
                };
            }
        }
    }
}

Invaders.prototype.manageInvaderSound = function() {
    if(this.invaderSound < 4) {
        this.invaderSound += 1;
    } else {
        this.invaderSound = 1;
    }
    var that = this;
    var invaderSoundTimeout = setTimeout(function () {
        clearTimeout(invaderSoundTimeout);
        soundEngine.playSound("invader" + that.invaderSound);
        if(that.alive) {
            that.manageInvaderSound();
        }
    }, this.invaderSoundDelay);

}

Invaders.prototype.reduceInvaderSoundDelay = function() {
    if(this.invaderSoundDelay > 100) {
        this.invaderSoundDelay -= 100;
    }
}

// Invaders.prototype.destroy = function() {
//     this.alive = false;

// }