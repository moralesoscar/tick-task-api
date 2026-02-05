import { Request, Response } from 'express';
import { Task, TimeUnit } from '../types/task';
import { TaskIteration } from '../types/task-iteration';

const TasksDummy: Task[] = [
    {
        id: '1',
        title: 'Unificarlas',
        status: 'active',
        type: 'ASAP'
    },
    {
        id: '2',
        title: 'Regar las plantas',
        status: 'active',
        type: 'DueTo',
        time: 1,
        unit: 'days'
    }
]

const IterationsDummy: TaskIteration[] = [
    {
        id: '6710029a-e6f0-4f2f-9030-d7c27e2aad86',
        task_id: '1',
        status: 'pending',
        due_to: new Date("2026-01-01T00:00:00Z")
    },
    {
        id: '6710029a-e6f0-4f2f-9030-d7c27e2aad87',
        task_id: '2',
        status: 'done',
        due_to: new Date("2026-02-05T00:00:00Z"),
        completedAt: new Date("2026-02-04T10:43:00Z")
    },
    {
        id: '6710029a-e6f0-4f2f-9030-d7c27e2aad88',
        task_id: '2',
        status: 'pending',
        due_to: new Date("2026-02-06T00:00:00Z")
    }
] 

// TASKS

export const getTasks = (_req: Request, _res: Response) => {
    _res.json(TasksDummy);
}


export const createTask = (_req: Request, _res: Response) => {
  const task = _req.body;

  if (!task.title || !task.type) {
    return _res.status(400).json('Algo salió mal');
  }

  if (task.type === 'DueTo') {
    const newTask: Task = {
        id: crypto.randomUUID(),
        title: task.title,
        status: 'active',
        type: task.type,
        time: task.time,
        unit: task.unit
    };
    TasksDummy.push(newTask);
    _res.status(201).json(newTask);
  } else if (task.type === 'ASAP') {
    const newTask: Task = {
        id: crypto.randomUUID(),
        title: task.title,
        status: 'active',
        type: task.type
    };
    TasksDummy.push(newTask);
    _res.status(201).json(newTask);
  }
    else {
    return _res.status(400).json('Tipo inválido');
  }
};


// ITERATIONS

export const getIterations = (_req: Request, _res: Response) => {
    _res.json(IterationsDummy);
}

export const doIteration = (_req: Request, _res: Response) => {
    const id = _req.params.id;

    console.log(`PATCH: ${id}`);

    const iteration = IterationsDummy.find(i => i.id === id);

    if (!iteration) {
        return _res.status(404).json({ message: 'Tarea no encontrada' });
    }
    if (iteration.status === 'done') {
        return _res.status(400).json({ message: 'Tarea ya realizada' });
    }

    iteration.status = 'done';
    iteration.completedAt = new Date();

    const task = TasksDummy.find(t => t.id === iteration.task_id);
    if (!task) {
        return _res.status(404).json({ message: 'Task no encontrada' });
    }

    if(task.type === 'DueTo') {
        const newDueTo = calculateNextDate(iteration.due_to, task.unit, task.time)
    
        const newIteration : TaskIteration = {
            id: crypto.randomUUID(),
            task_id: iteration.task_id,
            status: 'pending',
            due_to: newDueTo
        } 

        IterationsDummy.push(newIteration);
    }
    
    return _res.status(200).json(iteration);
}

const calculateNextDate = (date: Date, unit: TimeUnit, time: number) => {
    const newDate = new Date(date);

    switch (unit) {
        case 'minutes':
            newDate.setMinutes(date.getMinutes() + time)
            break;
        case 'hours':
            newDate.setHours(date.getHours() + time)
            break;
        case 'days':
            newDate.setDate(date.getDate() + time)
            break;
        case 'months':
            newDate.setMonth(date.getMonth() + time)
            break;
        case 'years':
            newDate.setFullYear(date.getFullYear() + time)
            break;
        default:
            break;
    }

    return newDate;
}