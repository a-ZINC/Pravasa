import { chatServer } from './setupServer';
import express from 'express';

class App {
    public initialize() {
        const app = express();
        const server = new chatServer(app);
        server.start(); 
    }
}

const app = new App();
app.initialize();