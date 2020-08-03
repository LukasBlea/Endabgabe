"use strict";
var Endabgabe;
(function (Endabgabe) {
    function changePensilThickness() {
        let slider = document.getElementById("pensilThickness");
        Endabgabe.pensilThickness = parseFloat(slider.value);
        Endabgabe.crc2.lineWidth = Endabgabe.pensilThickness;
    }
    Endabgabe.changePensilThickness = changePensilThickness;
    function changeObjectSize() {
        let slider = document.getElementById("objectSize");
        let amount = parseFloat(slider.value);
        Endabgabe.radius = amount;
    }
    Endabgabe.changeObjectSize = changeObjectSize;
    function changeCanvasSize() {
        let canvassize = document.querySelector("select#canvasSize");
        switch (canvassize.value) {
            case ("small"):
                Endabgabe.canvaswidth = Endabgabe.canvas.width = window.innerWidth;
                Endabgabe.canvasheight = Endabgabe.canvas.height = window.innerHeight / 3;
                break;
            case ("medium"):
                Endabgabe.canvaswidth = Endabgabe.canvas.width = window.innerWidth;
                Endabgabe.canvasheight = Endabgabe.canvas.height = window.innerHeight / 2;
                break;
            case ("large"):
                Endabgabe.canvaswidth = Endabgabe.canvas.width = window.innerWidth;
                Endabgabe.canvasheight = Endabgabe.canvas.height = window.innerHeight / 1.5;
                break;
        }
        return Endabgabe.canvasheight;
    }
    Endabgabe.changeCanvasSize = changeCanvasSize;
    function changePensilColor() {
        let pensilcolor = document.querySelector("select#pensilColor");
        Endabgabe.crc2.strokeStyle = pensilcolor.value;
        Endabgabe.colorofpensil = pensilcolor.value;
        return Endabgabe.colorofpensil;
    }
    Endabgabe.changePensilColor = changePensilColor;
    function changeBackgroundColor() {
        let backgroundcolor = document.querySelector("select#backgroundColor");
        Endabgabe.canvasbackground = backgroundcolor.value;
        Endabgabe.canvas.style.background = Endabgabe.canvasbackground;
        return Endabgabe.canvasbackground;
    }
    Endabgabe.changeBackgroundColor = changeBackgroundColor;
})(Endabgabe || (Endabgabe = {}));
//# sourceMappingURL=customisation.js.map