"use strict";
var Endabgabe;
(function (Endabgabe) {
    class Rectangle extends Endabgabe.Vector {
        constructor(_event) {
            super(_event.offsetX, _event.offsetY);
            this.position = new Endabgabe.Vector(_event.offsetX - 75, _event.offsetY - 75);
            this.velocity = new Endabgabe.Vector(Math.floor(Math.random() * 20) + 1, Math.floor(Math.random() * 20) + 1);
        }
        move(_timeslice) {
            let offset = this.velocity.copy();
            offset.scale(_timeslice);
            this.position.add(offset);
            if (this.position.x + 150 > Endabgabe.canvaswidth) {
                this.velocity.x = -this.velocity.x;
            }
            if (this.position.x < 0) {
                this.velocity.x = -this.velocity.x;
            }
            if (this.position.y < 0) {
                this.velocity.y = -this.velocity.y;
            }
            if (this.position.y + 150 > Endabgabe.canvasheight) {
                this.velocity.y = -this.velocity.y;
            }
        }
        draw() {
            Endabgabe.crc2.beginPath();
            Endabgabe.crc2.rect(this.position.x, this.position.y, 150, 150);
            Endabgabe.crc2.closePath();
            Endabgabe.crc2.stroke();
            Endabgabe.crc2.beginPath();
        }
        getType() {
            return "Rectangle";
        }
    }
    Endabgabe.Rectangle = Rectangle;
})(Endabgabe || (Endabgabe = {}));
//# sourceMappingURL=rectangle.js.map