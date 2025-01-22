import { ErrorType, ITableRow, TaskStatus } from "./ITasks";
import TableRow from "./TableRow";
import ErrorPage from "../uiUtils/ErrorPage";
import { useEffect, useState } from "react";
import useDebounce from "../../Hooks/useDebounce";
import usePaginatedData from "../../Hooks/usePaginatedData";
import Loading from "../uiUtils/Loading";
import { useSocket } from "../../context/socketContext";
import toast, { Toaster } from "react-hot-toast";

const TaskTable = () => {
  const [perPage, setPerPage] = useState(10);
  const [page, setPage] = useState(1);
  const [currStatus, setCurrStatus] = useState<TaskStatus>(TaskStatus.All);
  const [queryTxt, setQueryTxt] = useState("");
  const { socket } = useSocket();
  const debouncedQuery = useDebounce(queryTxt, 300);
  const debouncedPagesize = useDebounce(perPage, 300);
  const {
    data: TableData,
    loading,
    error,
    totalTask,
    totalpages,
    fetchAgain,
  } = usePaginatedData({
    url: "/tasks",
    page,
    pageSize: debouncedPagesize,
    queryTxt: debouncedQuery,
    status: currStatus === TaskStatus.All ? undefined : currStatus,
  });
  const handleNextPage = () => setPage((prevPage) => prevPage + 1);
  const handlePrevPage = () => setPage((prevPage) => Math.max(prevPage - 1, 1));

  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrStatus(event.target.value as TaskStatus);
  };
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const val = event.target.value;
    setPerPage(Number(val));
  };
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const val = event.target.value;
    setQueryTxt(val);
  };

  useEffect(() => {
    const handleTaskUpdate = (data: { action: string; msg: string }) => {
      fetchAgain();
      toast.success(`${data.action}! ${data.msg}`);
    };

    socket?.on("task_updated", handleTaskUpdate);
    return () => {
      socket?.off("task_updated", handleTaskUpdate);
    };
  }, [socket, fetchAgain]);

  return (
    <>
      <div className="bg-white   flex justify-around items-start  md:items-center flex-col md:flex-row gap-y-1  md:gap-x-4 border-b dark:bg-gray-800 dark:border-gray-700 mb-2 p-2 rounded">
        <div className="flex  md:justify-start  justify-center items-center gap-x-2 w-full md:w-1/4">
          <label
            htmlFor="per_page"
            className="block mb-1  text-sm font-medium text-gray-900 dark:text-white"
          >
            Page Size:-
          </label>
          <input
            value={perPage}
            type="number"
            id="per_page"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white outline-none"
            placeholder="10"
            onChange={handleChange}
          />
        </div>
        <div className="flex md:justify-center  justify-start items-center  md:gap-x-2  w-full md:w-1/4">
          <label
            htmlFor="per_page"
            className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
          >
            Filter By Status:-
          </label>
          <select
            id="status"
            className="bg-gray-50 flex-1  border border-gray-300 text-gray-900 text-sm rounded-lg block p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white outline-none"
            value={currStatus}
            onChange={handleStatusChange}
          >
            <option value={TaskStatus.All}>{TaskStatus.All}</option>
            <option value={TaskStatus.Pending}>{TaskStatus.Pending}</option>
            <option value={TaskStatus.InProgress}>
              {TaskStatus.InProgress}
            </option>
            <option value={TaskStatus.Completed}>{TaskStatus.Completed}</option>
          </select>
        </div>
        <div className="relative md:w-2/5 w-full">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="search"
            value={queryTxt}
            id="default-search"
            className="block w-full p-1 ps-10 text-sm text-gray-900 border outline-none border-gray-300 rounded-lg bg-gray-50  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white "
            placeholder="Search Mockups, Logos..."
            onChange={handleSearch}
          />
        </div>
      </div>
      {TableData.length <= 0 ? (
        <ErrorPage type={ErrorType.NoData} msg="No Task Data found " />
      ) : (
        <>
          {error ? (
            <ErrorPage type={ErrorType.ServerError} msg={error} />
          ) : (
            <>
              <table className="w-full  text-sm text-left rtl:text-right text-gray-500 overflow-y-auto dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Name
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Created On
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <Loading />
                  ) : (
                    (TableData as ITableRow[])?.map((ele: ITableRow) => (
                      <TableRow
                        key={ele.id}
                        name={ele.name}
                        id={ele.id}
                        createdAt={ele.createdAt || ""}
                        status={ele.status}
                      />
                    ))
                  )}
                </tbody>
              </table>
              <div className="bg-white  sticky bottom-0  flex justify-between  gap-x-4 border-b dark:bg-gray-800 dark:border-gray-700 mt-2 p-2 rounded">
                <div className="flex w-1/3 justify-around">
                  <span className="dark:text-white text-gray-800">Total Task:{totalTask}</span>
                  <span className="dark:text-white ">Current Page:{page}</span>
                </div>

                <div className="flex w-1/2 gap-x-10 justify-end items-center">
                  <button
                    disabled={page <= 1}
                    onClick={handlePrevPage}
                    className="px-3 py-1 bg-transparent cursor-pointer rounded-md text-gray-800 dark:text-white outline-none focus:ring-4 shadow-lg transform active:scale-75 transition-transform"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 19.5 8.25 12l7.5-7.5"
                      />
                    </svg>
                  </button>
                  <button
                    disabled={page >= totalpages}
                    onClick={handleNextPage}
                    className="px-3 py-1 cursor-pointer bg-transparent  rounded-md text-gray-800 dark:text-white outline-none focus:ring-4 shadow-lg transform active:scale-75 transition-transform"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m8.25 4.5 7.5 7.5-7.5 7.5"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </>
          )}
        </>
      )}

      <Toaster position="top-center" />
    </>
  );
};

export default TaskTable;
