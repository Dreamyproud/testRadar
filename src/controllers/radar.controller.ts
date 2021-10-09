import { Request, Response } from 'express'
import { Radar } from '../interface/Radar.interface'

export async function sendCoordinates(req: Request, res: Response) {
    const coordinates: Radar = req.body;
    console.log(coordinates);
    return res.json({
        message: 'Send coordinates'
    });
}