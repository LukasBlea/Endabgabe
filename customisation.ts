namespace Endabgabe {

    export function changePensilThickness(_event: Event) {
        let slider = <HTMLInputElement>document.getElementById("pensilThickness");
        pensilThickness = parseFloat(slider.value);
        crc2.lineWidth = pensilThickness;
    }

    export function changeObjectSize() {
        let slider = <HTMLInputElement>document.getElementById("objectSize");
        let amount = parseFloat(slider.value);
        radius = amount;
        for (let i: number = 0; i < symbols.length; i++) {
            symbols[i].scale(amount);
        }
    }

    export function changeCanvasSize(): number { 
        let canvassize: HTMLSelectElement = <HTMLSelectElement>document.querySelector("select#canvasSize");
        switch(canvassize.value) {
            case ("small"):
                canvaswidth = canvas.width = window.innerWidth;
                canvasheight = canvas.height = window.innerHeight / 3;
                crc2.strokeStyle;
                break;
            case ("medium"):
                canvaswidth = canvas.width = window.innerWidth;
                canvasheight = canvas.height = window.innerHeight / 2;
                crc2.strokeStyle;
                break;
            case ("large"):
                canvaswidth = canvas.width = window.innerWidth;
                canvasheight = canvas.height = window.innerHeight / 1.5;
                crc2.strokeStyle;
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