export enum TaskStatus {
    All="All",
    Pending = "Pending",
    InProgress = "In Progress",
    Completed = "Completed",
}

export enum Mode {
    AddTask = "Add Task",
    UpdateTask = "Update Task"
}
export enum ErrorType{
    NoData= "No Data",
    ServerError = "Server Error"
}


export interface ITableRow {
    id: number;
    name: string;
    status: TaskStatus;
    createdAt?: string;
}
