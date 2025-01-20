import { Link } from 'react-router-dom'
import coverImage from '../../assets/icons/cover.svg'
const CoverPage = () => {
    return (
        <div className='h-full w-full flex flex-col justify-center mt-5 items-center '>
            <div className="flex flex-col  w-3/4 items-center justify-center gap-2">
              <span className='font-bold text-xl  md:text-2xl'>Your day with your powerful <span className='text-[#8E1616] '>Task Management Platform</span></span>
              <span className='text-gray-200 text-lg md:text-xl w-[80%] md:w-1/2 text-center' >Never miss a beat-stay on top of your todo-list with our Task Management website</span>
               <Link to='/tasks' className='rounded-full  bg-blue-800 text-white  px-8 py-2 font-semibold mt-2 cursor-pointer hover:bg-black '>Get Start</Link>
            </div>
            <div className="h-[60%] flex justify-center items-center">
                <img src={coverImage} alt='cover image' loading='lazy' />
            </div>

        </div>
    )
}

export default CoverPage
