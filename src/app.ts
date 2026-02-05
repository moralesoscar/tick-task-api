import express from "express";
import cors from 'cors';
import taskRoutes from './routes/tasks.routes';
import iterationsRoutes from './routes/iterations.routes';

const port = 3000;
const app = express();

app.use(cors());
app.use(express.json());

app.use('/tasks', taskRoutes);
app.use('/iterations', iterationsRoutes);

app.listen(port, () => {
    console.log(`App running on port ${port}`)
})