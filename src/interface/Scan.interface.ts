import { Coordinates } from '../interface/Coordinates.interface'
import { Enemies } from '../interface/Enemies.interface'

export interface Scan {
    coordinates: Coordinates;
    enemies: Enemies;
    allies?: number,
}