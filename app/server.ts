
import cors from "@fastify/cors";
import dotenv from 'dotenv';
import Fastify from "fastify";
import mongoose from "mongoose";
import { routes } from "./routes";

const app = Fastify({ logger: true });
dotenv.config();

const start = async () => {

    await app.register(cors);
    await app.register(routes);
    const urlDB = process.env.MONGODATABASE || '';
    mongoose.connect(
        urlDB,
    );

    const db = mongoose.connection;
    db.on('error', (error) => {
        console.error(error);
    });

    db.once('open', () => console.log('Connected to perebas fut database'));

    const optionsObject = {
        port: 3333,
        host: '0.0.0.0'
    }
    try {
        await app.listen(optionsObject);
    } catch (err) {
        app.log.error(err);
        process.exit(1);
    }

}

start();