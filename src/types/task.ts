export type TimeUnit = 'years' | 'months' | 'days' | 'hours' | 'minutes';

export type TaskStatus = 'active' | 'inactive';

export type TaskType = 'ASAP' | 'DueTo';

interface BaseTask {
  id: string;
  title: string;
  status: TaskStatus;
  type: TaskType;
}

interface ASAPTask extends BaseTask {
  type: 'ASAP';
}

interface DueToTask extends BaseTask {
  type: 'DueTo';
  time: number;
  unit: TimeUnit;
}

export type Task = ASAPTask | DueToTask;