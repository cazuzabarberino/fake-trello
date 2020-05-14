import Task from "./Task";

export default interface List {
  title: string;
  tasks: Task[];
  id: string;
}
