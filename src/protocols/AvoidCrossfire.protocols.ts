import { Scan } from "../interface/Scan.interface";
import { Protocol } from "./Protocol.protocols";

export class AvoidCrossfire extends Protocol{

    executeAction() {
        let scans: Scan[] = [];

        for (let i = 0; i < this.scan.length; i++) {
            const result = this.scan[i].allies;
            if (result == null) {
                scans.push(this.scan[i]);
            }
        }
        return scans;
    }
}