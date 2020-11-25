function Splash(splashType, posX, posY) {
    this.splash = new createjs.Bitmap("assets/images/splash-" + splashType + ".png");
    stage.addChild(this.splash);
    this.splash.x = posX;
    this.splash.y = posY;
    this.splash.regX = 11;

    var that = this;
    var t1 = setTimeout(function () {
        that.killSplash();
    }, 250);
}

Splash.prototype.killSplash = function() {
    stage.removeChild(this.splash);
}