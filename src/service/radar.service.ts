import { Radar } from '../interface/Radar.interface'
import { Coordinates } from '../interface/Coordinates.interface'
import { Scan } from '../interface/Scan.interface';
import { AvoidMech } from '../protocols/AvoidMech.protocols';
import { PrioritizeMech } from '../protocols/PrioritizeMech.protocols';
import { AvoidCrossfire } from '../protocols/AvoidCrossfire.protocols';
import { ClosestEnemies } from '../protocols/ClosestEnemies.protocols';
import { FurthestEnemies } from '../protocols/FurthestEnemies.protocols';
import { AssistAllies } from '../protocols/AssistAllies.protocols';

export class RadarService {

    sendObjectives(radar: Radar) {
        let coordinatesResult: Coordinates | undefined;
        let avoidMech = new AvoidMech(radar.scan);
        let prioritizeMech = new PrioritizeMech(radar.scan);
        let avoidCrossfire = new AvoidCrossfire(radar.scan);
        let closestEnemies = new ClosestEnemies(radar.scan);
        let furthestEnemies = new FurthestEnemies(radar.scan);
        let assistAllies = new AssistAllies(radar.scan);
        let scanList: Scan[] = radar.scan;
        for (let i = 0; i < radar.protocols.length; i++) {
            if (radar.protocols[i] == 'avoid-mech') {
                scanList = avoidMech.executeAction(scanList);
            } else if (radar.protocols[i] == 'prioritize-mech') {
                scanList = prioritizeMech.executeAction(scanList);
            } else if (radar.protocols[i] == 'avoid-crossfire') {
                scanList = avoidCrossfire.executeAction(scanList);
            }
            if (radar.protocols.length == 1) {
                coordinatesResult = scanList[0].coordinates;
            }
        }

        for (let i = 0; i < radar.protocols.length; i++) {
            if (radar.protocols[i] == 'closest-enemies') {
                coordinatesResult = closestEnemies.executeAction(scanList);
            } else if (radar.protocols[i] == 'furthest-enemies') {
                coordinatesResult = furthestEnemies.executeAction(scanList);
            } else if (radar.protocols[i] == 'assist-allies') {
                coordinatesResult = assistAllies.executeAction(scanList);
            }
        }

        return coordinatesResult;
    }
}