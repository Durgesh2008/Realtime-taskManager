import { FC } from "react";
import { ErrorType } from "../Tasks/ITasks";

interface ErrorPageProps {
  type: ErrorType;
  msg: string;
}
const ErrorPage: FC<ErrorPageProps> = ({ type, msg }) => {
  const txtColor = () => {
    switch (type) {
      case ErrorType.NoData:
        return {normal:'text-blue-800',dark:'dark:text-blue-400'}
      case ErrorType.ServerError:
        return {normal:'text-red-800',dark:'dark:text-red-400'} 
    }
  }
  const color = txtColor();
  return (
    <div className={`flex items-center p-4 mb-4 text-sm ${color.normal} text-blue-800 rounded-lg bg-blue-50 dark:bg-gray-800 ${color.dark}`} role="alert">
      <svg className="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
      </svg>
      <span className="sr-only">Info</span>
      <div>
        <span className="font-medium">{type}!</span>{msg}
      </div>
    </div>
  )
}

export default ErrorPage
