function Bunker(xPos) {
    this.container = new createjs.Container();
    this.initBunker(xPos);
}

Bunker.prototype.initBunker = function (xPos) {
    var bitmap = new createjs.Bitmap("assets/images/bunker.png");
    this.container.addChild(bitmap);
    stage.addChild(this.container);
    this.container.x = xPos;
    this.container.y = 410;
}

Bunker.prototype.checkIfHit = function (torpedo) {

    var pX = torpedo.torpedo.x;
    var pY = torpedo.torpedo.y;

    if (torpedo.type === "invader") {
        pY += 20;
    }

    var point = this.container.globalToLocal(pX, pY);
    // if ((this.container.hitTest(point.x - 5, point.y) || this.container.hitTest(point.x + 5, point.y))) {
    if (this.container.hitTest(point.x, point.y)) {
        var imageData = canvasContext.getImageData(pX, pY, 1, 1);
        if (imageData.data[0] == 12) {
            torpedo.destroy();
            this.pixelExplosion(point.x, point.y, torpedo.invaderTorpedoType);
        }
    }
}

Bunker.prototype.pixelExplosion = function (pX, pY, type) {
    if(type == undefined) {
        // pY = pY + 4;
    } else {
        pY = pY - 4;
    }
    var bitmap = new createjs.Bitmap("assets/images/splatter-" + (type || 2) + ".png");
    bitmap.x = pX;
    bitmap.y = pY;
    bitmap.regX = 8;
    if (type == undefined) {
        bitmap.regY = 5;
    }
    this.container.addChild(bitmap);
}

Bunker.prototype.removeExplosions = function () {
    console.log("this.container", this.container);
}