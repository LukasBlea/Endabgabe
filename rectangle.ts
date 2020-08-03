namespace Endabgabe {

    export class Rectangle extends Vector {

        position: Vector;
        velocity: Vector;

        constructor(_event: MouseEvent) {
            super(_event.offsetX, _event.offsetY);
            this.position = new Vector(_event.offsetX - 75, _event.offsetY - 75);
            this.velocity = new Vector(Math.floor(Math.random()* 20) + 1, Math.floor(Math.random()* 20) + 1);                                                                         
        }

        move(_timeslice: number): void {
            let offset: Vector = this.velocity.copy();                                                          
            offset.scale(_timeslice);
            this.position.add(offset);

            if (this.position.x + 150 > canvaswidth) {
                this.velocity.x = -this.velocity.x;
            }
            if (this.position.x < 0) {
                this.velocity.x = -this.velocity.x;
            }
            if (this.position.y < 0) {
                this.velocity.y = -this.velocity.y;
            } 
            if (this.position.y + 150> canvasheight) {
                this.velocity.y = -this.velocity.y;
            }
        }

        draw(): void {
        crc2.beginPath();
        crc2.rect(this.position.x, this.position.y, 150, 150);
        crc2.closePath();
        crc2.stroke();
        crc2.beginPath();
        }   

        getType(): string {
            return "Rectangle";
        }
    }
}