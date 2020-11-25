function Torpedos() {

    this.shipTorpedos = [];
    this.invaderTorpedos = [];
    this.invaderTorpedoDelay = 1000;

    var that = this;
    this.invaderTorpedosInterval = setInterval(function () {
        that.fireInvaderTorpedo();
    }, this.invaderTorpedoDelay);

    var manageTorpedosInterval = setInterval(function () {
        that.manageTorpedos();
    }, 20);
}

Torpedos.prototype.fireShipTorpedo = function () {
    if (this.shipTorpedos.length === 0) {
        this.shipTorpedos.push(new Torpedo("ship"));
    }
}

Torpedos.prototype.fireInvaderTorpedo = function () {
    if (freezeBetweenLives) return;
    if (invaders.livingInvaders > 0) {
        this.invaderTorpedos.push(new Torpedo("invader"));
    }
}

Torpedos.prototype.manageTorpedos = function () {
    if (freezeBetweenLives) return;
    if (this.shipTorpedos.length > 0) {
        for (var i = 0; i < this.shipTorpedos.length; i++) {
            this.shipTorpedos[i].moveTorpedo();
            // Have to recheck this condition, cos things might have changed (torpedo hit something else)
            if (this.shipTorpedos.length > 0) {
                var invaderHit = invaders.checkIfHit(this.shipTorpedos[i]);
                if (!invaderHit) {
                    var invaderShipHit = invaderShip.checkIfHit(this.shipTorpedos[i]);
                    if (!invaderShipHit) {
                        if (this.shipTorpedos.length > 0) {
                            var bunkersHit = bunkers.checkIfHit(this.shipTorpedos[i]);
                            if (!bunkersHit) {
                                if (this.invaderTorpedos.length > 0) {
                                    for (var j = 0; j < this.invaderTorpedos.length; j++) {
                                        if (this.shipTorpedos.length > 0) {
                                            this.shipTorpedos[i].checkIfHit(this.invaderTorpedos[j]);
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    if (this.invaderTorpedos.length > 0) {
        for (var i = 0; i < this.invaderTorpedos.length; i++) {
            this.invaderTorpedos[i].moveTorpedo();
            if (this.invaderTorpedos.length > 0) {
                var shipHit = ship.checkIfHit(this.invaderTorpedos[i]);
                if (!shipHit) {
                    var bunkersHit = bunkers.checkIfHit(this.invaderTorpedos[i]);
                }
            }
        }
    }
}

Torpedos.prototype.updateTorpedos = function () {
    for (var i = this.shipTorpedos.length; i--;) {
        if (this.shipTorpedos[i].dead === true) {
            this.shipTorpedos.splice(i, 1);
        }
    }
    for (var i = this.invaderTorpedos.length; i--;) {
        if (this.invaderTorpedos[i].dead === true) {
            this.invaderTorpedos.splice(i, 1);
        }
    }
}

Torpedos.prototype.destroy = function () {
    clearInterval(this.invaderTorpedosInterval);
    clearInterval(this.manageTorpedosInterval);
}