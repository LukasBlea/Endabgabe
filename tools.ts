namespace Endabgabe {
    
    function removeCanvasEventListeners(): void {
        document.getElementById("canvas")!.removeEventListener("mousedown", startDrawing);
        document.getElementById("canvas")!.removeEventListener("mousemove", zeichnen);
        document.getElementById("canvas")!.removeEventListener("mouseup", stopDrawing);
        document.getElementById("canvas")!.removeEventListener("mousedown", startErasing);
        document.getElementById("canvas")!.removeEventListener("mousemove", erase);
        document.getElementById("canvas")!.removeEventListener("mouseup", stopErasing);
        document.getElementById("canvas")!.removeEventListener("click", installDrawCircle);
        document.getElementById("canvas")!.removeEventListener("mousedown", startMovingObject);
        document.getElementById("canvas")!.removeEventListener("mousemove", movingObject);
        document.getElementById("canvas")!.removeEventListener("mouseup", stopMovingObject);
        document.getElementById("canvas")!.removeEventListener("click", installDrawTriangle);
        document.getElementById("canvas")!.removeEventListener("click", deleteObject)
        document.getElementById("canvas")!.removeEventListener("click", installDrawHeart);
        document.getElementById("canvas")!.removeEventListener("click", drawRect2);
    }

    export function paint(): void {
        removeCanvasEventListeners();
        document.getElementById("canvas")!.addEventListener("mousedown", startDrawing);
        document.getElementById("canvas")!.addEventListener("mousemove", zeichnen);
        document.getElementById("canvas")!.addEventListener("mouseup", stopDrawing);
    }

    function startDrawing(_event: MouseEvent) {
        malen = true;
        zeichnen(_event);
    }

    function stopDrawing(): void {
        malen = false;
    }

    function zeichnen(_event: MouseEvent): void {
        if (malen == false || animation == true) {
            console.log("Nicht am Zeichnen");
        } else {
                let spacingY: number = _event.offsetY
                let spacingX: number = _event.offsetX;
                crc2.lineWidth = pensilThickness;
                crc2.lineCap = "round";
                crc2.lineTo(spacingX, spacingY);
                crc2.stroke();
                crc2.beginPath();
                crc2.moveTo(spacingX, spacingY);
            }
    }

    export function erasing(): void {
        removeCanvasEventListeners();
        document.getElementById("canvas")!.addEventListener("mousedown", startErasing);
        document.getElementById("canvas")!.addEventListener("mousemove", erase);
        document.getElementById("canvas")!.addEventListener("mouseup", stopErasing);
    }

    function startErasing(_event: MouseEvent): void {
        eraser = true;
        erase(_event);
    }

    function erase(_event: MouseEvent): void {
        if (eraser == false || animation == true) {
            console.log("Nicht am Radieren");
        } else {
                crc2.clearRect(_event.offsetX - 25, _event.offsetY - 25, 50, 50);
        }
    }

    function stopErasing(): void {
        eraser = false;
    }

    export function clearCanvas() {
        let confirmation = confirm("Do you really want to delete your picture?");
        if (confirmation == true) {
            crc2.clearRect(0, 0, canvaswidth, canvasheight);
            while (symbols.length > 0) {
                symbols.pop();
            }
        } else {
            alert("Your picture hasn't been deleted");
        }
    }

    export function installDrawCircle(): void {
        removeCanvasEventListeners();
        document.getElementById("canvas")!.addEventListener("click", drawCircle);
    }

    function drawCircle(_event: MouseEvent): void {
        let mycircle: Circle = new Circle (_event, radius, Math.floor(Math.random() * 20));
        mycircle.draw();
        symbols.push(mycircle);
    }

    export function installDrawHeart(): void {
        removeCanvasEventListeners();
        document.getElementById("canvas")!.addEventListener("click", drawHeart);
    }

    function drawHeart(_event: MouseEvent): void {
        let myheart: Heart = new Heart (_event);
        myheart.draw();
        symbols.push(myheart);
    }

    export function installDrawTriangle(): void {
        removeCanvasEventListeners();
        document.getElementById("canvas")!.addEventListener("click", drawTriangle);
    }

    function drawTriangle(_event: MouseEvent): void {
        let mytriangle: Triangle = new Triangle(_event, triangleheight);
        mytriangle.draw();
        symbols.push(mytriangle);
    }

    export function installDrawRect(): void {
        removeCanvasEventListeners();
        document.getElementById("canvas")!.addEventListener("click", drawRect2);
    }

    function drawRect2(_event: MouseEvent): void {
        let myrect: Rectangle = new Rectangle (_event);
        myrect.draw();
        symbols.push(myrect);
    }

    export function startAnimation(): void {
        if (counter == 0) {
            counter++;
            animation = true;
            update();
        } else {
            return;
        }
    }

    export function stopAnimation(): void {
        if (counter == 1) {
            counter--;
            animation = false;
        } else {
            return;
        }
    }

    export function update(): void {
        let request = requestAnimationFrame(update);
        if (animation == true) {
            crc2.clearRect(0, 0, canvaswidth, canvasheight);
            for (let i: number = 0; i < symbols.length; i++) {
                symbols[i].move(1/5);
                symbols[i].draw();
            }
        } else {
            cancelAnimationFrame(request);
            console.log("stopped animating");
        }
    }

    export function installDeleteObject(): void {
        removeCanvasEventListeners();
        document.getElementById("canvas")!.addEventListener("click", deleteObject)
    }

    function deleteObject(_event: MouseEvent): void {

        for (let i: number = 0; i < symbols.length; i++){
            let type = symbols[i].getType()
            switch (type){
                case "Triangle":
                    if (-triangleheight / 2 <= symbols[i].position.x - 250 - _event.offsetX && triangleheight >= symbols[i].position.x - _event.offsetX &&
                        -triangleheight / 2 <= symbols[i].position.y + 250 - _event.offsetY && triangleheight >= symbols[i].position.y - _event.offsetY){
                        symbols.splice(i, 1);
                    } 
                case "Circle":
                    if (-symbols[i].size <= symbols[i].position.x - _event.offsetX && symbols[i].size >= symbols[i].position.x - _event.offsetX
                        && -symbols[i].size <= symbols[i].position.y - _event.offsetY && symbols[i].size >= symbols[i].position.y - _event.offsetY) {
                        symbols.splice(i, 1);
                    }
                case "Heart":
                    break;
                case "Rectangle":
                    console.log("x", symbols[i].position.x - _event.offsetX);
                    console.log("y", symbols[i].position.y - _event.offsetY);
                    if (-150 <= symbols[i].position.x - _event.offsetX && 0 >= symbols[i].position.x - _event.offsetX 
                        && -150 <= symbols[i].position.y - _event.offsetY && 0 >= symbols[i].position.y - _event.offsetY) {
                        symbols.splice(i, 1);
                    }
            }
        }
        return;
    }

    export function installMoveObject(): void {
        removeCanvasEventListeners();
        document.getElementById("canvas")!.addEventListener("mousedown", startMovingObject);
        document.getElementById("canvas")!.addEventListener("mousemove", movingObject);
        document.getElementById("canvas")!.addEventListener("mouseup", stopMovingObject);
    }

    function startMovingObject(_event: MouseEvent): void {
        move = true;
        movingObject(_event);
    }

    function movingObject(_event: MouseEvent): void {
        if (move == true) {
            for (let i: number = 0; i < symbols.length; i++){
                let type = symbols[i].getType()
                switch (type){
                    case "Triangle":
                        if (-triangleheight / 2 <= symbols[i].position.x - 250 - _event.offsetX && triangleheight >= symbols[i].position.x - _event.offsetX &&
                            -triangleheight / 2 <= symbols[i].position.y + 250 - _event.offsetY && triangleheight >= symbols[i].position.y - _event.offsetY){
                                symbols[i].position.x = _event.offsetX;
                                symbols[i].position.y = _event.offsetY;
                                crc2.clearRect(0, 0, canvaswidth, canvasheight);
                                symbols[i].draw();
                        }
                    case "Circle":
                        if (-symbols[i].size <= symbols[i].position.x - _event.offsetX && symbols[i].size >= symbols[i].position.x - _event.offsetX
                            && -symbols[i].size <= symbols[i].position.y - _event.offsetY && symbols[i].size >= symbols[i].position.y - _event.offsetY) {
                                symbols[i].position.x = _event.offsetX;
                                symbols[i].position.y = _event.offsetY;
                                crc2.clearRect(0, 0, canvaswidth, canvasheight);
                                symbols[i].draw();
                        }
                    case "Heart":
                    break;
                    case "Rectangle":
                        if (-150 <= symbols[i].position.x - _event.offsetX && 0 >= symbols[i].position.x - _event.offsetX 
                        && -150 <= symbols[i].position.y - _event.offsetY && 0 >= symbols[i].position.y - _event.offsetY) {
                            symbols[i].position.x = _event.offsetX - 75;
                            symbols[i].position.y = _event.offsetY - 75;
                            crc2.clearRect(0, 0, canvaswidth, canvasheight);
                            symbols[i].draw();
                        }
                }
            }
        }
    }

    function stopMovingObject(): void { // Objekte auf dem Canvas sollen nach Loslassen der Maus wieder gezeichnet werden
        for (let i: number = 0; i < symbols.length; i++) { 
            symbols[i].draw();
        }
        move = false;
    }
}