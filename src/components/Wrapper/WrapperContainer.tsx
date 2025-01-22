import { FC } from "react"
import { IWrapper } from "./IWrapper"
import Navbar from "../Header/Navbar";

const WrapperContainer: FC<IWrapper> = ({ children }) => {
    return (
        <div className=' h-screen bg-[#93c5fd]   font-satoshi'>
                <Navbar />
            {children}
    
        </div>
    )
}

export default WrapperContainer
// bg-gradient-to-l from-blue-300 to-blue-700 
