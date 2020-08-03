namespace Endabgabe {
    
    window.addEventListener("load", init);

    export let canvas: HTMLCanvasElement = <HTMLCanvasElement>document.querySelector("#canvas");
    export let crc2: CanvasRenderingContext2D = <CanvasRenderingContext2D>canvas.getContext("2d");
    export let malen: boolean = false;
    export let pensilThickness: number = 10;
    export let colorofpensil: string;
    export let canvasbackground: string;
    export let canvaswidth = canvas.width = window.innerWidth;
    export let canvasheight = canvas.height = window.innerHeight / 2;
    export let eraser: boolean = false;
    export let radius: number = 100;
    export let fillcolor: string;
    export let fillobject: boolean = false;
    export let interval: boolean = false
    export let animation: boolean = false;
    export let counter: number = 0;
    export let triangleheight = 200 * Math.cos(Math.PI / 6);
    export let move: boolean = false;
    export let url: string = "https://zauberbildlukas.herokuapp.com/";
    crc2.strokeStyle = "Black";
    export let symbols: Vector[] = [];
    export let user: string = getUserName();

    function init(): void {

        let pensilthickness: HTMLInputElement = <HTMLInputElement>document.querySelector("input#pensilThickness");
        let objectSize: HTMLInputElement = <HTMLInputElement>document.querySelector("input#objectSize");
        let canvassize: HTMLSelectElement = <HTMLSelectElement>document.querySelector("select#canvasSize");    
        let pensilcolor: HTMLSelectElement = <HTMLSelectElement>document.querySelector("select#pensilColor");    
        let backgroundcolor: HTMLSelectElement = <HTMLSelectElement>document.querySelector("select#backgroundColor");    
        let clearcanvasbutton: HTMLButtonElement = <HTMLButtonElement>document.querySelector("button#clearCanvas");    
        let savecanvasbutton: HTMLButtonElement = <HTMLButtonElement>document.querySelector("button#savePicture");    
        let painting: HTMLButtonElement = <HTMLButtonElement>document.querySelector("button#paint");    
        let eraser: HTMLButtonElement = <HTMLButtonElement>document.querySelector("button#eraser");     
        let circle: HTMLButtonElement = <HTMLButtonElement>document.querySelector("button#drawCircle");      
        let triangle: HTMLButtonElement = <HTMLButtonElement>document.querySelector("button#drawTriangle");       
        let rect: HTMLButtonElement = <HTMLButtonElement>document.querySelector("button#drawRect");     
        let heart: HTMLButtonElement = <HTMLButtonElement>document.querySelector("button#drawHeart");      
        let startanimation: HTMLButtonElement = <HTMLButtonElement>document.querySelector("button#startAnimation");      
        let stopanimation: HTMLButtonElement = <HTMLButtonElement>document.querySelector("button#stopAnimation");
        let deleteobject: HTMLButtonElement = <HTMLButtonElement>document.querySelector("button#deleteObject");
        let moveobject: HTMLButtonElement = <HTMLButtonElement>document.querySelector("button#moveObject");

        pensilthickness.addEventListener("input", changePensilThickness);
        objectSize.addEventListener("input", changeObjectSize);
        canvassize.addEventListener("change", changeCanvasSize);
        pensilcolor.addEventListener("change", changePensilColor);
        backgroundcolor.addEventListener("change", changeBackgroundColor);
        clearcanvasbutton.addEventListener("click", clearCanvas);
        savecanvasbutton.addEventListener("click", savePicture);
        painting.addEventListener("click", paint);
        eraser.addEventListener("click", erasing );
        circle.addEventListener("click", drawCircle);
        triangle.addEventListener("click", drawTriangle);
        rect.addEventListener("click", drawRect);
        heart.addEventListener("click", drawHeart);
        startanimation.addEventListener("click", startAnimation);
        stopanimation.addEventListener("click", stopAnimation);
        deleteobject.addEventListener("click", deleteObject);
        moveobject.addEventListener("click", moveObject);

        username();
    }


    export function getUserName(): string{
        let user = prompt("Please enter your username:", "Username")
        if (user == null){
            return "";
        }
        else{
            return user;
        }
    }
    function username() {
        if (user == "") {
            user = "User";
            document.getElementById("username1")!.innerHTML = 
            "Zauberbild " + user;
            document.getElementById("username2")!.innerHTML = 
            "Welcome " + user + " !";
        } else {
            document.getElementById("username1")!.innerHTML = 
            "Zauberbild " + user;
            document.getElementById("username2")!.innerHTML = 
            "Welcome " + user + " !";
        }
        crc2.font = "10rem Arial";
        crc2.textAlign = "center";
        crc2.strokeText(user, canvaswidth / 2, canvasheight / 2);
    }
}