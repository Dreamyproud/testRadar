import { Coordinates } from "../interface/Coordinates.interface";
import { Scan } from "../interface/Scan.interface";
import { Protocol } from "./Protocol.protocols";

export class AssistAllies extends Protocol{

    executeAction(): Coordinates | undefined{
        for (let i = 0; i < this.scan.length; i++) {
            const result = this.scan[i].allies;
            if (result != null) {
                return this.scan[i].coordinates;
            }
        }
    }
}