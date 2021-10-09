import { Scan } from '../interface/Scan.interface'

export interface Radar {
    protocols: [string];
    scan: [Scan];
}