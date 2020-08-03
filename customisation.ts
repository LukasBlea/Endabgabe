namespace Endabgabe {

    export function changePensilThickness() {
        let slider = <HTMLInputElement>document.getElementById("pensilThickness");
        pensilThickness = parseFloat(slider.value);
        crc2.lineWidth = pensilThickness;
    }

    export function changeObjectSize() {
        let slider = <HTMLInputElement>document.getElementById("objectSize");
        let amount = parseFloat(slider.value);
        radius = amount;
    }

    export function changeCanvasSize(): number { 
        let canvassize: HTMLSelectElement = <HTMLSelectElement>document.querySelector("select#canvasSize");
        switch(canvassize.value) {
            case ("small"):
                canvaswidth = canvas.width = window.innerWidth;
                canvasheight = canvas.height = window.innerHeight / 3;
                break;
            case ("medium"):
                canvaswidth = canvas.width = window.innerWidth;
                canvasheight = canvas.height = window.innerHeight / 2;
                break;
            case ("large"):
                canvaswidth = canvas.width = window.innerWidth;
                canvasheight = canvas.height = window.innerHeight / 1.5;
                break;
        }
        return canvasheight;
    }

    export function changePensilColor(): string {
        let pensilcolor: HTMLSelectElement = <HTMLSelectElement>document.querySelector("select#pensilColor");
        crc2.strokeStyle = pensilcolor.value;
        colorofpensil = pensilcolor.value;
        return colorofpensil;
    }

    export function changeBackgroundColor(): string {
        let backgroundcolor: HTMLSelectElement = <HTMLSelectElement>document.querySelector("select#backgroundColor");
        canvasbackground = backgroundcolor.value;
        canvas.style.background = canvasbackground;
        return canvasbackground;
    }

}