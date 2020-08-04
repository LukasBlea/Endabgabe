namespace Endabgabe {

    export interface PictureProperties {

        type: string;
        positionX: number;
        positionY: number;
        velocityX: number;
        velocityY: number;
        size: number;
    }

    export function savePicture(): void {
        let confirmation = confirm("Do you really want to save your picture?");
        if (confirmation == true) {
            formatPicture(user);
        } else {
            alert("Your picture hasn't been saved");
        }
    }

    function formatPicture(_user: string): void {
        let pictureinformation: PictureProperties[] = [];
        for (let entry of symbols) {
            let format: PictureProperties = {
            "type": entry.getType(),
            "positionX": Math.floor(entry.position.x),
            "positionY": Math.floor(entry.position.y),
            "velocityX": Math.floor(entry.velocity.x),
            "velocityY": Math.floor(entry.velocity.y),
            "size": entry.size,
            }
        pictureinformation.push(format);
        }
        sendPicture(pictureinformation, _user)
        console.log(pictureinformation);
    }

    async function sendPicture(_properties: PictureProperties[], _user: string): Promise<void> {
        let name: string = _user;
        let canvasInfo: string[] = [];
        let width: string = Math.floor(canvaswidth).toString();
        let height: string = Math.floor(canvasheight).toString();
        let pensil: string = Math.floor(pensilThickness).toString();
        let pensilcolor: string = colorofpensil;
        canvasInfo.push(width, height, pensil, canvasbackground, pensilcolor);

        let canvasLook: string = JSON.stringify(canvasInfo);
        let canvasQuery: URLSearchParams = new URLSearchParams(canvasLook);

        let objectProperties: string = JSON.stringify(_properties);
        let objectQuery: URLSearchParams = new URLSearchParams(objectProperties);
        
        let response: Response = await fetch (url + "?savePicture&" + name + canvasQuery.toString() + "&" + objectQuery.toString());

        let responseText: string = await response.text();
        if (responseText != "") {
            alert("Your picture " + name + " has been saved!")
        } else {
            alert("Error occured");
        }
    }
}