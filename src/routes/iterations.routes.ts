import { Router } from 'express';
import { getIterations, doIteration } from '../controllers/task.controller';

const router = Router();

router.get('/', getIterations);
router.patch('/:id', doIteration);

export default router;