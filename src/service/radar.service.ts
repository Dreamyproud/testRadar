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
        let avoidMech = new AvoidMech();
        let prioritizeMech = new PrioritizeMech();
        let avoidCrossfire = new AvoidCrossfire();
        let closestEnemies = new ClosestEnemies();
        let furthestEnemies = new FurthestEnemies();
        let assistAllies = new AssistAllies();
        let scanList: Scan[] = radar.scan;

        for (let i = 0; i < radar.protocols.length; i++) {
            if (radar.protocols[i] == 'avoid-mech') {
                avoidMech.scan = scanList;
                scanList = avoidMech.executeAction();
            } else if (radar.protocols[i] == 'prioritize-mech') {
                prioritizeMech.scan = scanList;
                scanList = prioritizeMech.executeAction();
            } else if (radar.protocols[i] == 'avoid-crossfire') {
                avoidCrossfire.scan = scanList;
                scanList = avoidCrossfire.executeAction();
            }
            if (radar.protocols.length == 1) {
                coordinatesResult = scanList[0].coordinates;
            }
        }

        for (let i = 0; i < radar.protocols.length; i++) {
            if (radar.protocols[i] == 'closest-enemies') {
                closestEnemies.scan = scanList;
                coordinatesResult = closestEnemies.executeAction();
            } else if (radar.protocols[i] == 'furthest-enemies') {
                furthestEnemies.scan = scanList;
                coordinatesResult = furthestEnemies.executeAction();
            } else if (radar.protocols[i] == 'assist-allies') {
                assistAllies.scan = scanList;
                coordinatesResult = assistAllies.executeAction();
            }
        }

        return coordinatesResult;
    }
}