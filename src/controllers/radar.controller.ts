import { Request, Response } from 'express'
import { Radar } from '../interface/Radar.interface'
import { RadarService } from '../service/radar.service'

export async function sendCoordinates(req: Request, res: Response) {
    const coordinates: Radar = req.body;
    const radarService = new RadarService();
    const coordinatesRequest = radarService.sendObjectives(coordinates);
    console.log()
    return res.json({
        x: coordinatesRequest?.x,
        y: coordinatesRequest?.y
    });
}