import { Coordinates } from "../interface/Coordinates.interface";
import { Scan } from "../interface/Scan.interface";
import { Protocol } from "./Protocol.protocols";

export class ClosestEnemies extends Protocol{

    executeAction(scan: Scan[]): Coordinates | undefined{
        let resultCoordinates: Coordinates = scan[0].coordinates;
        let min = Number(Math.sqrt((0 - scan[0].coordinates.x) ** 2 + (0 - scan[0].coordinates.y) ** 2));
        for (let i = 0; i < scan.length; i++) {
            const result = Math.sqrt((0 - scan[i].coordinates.x) ** 2 + (0 - scan[i].coordinates.y) ** 2);

            if ((result < min) && (result <= 100)) {
                min = result;
                resultCoordinates = scan[i].coordinates;
            }
        }
        return resultCoordinates;
    }
}