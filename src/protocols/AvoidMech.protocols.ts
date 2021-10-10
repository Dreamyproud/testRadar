import { Scan } from "../interface/Scan.interface";
import { Protocol } from "./Protocol.protocols";

export class AvoidMech extends Protocol{
    executeAction(): Scan[] {
        let scans: Scan[] = [];
        for (let x = 0; x < this.scan.length; x++) {
            if (this.scan[x].enemies?.type != 'mech') {
                scans.push(this.scan[x]);
            }
        }
        return scans;
    }
}