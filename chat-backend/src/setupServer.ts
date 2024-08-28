import { Application, urlencoded, json } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieSession from 'cookie-session';
import compression from 'compression';
import http from 'http';

const PORT = 4000;

export class chatServer {
    private app: Application;

    constructor(app: Application) {
        this.app = app;
    }

    public start() {
        this.securityMiddleware(this.app);
        this.errorMiddleware(this.app);
        this.routeMiddleware(this.app);
        this.standardMiddleware(this.app);
        this.startServer(this.app);
    }
    private securityMiddleware(app: Application) {
        app.use(
            cookieSession({
                name: 'session',
                keys: ['key1', 'key2'],
                maxAge: 24 * 60 * 60 * 1000,
                secure: false,
            })
        )
        app.use(helmet());
        app.use(cors({
            origin: '*',
            credentials: true,
            optionsSuccessStatus: 200,
            methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        }));
    }
    private errorMiddleware(app: Application) {}
    private routeMiddleware(app: Application) {}
    private standardMiddleware(app: Application) {
        app.use(compression());
        app.use(json({ limit: '50mb' }));
        app.use(urlencoded({ extended: true, limit: '50mb' }));
    }
    private async startServer(app: Application) {
        try {
            const httpServer: http.Server = http.createServer(app);
            this.startHttpServer(httpServer);
        } catch (error) {
            console.log(error);
        }
    }
    private startHttpServer(httpServer: http.Server) {
        httpServer.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    }
}