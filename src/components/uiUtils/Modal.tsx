import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;

}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {



  if (!isOpen) return null;
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-[#C4D9FF] dark:bg-[#16404D]  bg-opacity-100 w-[90%] md:w-1/2 lg:w-1/4 rounded-lg shadow-lg md:p-8 p-6 relative animate-fade-in"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-3 right-3 text-white bg-black p-1 rounded-full hover:text-red-600  duration-200 transform active:scale-75 transition-transform"
          onClick={onClose}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
          </svg>

        </button>
        <div className="mt-4">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
