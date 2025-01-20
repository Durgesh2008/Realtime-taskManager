import { FC, useEffect, useState } from "react"
import { ErrorType, ITableRow, TaskStatus } from "./ITasks"
import usePost from "../../Hooks/usePost";
import usePut from "../../Hooks/usePut";
import useGet from "../../Hooks/useGet";
import ErrorPage from "../uiUtils/ErrorPage";
interface FormProps{
    id?:number;
    onclose: () => void;
}
const TaskForm:FC<FormProps> = ({id,onclose}) => {
    const { data: updatedTask } = useGet<ITableRow>(`/tasks/${Number(id)}`)
    const mode = id?"Update Task":"Add Task";
    const [taskName, setTaskName] = useState(updatedTask?.name || "");
    const [currStatus, setCurrStatus] = useState<TaskStatus>(updatedTask?.status || TaskStatus.Pending);
    const { data: addRes, isLoading, error, postData } = usePost<ITableRow>("/tasks");
    const { data: updateRes, isLoading: updateIsLoading, error: updateError, putData } = usePut<ITableRow>(`/tasks/${id}`);
    const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (Number(id)>0) {
            putData({ name: taskName, status: currStatus });
        } else {
            postData({ name: taskName, status: currStatus });
        }

    }

    const handleChangeStatus = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setCurrStatus(event.target.value as TaskStatus)
    };
    const handleTaskName = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTaskName(event.target.value as string)
    }
  
    useEffect(() => {
        if (addRes?.id || updateRes?.id) {
            onclose()
        }
        if(updatedTask?.id){
            setTaskName(updatedTask.name)
            setCurrStatus(updatedTask.status)
        }
    }, [addRes, updateRes,updatedTask])
  return (
    <div>
      <form className="max-w-sm mx-auto" onSubmit={handleSubmit}>
                    <div className="mb-2">
                        <label htmlFor="text" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enter Task Name</label>
                        <input type="text" id="taskName" value={taskName} onChange={handleTaskName} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg   block w-full p-2 dark:bg-gray-700  outline-none dark:placeholder-gray-400 dark:text-white " placeholder="check repo" required />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="text" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Status</label>
                        <select id="status" className="bg-gray-50 w-full  text-gray-900 text-sm rounded-lg block p-2 dark:bg-gray-700  dark:placeholder-gray-400 dark:text-white outline-none" value={currStatus} onChange={handleChangeStatus}>
                            <option value={TaskStatus.Pending}>{TaskStatus.Pending}</option>
                            <option value={TaskStatus.InProgress}>{TaskStatus.InProgress}</option>
                            <option value={TaskStatus.Completed}>{TaskStatus.Completed}</option>
                        </select>
                    </div>
                    {(error || updateError) && <ErrorPage type={ErrorType.ServerError} msg={error || updateError || ""} />}
                    <div className="w-full flex justify-start items-center">
                        <button type="submit" className="p-1 bg-gray-700 text-white rounded mt-1 w-1/3">{isLoading || updateIsLoading ? "Submitting..." : mode}</button>
                    </div>
                </form>
    </div>
  )
}

export default TaskForm
