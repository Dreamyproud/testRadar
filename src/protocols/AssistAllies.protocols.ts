import { Coordinates } from "../interface/Coordinates.interface";
import { Scan } from "../interface/Scan.interface";
import { Protocol } from "./Protocol.protocols";

export class AssistAllies extends Protocol{

    executeAction(scan: Scan[]): Coordinates | undefined{
        for (let i = 0; i < scan.length; i++) {
            const result = scan[i].allies;
            if (result != null) {
                return scan[i].coordinates;
            }
        }
    }
}