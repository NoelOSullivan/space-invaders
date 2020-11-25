function Torpedo(type) {
    this.type = type;
    this.dead = false;
    switch (this.type) {
        case "ship":
            this.torpedo = torpedoModel.shipTorpedo();
            this.torpedo.x = ship.container.x;
            this.torpedo.y = 480;
            soundEngine.playSound("shoot");
            break;
        case "invader":
            this.invaderTorpedoType = getRandomInteger(1, 2);
            switch (this.invaderTorpedoType) {
                case 1:
                    this.torpedo = torpedoModel.crossTorpedo();
                    this.torpedoVersion = 1;
                    break;
                case 2:
                    this.torpedo = torpedoModel.zigzagTorpedo();
                    this.torpedoVersion = 1;
                    break;
            }
            var position = invaders.getRandomLowestInvaderPosition();
            this.torpedo.x = position.x;
            this.torpedo.y = position.y;

            var that = this;
            var versionInterval = setInterval(function () {
                that.switchTorpedoVersion();
            }, 100);

            break;
    }
    stage.addChild(this.torpedo);
}

Torpedo.prototype.moveTorpedo = function () {
    switch (this.type) {
        case "ship":
            this.torpedo.y -= 10;
            if (this.torpedo.y <= 20) {
                var splash = new Splash(1,this.torpedo.x, this.torpedo.y);
                this.destroy();
            };
            break;
        case "invader":
            this.torpedo.y += 5;
            if (this.torpedo.y >= 530) {
                var splash = new Splash(2,this.torpedo.x, this.torpedo.y - 20);
                greenLine.pixelExplosion(this.torpedo.x);
                this.destroy();
            }
            break;
    }
}

Torpedo.prototype.switchTorpedoVersion = function () {
    if (this.torpedo !== undefined) {
        this.torpedo.children[this.torpedoVersion - 1].alpha = 0;
        if (this.torpedoVersion < this.torpedo.children.length) {
            this.torpedoVersion += 1;
        } else {
            this.torpedoVersion = 1;
        }
        this.torpedo.children[this.torpedoVersion - 1].alpha = 1;
    }
}

Torpedo.prototype.checkIfHit = function (invaderTorpedo) {
    var pt = this.torpedo.globalToLocal(invaderTorpedo.torpedo.x, invaderTorpedo.torpedo.y);
    if (this.torpedo.hitTest(pt.x, pt.y) || this.torpedo.hitTest(pt.x - 3, pt.y) || this.torpedo.hitTest(pt.x + 3, pt.y)) {
        this.destroy();
        invaderTorpedo.destroy();    }
}

Torpedo.prototype.destroy = function () {
    this.dead = true;
    stage.removeChild(this.torpedo);
    torpedos.updateTorpedos();
}