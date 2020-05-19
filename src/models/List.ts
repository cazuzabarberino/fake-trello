import Task from "./Task";

export default interface TaskList {
  title: string;
  tasks: Task[];
  id: string;
}
