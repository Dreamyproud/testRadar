import { Scan } from "../interface/Scan.interface";
import { Protocol } from "./Protocol.protocols";

export class AvoidMech extends Protocol{
    executeAction(scan: Scan[]): Scan[] {
        let scans: Scan[] = [];
        for (let x = 0; x < scan.length; x++) {
            if (scan[x].enemies?.type != 'mech') {
                scans.push(scan[x]);
            }
        }
        return scans;
    }
}