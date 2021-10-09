import { Radar } from '../interface/Radar.interface'
import { Coordinates } from '../interface/Coordinates.interface'
import { Scan } from '../interface/Scan.interface';

export class RadarService {

    sendObjectives(coordinates: Radar): Coordinates | undefined {
        let coordinatesResult: Coordinates | undefined;

        if (coordinates.protocols.length == 1) {
            switch (coordinates.protocols[0]) {
                case 'avoid-mech': {
                    coordinatesResult = this.avoidMech(coordinates.scan)[0].coordinates;
                    break;
                }
                case 'prioritize-mech': {
                    coordinatesResult = this.prioritizeMech(coordinates.scan)[0].coordinates;
                    break;
                }
                case 'closest-enemies': {
                    coordinatesResult = this.closestEnemies(coordinates.scan);
                    break;
                }
                case 'furthest-enemies': {
                    coordinatesResult = this.furthestEnemies(coordinates.scan);
                    break;
                }
                case 'assist-allies': {
                    coordinatesResult = this.assistAllies(coordinates);
                    break;
                }
                case 'avoid-crossfire': {
                    coordinatesResult = this.avoidCrossfire(coordinates.scan)[0].coordinates;
                    break;
                }

                default: {
                    break;
                }
            }
        } else {
            for (let i = 0; i < coordinates.protocols.length; i++) {
                if (coordinates.protocols[i].includes('closest-enemies' && 'avoid-mech')) {
                    const avoidMech = this.avoidMech(coordinates.scan);
                    const closestEnemies = this.closestEnemies(avoidMech);
                    coordinatesResult = closestEnemies;
                }
                if (coordinates.protocols[i].includes('closest-enemies' && 'prioritize-mech')) {
                    const priotizeMech = this.prioritizeMech(coordinates.scan);
                    const closestEnemies = this.closestEnemies(priotizeMech);
                    coordinatesResult = closestEnemies;
                }
                if (coordinates.protocols[i].includes('closest-enemies' && 'prioritize-mech' && 'avoid-crossfire')) {
                    const priotizeMech = this.prioritizeMech(coordinates.scan);
                    const avoidCrossfire = this.avoidCrossfire(priotizeMech);
                    const closestEnemies = this.closestEnemies(avoidCrossfire);
                    coordinatesResult = closestEnemies;
                }
                if (coordinates.protocols[i].includes('furthest-enemies' && 'avoid-mech')) {
                    const avoidMech = this.avoidMech(coordinates.scan);
                    const furthestEnemies = this.furthestEnemies(avoidMech);
                    coordinatesResult = furthestEnemies;
                }
            }
        }
        return coordinatesResult;
    }

    avoidMech(scan: Scan[]): Scan[] {
        let scans: Scan[] = [];
        for (let x = 0; x < scan.length; x++) {
            if (scan[x].enemies?.type != 'mech') {
                scans.push(scan[x]);
            }
        }
        return scans;
    }

    prioritizeMech(scan: Scan[]): Scan[] {
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
    closestEnemies(scan: Scan[]): Coordinates | undefined {
        let resultCoordinates: Coordinates = scan[0].coordinates;
        let min = Number(Math.sqrt((0 - scan[0].coordinates.x) ** 2 + (0 - scan[0].coordinates.y) ** 2));
        for (let i = 0; i < scan.length; i++) {
            const result = Math.sqrt((0 - scan[i].coordinates.x) ** 2 + (0 - scan[i].coordinates.y) ** 2);

            if ((result < min) && (result <= 100)) {
                min = result;
                resultCoordinates = scan[i].coordinates;
            }
        }
        console.log('xx', resultCoordinates);
        return resultCoordinates;
    }
    furthestEnemies(scan: Scan[]): Coordinates | undefined {
        let resultCoordinates: Coordinates = scan[0].coordinates;
        let max = Number(Math.sqrt((0 - scan[0].coordinates.x) ** 2 + (0 - scan[0].coordinates.y) ** 2));
        for (let i = 0; i < scan.length; i++) {
            const result = Math.sqrt((0 - scan[i].coordinates.x) ** 2 + (0 - scan[i].coordinates.y) ** 2);
            if ((result > max) && (result <= 100)) {
                max = result;
                resultCoordinates = scan[i].coordinates;
            }
        }
        return resultCoordinates;
    }
    assistAllies(radar: Radar): Coordinates | undefined {
        for (let i = 0; i < radar.scan.length; i++) {
            const result = radar.scan[i].allies;
            if (result != null) {
                return radar.scan[i].coordinates;
            }
        }
    }
    avoidCrossfire(scan: Scan[]): Scan[] {
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