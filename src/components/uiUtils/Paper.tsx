import { FC } from "react";
import { IWrapper } from "../Wrapper/IWrapper";
import Modal from "./Modal";
import { useSearchParams } from "react-router-dom";
import { Mode } from "../Tasks/ITasks";
import TaskForm from "../Tasks/TaskForm";

const Paper: FC<IWrapper & { title: string }> = ({ children, title }) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const mode = searchParams.get("mode") as Mode;
    const id = searchParams.get("id") as string;

    const isModalOpen = mode ? true : false;

    const onclose = () => {
        setSearchParams("")
    }
    const handleAddTask = () => {
        setSearchParams({ mode: Mode.AddTask })
    }

    return (
        <>
        <div className="bg-blue-200 shadow-lg h-[80%]  rounded lg:p-8 md:p-5 p-2 md:mx-4 lg:mx-10 mx-2 my-3">
           
            <div className="flex justify-between items-center">
                <span className="text-orange-400 font-semibold md:text-xl text-lg lg:text-2xl">
                    {title}
                </span>
                <button className="px-3 py-1 bg-blue-400 rounded-md text-white outline-none focus:ring-4 shadow-lg transform active:scale-75 transition-transform" onClick={handleAddTask}>Add Task</button>
            </div>

            <hr className="h-1 bg-orange-400 rounded my-2" />
            <div className="scrollable-container overflow-auto max-h-[70vh] p-2">{children}</div>
            
        </div>
         <Modal isOpen={isModalOpen} onClose={onclose} >
         <TaskForm id={Number(id)} onclose={onclose} />
     </Modal>
     </>
    );
};

export default Paper;
