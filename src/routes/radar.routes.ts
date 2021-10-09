import { Router } from 'express';
const router = Router();

import {sendCoordinates} from '../controllers/radar.controller'

router.route('/').post(sendCoordinates);

export default router;