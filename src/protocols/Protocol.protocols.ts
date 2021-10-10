import { Coordinates } from '../interface/Coordinates.interface';
import { Scan } from '../interface/Scan.interface'
export class Protocol {
    
    private _scan: Scan[] = [];

    public set scan(scan: Scan[]) {
        
        this._scan = scan;
    }

    public get scan() {
        return this._scan;
    }


}