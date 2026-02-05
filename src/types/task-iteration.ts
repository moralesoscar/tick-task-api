export type IterationStatus = 'pending' | 'done';

export interface TaskIteration {
    id: string;
    task_id: string;
    status: IterationStatus;
    due_to: Date;
    completedAt?: Date;
}