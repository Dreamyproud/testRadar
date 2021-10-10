import { Scan } from "../interface/Scan.interface";
import { Protocol } from "./Protocol.protocols";

export class PrioritizeMech extends Protocol{

    executeAction(): Scan[]{
        let scan = this.scan;
        let scanMech: Scan[] = [];
        let scanSoldiers: Scan[] = [];
        let isMech: Scan | undefined;
        let isSoldiers: Scan | undefined;
        for (let x = 0; x < scan.length; x++) {
            if (scan[x].enemies?.type == 'mech') {
                isMech = scan[x];
                scanMech.push(isMech);
            } else if (scan[x].enemies?.type == 'soldier') {
                isSoldiers = scan[x];
                scanSoldiers.push(isSoldiers);
            }
        }
        if (scanMech != null) {
            return scanMech;
        } else {
            return scanSoldiers;
        }
    }
}