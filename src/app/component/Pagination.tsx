import React from 'react'
import ReactPaginate from 'react-paginate'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa6'

// type PaginationProps = {
//   pageCount: number
//   onPageChange: any
//   className?: string
//   pageRangeDisplayed?: number
// }

interface PaginationProps {
  pageCount: number;
  onPageChange: (selectedItem: { selected: number }) => void;
  className?: string;
  pageRangeDisplayed?: number;
  currentPage?: number;
}

export const Pagination = ({
  pageCount,
  onPageChange,
  className,
  pageRangeDisplayed,
  currentPage = 0
}: PaginationProps) => {
  return (
    <div className={`my-12`}>
      <ReactPaginate
        breakLabel='...'
        nextLabel='>'
        previousLabel='<'
            onPageChange={onPageChange}
        // onPageChange={selectedItem => onPageChange(selectedItem.selected)}
        pageRangeDisplayed={pageRangeDisplayed ? pageRangeDisplayed : 4}
        pageCount={pageCount}
        renderOnZeroPageCount={null}
        className={className}
        pageLinkClassName='px-5 py-3 bg-gray-100 text-2xl text-[#D2D2D2]'
        activeClassName='text-[#F25E26]  font-semibold'
        activeLinkClassName='border-[#f25e26] border-2 text-[#F25E26]'
        nextClassName={`px-5 py-3 bg-gray-100 text-2xl ${currentPage >= pageCount - 1 ? 'text-gray-400 cursor-not-allowed opacity-50' : 'text-[#D2D2D2]'}`}
        nextLinkClassName={currentPage >= pageCount - 1 ? 'pointer-events-none' : ''}
        previousClassName='px-5 py-3 bg-gray-100 text-[#D2D2D2] text-xl'
        previousLinkClassName=''
      />
    </div>
  )
}

// export const CustomPagination = ({
//   pageCount,
//   onPageChange,
//   className,
//   pageRangeDisplayed
// }: PaginationProps) => {
//   return (
//     <div className={`my-4`}>
//       <ReactPaginate
//         breakLabel='...'
//         nextLabel='>'
//         previousLabel='<'
//         onPageChange={selectedItem => onPageChange(selectedItem.selected)}
//         pageRangeDisplayed={pageRangeDisplayed ? pageRangeDisplayed : 4}
//         pageCount={pageCount}
//         renderOnZeroPageCount={null}
//         className={className}
//         pageLinkClassName='px-5 py-3 rounded-md text-sm text-[#D2D2D2]'
//         activeClassName=' font-semibold'
//         activeLinkClassName='border-[#f25e26] border-2 text-black'
//         nextClassName='px-5 py-3 rounded-md text-[#D2D2D2] text-sm'
//         nextLinkClassName='border rounded-md px-5 py-3 text-black'
//         previousClassName='  text-[#D2D2D2] text-sm '
//         previousLinkClassName='border px-5 py-3 rounded-md text-black'
//       />
//     </div>
//   )
// }


export const CustomPagination = ({
  pageCount,
  onPageChange,
  className,
  pageRangeDisplayed,
  currentPage = 0
}: PaginationProps) => {
  return (
    <div className={`my-4`}>
      <ReactPaginate
        breakLabel='...'
        nextLabel='>'
        previousLabel='<'
        onPageChange={onPageChange}
        pageRangeDisplayed={pageRangeDisplayed ? pageRangeDisplayed : 4}
        pageCount={pageCount}
        renderOnZeroPageCount={null}
        className={className}
        pageLinkClassName='px-5 py-3 rounded-md text-sm text-[#D2D2D2]'
        activeClassName='font-semibold'
        activeLinkClassName='border-[#f25e26] border-2 text-black'
        nextClassName={`px-5 py-3 rounded-md text-sm ${currentPage >= pageCount - 1 ? 'text-gray-400 cursor-not-allowed opacity-50' : 'text-[#D2D2D2]'}`}
        nextLinkClassName={`border rounded-md px-5 py-3 ${currentPage >= pageCount - 1 ? 'pointer-events-none text-gray-400' : 'text-black'}`}
        previousClassName='text-[#D2D2D2] text-sm'
        previousLinkClassName='border px-5 py-3 rounded-md text-black'
      />
    </div>
  );
};

export const CircularPagination = ({
  pageCount,
  onPageChange,
  className,
  currentPage = 0
}: PaginationProps) => {
  return (
    <div className={`my-4`}>
      <ReactPaginate
        breakLabel='...'
        nextLabel={
          <FaArrowRight className={`rounded-full p-3 text-4xl ${currentPage >= pageCount - 1 ? 'cursor-not-allowed bg-gray-400 opacity-50' : 'cursor-pointer bg-[#F25E26]'}`} />
        }
        previousLabel={
          <FaArrowLeft className='cursor-pointer rounded-full  bg-[#FCDFD4] p-3 text-4xl' />
        }
        // onPageChange={selectedItem => onPageChange(selectedItem.selected)}
            onPageChange={onPageChange}
        pageRangeDisplayed={4}
        pageCount={pageCount}
        renderOnZeroPageCount={null}
        className={className}
        pageLinkClassName='hidden'
        activeClassName='hidden'
        activeLinkClassName='hidden'
        nextClassName={`p-3 rounded-md text-sm ${currentPage >= pageCount - 1 ? 'pointer-events-none' : ''}`}
        nextLinkClassName={currentPage >= pageCount - 1 ? 'pointer-events-none' : 'text-black'}
        previousClassName='  text-[#D2D2D2] text-sm'
        previousLinkClassName=' text-black'
      />
    </div>
  )
}
