function TorpedoModel() {
    this.torpedoVersions = [];
}

TorpedoModel.prototype.shipTorpedo = function () {
    var container = new createjs.Container();
    var shape = new createjs.Shape();
    shape.graphics.beginFill("#FFFFFF").drawRect(-2, 0, 2, 8);
    container.addChild(shape);
    return container;
}

TorpedoModel.prototype.crossTorpedo = function () {
    var mainContainer = new createjs.Container();
    for (var i = 0; i < 3; i++) {
        var container = new createjs.Container();
        var shape = new createjs.Shape();
        shape.graphics.beginFill("#FFFFFF").drawRect(0, 0, 1, 20);
        container.addChild(shape);
        shape = new createjs.Shape();
        var yPosition = [5, 10, 15][i];
        shape.graphics.beginFill("#FFFFFF").drawRect(-4, yPosition, 8, 1);
        container.addChild(shape);
        mainContainer.addChild(container);
    }
    return mainContainer;
}

TorpedoModel.prototype.zigzagTorpedo = function () {
    var mainContainer = new createjs.Container();

    var container = new createjs.Container();
    var shape = new createjs.Shape();
    shape.graphics.setStrokeStyle(1).beginStroke("rgba(255,255,255,1)");
    shape.graphics.moveTo(4, 0);
    shape.graphics.lineTo(-4, 6);
    shape.graphics.lineTo(4, 12);
    shape.graphics.lineTo(-4, 18);
    shape.graphics.endStroke();
    container.addChild(shape);
    mainContainer.addChild(container);

    container = new createjs.Container();
    shape = new createjs.Shape();
    shape.graphics.setStrokeStyle(1).beginStroke("rgba(255,255,255,1)");
    shape.graphics.moveTo(-4, 0);
    shape.graphics.lineTo(4, 6);
    shape.graphics.lineTo(-4, 12);
    shape.graphics.lineTo(4, 18);
    shape.graphics.endStroke();
    container.addChild(shape);
    mainContainer.addChild(container);
    return mainContainer;
}