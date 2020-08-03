"use strict";
var Endabgabe;
(function (Endabgabe) {
    function removeCanvasEventListeners() {
        document.getElementById("canvas").removeEventListener("mousedown", startDrawing);
        document.getElementById("canvas").removeEventListener("mousemove", zeichnen);
        document.getElementById("canvas").removeEventListener("mouseup", stopDrawing);
        document.getElementById("canvas").removeEventListener("mousedown", startErasing);
        document.getElementById("canvas").removeEventListener("mousemove", erase);
        document.getElementById("canvas").removeEventListener("mouseup", stopErasing);
        document.getElementById("canvas").removeEventListener("click", drawCircle);
        document.getElementById("canvas").removeEventListener("mousedown", startMovingObject);
        document.getElementById("canvas").removeEventListener("mousemove", movingObject);
        document.getElementById("canvas").removeEventListener("mouseup", stopMovingObject);
        document.getElementById("canvas").removeEventListener("click", drawTriangle);
        document.getElementById("canvas").removeEventListener("click", deleteObject);
        document.getElementById("canvas").removeEventListener("click", drawHeart);
        document.getElementById("canvas").removeEventListener("click", drawRect);
    }
    function paint() {
        removeCanvasEventListeners();
        document.getElementById("canvas").addEventListener("mousedown", startDrawing);
        document.getElementById("canvas").addEventListener("mousemove", zeichnen);
        document.getElementById("canvas").addEventListener("mouseup", stopDrawing);
    }
    Endabgabe.paint = paint;
    function startDrawing(_event) {
        Endabgabe.malen = true;
        zeichnen(_event);
    }
    function stopDrawing() {
        Endabgabe.malen = false;
    }
    function zeichnen(_event) {
        if (Endabgabe.malen == false || Endabgabe.animation == true) {
            console.log("Nicht am Zeichnen");
        }
        else {
            let spacingY = _event.offsetY;
            let spacingX = _event.offsetX;
            Endabgabe.crc2.lineWidth = Endabgabe.pensilThickness;
            Endabgabe.crc2.lineCap = "round";
            Endabgabe.crc2.lineTo(spacingX, spacingY);
            Endabgabe.crc2.stroke();
            Endabgabe.crc2.beginPath();
            Endabgabe.crc2.moveTo(spacingX, spacingY);
        }
    }
    function erasing() {
        removeCanvasEventListeners();
        document.getElementById("canvas").addEventListener("mousedown", startErasing);
        document.getElementById("canvas").addEventListener("mousemove", erase);
        document.getElementById("canvas").addEventListener("mouseup", stopErasing);
    }
    Endabgabe.erasing = erasing;
    function startErasing(_event) {
        Endabgabe.eraser = true;
        erase(_event);
    }
    function erase(_event) {
        if (Endabgabe.eraser == false || Endabgabe.animation == true) {
            console.log("Nicht am Radieren");
        }
        else {
            Endabgabe.crc2.clearRect(_event.offsetX - 25, _event.offsetY - 25, 50, 50);
        }
    }
    function stopErasing() {
        Endabgabe.eraser = false;
    }
    function clearCanvas() {
        let confirmation = confirm("Do you really want to delete your picture?");
        if (confirmation == true) {
            Endabgabe.crc2.clearRect(0, 0, Endabgabe.canvaswidth, Endabgabe.canvasheight);
            while (Endabgabe.symbols.length > 0) {
                Endabgabe.symbols.pop();
            }
        }
        else {
            alert("Your picture hasn't been deleted");
        }
    }
    Endabgabe.clearCanvas = clearCanvas;
    function installDrawCircle() {
        removeCanvasEventListeners();
        document.getElementById("canvas").addEventListener("click", drawCircle);
    }
    Endabgabe.installDrawCircle = installDrawCircle;
    function drawCircle(_event) {
        let mycircle = new Endabgabe.Circle(_event, Endabgabe.radius, Math.floor(Math.random() * 20));
        mycircle.draw();
        Endabgabe.symbols.push(mycircle);
    }
    function installDrawHeart() {
        removeCanvasEventListeners();
        document.getElementById("canvas").addEventListener("click", drawHeart);
    }
    Endabgabe.installDrawHeart = installDrawHeart;
    function drawHeart(_event) {
        let myheart = new Endabgabe.Heart(_event);
        myheart.draw();
        Endabgabe.symbols.push(myheart);
    }
    function installDrawTriangle() {
        removeCanvasEventListeners();
        document.getElementById("canvas").addEventListener("click", drawTriangle);
    }
    Endabgabe.installDrawTriangle = installDrawTriangle;
    function drawTriangle(_event) {
        let mytriangle = new Endabgabe.Triangle(_event, Endabgabe.triangleheight);
        mytriangle.draw();
        Endabgabe.symbols.push(mytriangle);
    }
    function installDrawRect() {
        removeCanvasEventListeners();
        document.getElementById("canvas").addEventListener("click", drawRect);
    }
    Endabgabe.installDrawRect = installDrawRect;
    function drawRect(_event) {
        let myrect = new Endabgabe.Rectangle(_event);
        myrect.draw();
        Endabgabe.symbols.push(myrect);
    }
    function startAnimation() {
        if (Endabgabe.counter == 0) {
            Endabgabe.counter++;
            Endabgabe.animation = true;
            update();
        }
        else {
            return;
        }
    }
    Endabgabe.startAnimation = startAnimation;
    function stopAnimation() {
        if (Endabgabe.counter == 1) {
            Endabgabe.counter--;
            Endabgabe.animation = false;
        }
        else {
            return;
        }
    }
    Endabgabe.stopAnimation = stopAnimation;
    function update() {
        let request = requestAnimationFrame(update);
        if (Endabgabe.animation == true) {
            Endabgabe.crc2.clearRect(0, 0, Endabgabe.canvaswidth, Endabgabe.canvasheight);
            for (let i = 0; i < Endabgabe.symbols.length; i++) {
                Endabgabe.symbols[i].move(1 / 5);
                Endabgabe.symbols[i].draw();
            }
        }
        else {
            cancelAnimationFrame(request);
            console.log("stopped animating");
        }
    }
    Endabgabe.update = update;
    function installDeleteObject() {
        removeCanvasEventListeners();
        document.getElementById("canvas").addEventListener("click", deleteObject);
    }
    Endabgabe.installDeleteObject = installDeleteObject;
    function deleteObject(_event) {
        for (let i = 0; i < Endabgabe.symbols.length; i++) {
            let type = Endabgabe.symbols[i].getType();
            switch (type) {
                case "Triangle":
                    if (-Endabgabe.triangleheight / 2 <= Endabgabe.symbols[i].position.x - 250 - _event.offsetX && Endabgabe.triangleheight >= Endabgabe.symbols[i].position.x - _event.offsetX &&
                        -Endabgabe.triangleheight / 2 <= Endabgabe.symbols[i].position.y + 250 - _event.offsetY && Endabgabe.triangleheight >= Endabgabe.symbols[i].position.y - _event.offsetY) {
                        Endabgabe.symbols.splice(i, 1);
                    }
                case "Circle":
                    if (-Endabgabe.symbols[i].size <= Endabgabe.symbols[i].position.x - _event.offsetX && Endabgabe.symbols[i].size >= Endabgabe.symbols[i].position.x - _event.offsetX
                        && -Endabgabe.symbols[i].size <= Endabgabe.symbols[i].position.y - _event.offsetY && Endabgabe.symbols[i].size >= Endabgabe.symbols[i].position.y - _event.offsetY) {
                        Endabgabe.symbols.splice(i, 1);
                    }
                case "Heart":
                    break;
                case "Rectangle":
                    console.log("x", Endabgabe.symbols[i].position.x - _event.offsetX);
                    console.log("y", Endabgabe.symbols[i].position.y - _event.offsetY);
                    if (-150 <= Endabgabe.symbols[i].position.x - _event.offsetX && 0 >= Endabgabe.symbols[i].position.x - _event.offsetX
                        && -150 <= Endabgabe.symbols[i].position.y - _event.offsetY && 0 >= Endabgabe.symbols[i].position.y - _event.offsetY) {
                        Endabgabe.symbols.splice(i, 1);
                    }
            }
        }
        return;
    }
    function installMoveObject() {
        removeCanvasEventListeners();
        document.getElementById("canvas").addEventListener("mousedown", startMovingObject);
        document.getElementById("canvas").addEventListener("mousemove", movingObject);
        document.getElementById("canvas").addEventListener("mouseup", stopMovingObject);
    }
    Endabgabe.installMoveObject = installMoveObject;
    function startMovingObject(_event) {
        Endabgabe.move = true;
        movingObject(_event);
    }
    function movingObject(_event) {
        if (Endabgabe.move == true) {
            for (let i = 0; i < Endabgabe.symbols.length; i++) {
                let type = Endabgabe.symbols[i].getType();
                switch (type) {
                    case "Triangle":
                        if (-Endabgabe.triangleheight / 2 <= Endabgabe.symbols[i].position.x - 250 - _event.offsetX && Endabgabe.triangleheight >= Endabgabe.symbols[i].position.x - _event.offsetX &&
                            -Endabgabe.triangleheight / 2 <= Endabgabe.symbols[i].position.y + 250 - _event.offsetY && Endabgabe.triangleheight >= Endabgabe.symbols[i].position.y - _event.offsetY) {
                            Endabgabe.symbols[i].position.x = _event.offsetX;
                            Endabgabe.symbols[i].position.y = _event.offsetY;
                            Endabgabe.crc2.clearRect(0, 0, Endabgabe.canvaswidth, Endabgabe.canvasheight);
                            Endabgabe.symbols[i].draw();
                        }
                    case "Circle":
                        if (-Endabgabe.symbols[i].size <= Endabgabe.symbols[i].position.x - _event.offsetX && Endabgabe.symbols[i].size >= Endabgabe.symbols[i].position.x - _event.offsetX
                            && -Endabgabe.symbols[i].size <= Endabgabe.symbols[i].position.y - _event.offsetY && Endabgabe.symbols[i].size >= Endabgabe.symbols[i].position.y - _event.offsetY) {
                            Endabgabe.symbols[i].position.x = _event.offsetX;
                            Endabgabe.symbols[i].position.y = _event.offsetY;
                            Endabgabe.crc2.clearRect(0, 0, Endabgabe.canvaswidth, Endabgabe.canvasheight);
                            Endabgabe.symbols[i].draw();
                        }
                    case "Heart":
                        break;
                    case "Rectangle":
                        if (-150 <= Endabgabe.symbols[i].position.x - _event.offsetX && 0 >= Endabgabe.symbols[i].position.x - _event.offsetX
                            && -150 <= Endabgabe.symbols[i].position.y - _event.offsetY && 0 >= Endabgabe.symbols[i].position.y - _event.offsetY) {
                            Endabgabe.symbols[i].position.x = _event.offsetX - 75;
                            Endabgabe.symbols[i].position.y = _event.offsetY - 75;
                            Endabgabe.crc2.clearRect(0, 0, Endabgabe.canvaswidth, Endabgabe.canvasheight);
                            Endabgabe.symbols[i].draw();
                        }
                }
            }
        }
    }
    function stopMovingObject() {
        for (let i = 0; i < Endabgabe.symbols.length; i++) {
            Endabgabe.symbols[i].draw();
        }
        Endabgabe.move = false;
    }
})(Endabgabe || (Endabgabe = {}));
//# sourceMappingURL=tools.js.map