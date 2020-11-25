function Bunkers() {
    this.bunkers = [];
    this.initBunkers()
}

Bunkers.prototype.initBunkers = function () {
    var offsetLeft = 85;
    for (var i = 0; i < 4; i++) {
        var x = offsetLeft + (i * 116);
        this.bunkers.push(new Bunker(x));
    }
}

Bunkers.prototype.checkIfHit = function (torpedo) {
    for (var i = 0; i < 4; i++) {
        this.bunkers[i].checkIfHit(torpedo);
    }
}

Bunkers.prototype.removeExplosions = function() {
    for (var i = 0; i < 4; i++) {
        this.bunkers[i].removeExplosions();
    }
}