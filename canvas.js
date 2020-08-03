"use strict";
var Endabgabe;
(function (Endabgabe) {
    window.addEventListener("load", init);
    Endabgabe.canvas = document.querySelector("#canvas");
    Endabgabe.crc2 = Endabgabe.canvas.getContext("2d");
    Endabgabe.malen = false;
    Endabgabe.pensilThickness = 10;
    Endabgabe.canvaswidth = Endabgabe.canvas.width = window.innerWidth;
    Endabgabe.canvasheight = Endabgabe.canvas.height = window.innerHeight / 2;
    Endabgabe.eraser = false;
    Endabgabe.radius = 100;
    Endabgabe.fillobject = false;
    Endabgabe.interval = false;
    Endabgabe.animation = false;
    Endabgabe.counter = 0;
    Endabgabe.triangleheight = 200 * Math.cos(Math.PI / 6);
    Endabgabe.move = false;
    Endabgabe.url = "https://zauberbildlukas.herokuapp.com/";
    Endabgabe.crc2.strokeStyle = "Black";
    Endabgabe.symbols = [];
    Endabgabe.user = getUserName();
    function init() {
        let pensilthickness = document.querySelector("input#pensilThickness");
        let objectSize = document.querySelector("input#objectSize");
        let canvassize = document.querySelector("select#canvasSize");
        let pensilcolor = document.querySelector("select#pensilColor");
        let backgroundcolor = document.querySelector("select#backgroundColor");
        let clearcanvasbutton = document.querySelector("button#clearCanvas");
        let savecanvasbutton = document.querySelector("button#savePicture");
        let painting = document.querySelector("button#paint");
        let eraser = document.querySelector("button#eraser");
        let circle = document.querySelector("button#drawCircle");
        let triangle = document.querySelector("button#drawTriangle");
        let rect = document.querySelector("button#drawRect");
        let heart = document.querySelector("button#drawHeart");
        let startanimation = document.querySelector("button#startAnimation");
        let stopanimation = document.querySelector("button#stopAnimation");
        let deleteobject = document.querySelector("button#deleteObject");
        let moveobject = document.querySelector("button#moveObject");
        pensilthickness.addEventListener("input", Endabgabe.changePensilThickness);
        objectSize.addEventListener("input", Endabgabe.changeObjectSize);
        canvassize.addEventListener("change", Endabgabe.changeCanvasSize);
        pensilcolor.addEventListener("change", Endabgabe.changePensilColor);
        backgroundcolor.addEventListener("change", Endabgabe.changeBackgroundColor);
        clearcanvasbutton.addEventListener("click", Endabgabe.clearCanvas);
        savecanvasbutton.addEventListener("click", Endabgabe.savePicture);
        painting.addEventListener("click", Endabgabe.paint);
        eraser.addEventListener("click", Endabgabe.erasing);
        circle.addEventListener("click", Endabgabe.drawCircle);
        triangle.addEventListener("click", Endabgabe.drawTriangle);
        rect.addEventListener("click", Endabgabe.drawRect);
        heart.addEventListener("click", Endabgabe.drawHeart);
        startanimation.addEventListener("click", Endabgabe.startAnimation);
        stopanimation.addEventListener("click", Endabgabe.stopAnimation);
        deleteobject.addEventListener("click", Endabgabe.deleteObject);
        moveobject.addEventListener("click", Endabgabe.moveObject);
        username();
    }
    function getUserName() {
        let user = prompt("Please enter your username:", "Username");
        if (user == null) {
            return "";
        }
        else {
            return user;
        }
    }
    Endabgabe.getUserName = getUserName;
    function username() {
        if (Endabgabe.user == "") {
            Endabgabe.user = "User";
            document.getElementById("username1").innerHTML =
                "Zauberbild " + Endabgabe.user;
            document.getElementById("username2").innerHTML =
                "Welcome " + Endabgabe.user + " !";
        }
        else {
            document.getElementById("username1").innerHTML =
                "Zauberbild " + Endabgabe.user;
            document.getElementById("username2").innerHTML =
                "Welcome " + Endabgabe.user + " !";
        }
        Endabgabe.crc2.font = "10rem Arial";
        Endabgabe.crc2.textAlign = "center";
        Endabgabe.crc2.strokeText(Endabgabe.user, Endabgabe.canvaswidth / 2, Endabgabe.canvasheight / 2);
    }
})(Endabgabe || (Endabgabe = {}));
//# sourceMappingURL=canvas.js.map