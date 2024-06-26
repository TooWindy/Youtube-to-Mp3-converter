import express from 'express';
import ViteExpress from 'vite-express';
import router from './server/api/youtube.js';
const port = 5050;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', router);

ViteExpress.listen(app, port, () => console.log('Server is listening...'));
