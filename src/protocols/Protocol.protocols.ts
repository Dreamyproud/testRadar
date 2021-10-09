import { Coordinates } from '../interface/Coordinates.interface';
import { Scan } from '../interface/Scan.interface'
export class Protocol {
    scan: [Scan];

    constructor(scan: [Scan]) {
        this.scan = scan;
    }

}