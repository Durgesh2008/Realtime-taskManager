import { Link } from 'react-router-dom'
const CoverPage = () => {
    return (
        <div className='h-[85%] w-full flex flex-col justify-center  items-center '>
            <div className="flex flex-col w-full md:w-3/4 items-center justify-center ">
              <span className='font-bold text-center text-xl  md:text-2xl'>Your day with your powerful <span className='text-[#8E1616] '>Task Management Platform</span></span>
              <span className='text-gray-200 text-lg md:text-xl w-[80%] md:w-1/2 text-center' >Never miss a beat-stay on top of your todo-list with our Task Management website</span>
               <Link to='/tasks' className='rounded-full  bg-blue-800 text-white  px-8 py-2 font-semibold mt-2 cursor-pointer hover:bg-black '>Get Start</Link>
            </div>

        </div>
    )
}

export default CoverPage
