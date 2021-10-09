import { Scan } from "../interface/Scan.interface";
import { Protocol } from "./Protocol.protocols";

export class AvoidCrossfire extends Protocol{

    executeAction(scan: Scan[]): Scan[] {
        let scans: Scan[] = [];

        for (let i = 0; i < scan.length; i++) {
            const result = scan[i].allies;
            if (result == null) {
                scans.push(scan[i]);
            }
        }
        return scans;
    }
}