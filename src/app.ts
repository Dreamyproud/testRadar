import express, { Application } from 'express';
import morgan from 'morgan';

//Routes
import RadarRoutes from './routes/radar.routes'

export class App {
    private app: Application;
    constructor(private port?: number | string) {
        this.app = express();
        this.settings();
        this.middlewares();
        this.routes();
    }

    settings() {
        this.app.set('port', this.port || process.env.PORT || 8888);
    }

    middlewares() {
        this.app.use(morgan('dev'));
        this.app.use(express.json());
    }

    routes() {
        this.app.use('/radar/', RadarRoutes);
    }

    async listen() {
        await this.app.listen(this.app.get('port'));
        console.log('Server on port:', this.app.get('port'));
    }
}