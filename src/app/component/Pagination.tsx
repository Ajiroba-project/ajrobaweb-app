import React from 'react'
import ReactPaginate from 'react-paginate'

type PaginationProps = {
  pageCount: number
  onPageChange: any
  className?: string
  pageRangeDisplayed?: number
}

export const Pagination = ({
  pageCount,
  onPageChange,
  className,
  pageRangeDisplayed
}: PaginationProps) => {
  return (
    <div className={`my-12`}>
      <ReactPaginate
        breakLabel='...'
        nextLabel='>'
        previousLabel='<'
        onPageChange={selectedItem => onPageChange(selectedItem.selected)}
        pageRangeDisplayed={pageRangeDisplayed ? pageRangeDisplayed : 4}
        pageCount={pageCount}
        renderOnZeroPageCount={null}
        className={className}
        pageLinkClassName='px-5 py-3 bg-gray-100 text-2xl text-[#D2D2D2]'
        activeClassName='text-[#F25E26]  font-semibold'
        activeLinkClassName='border-[#f25e26] border-2 text-[#F25E26]'
        nextClassName='px-5 py-3 bg-gray-100 text-[#D2D2D2] text-2xl'
        nextLinkClassName=''
        previousClassName='px-5 py-3 bg-gray-100 text-[#D2D2D2] text-xl'
        previousLinkClassName=''
      />
    </div>
  )
}

export const CustomPagination = ({
  pageCount,
  onPageChange,
  className,
  pageRangeDisplayed
}: PaginationProps) => {
  return (
    <div className={`my-12`}>
      <ReactPaginate
        breakLabel='...'
        nextLabel='>'
        previousLabel='<'
        onPageChange={selectedItem => onPageChange(selectedItem.selected)}
        pageRangeDisplayed={pageRangeDisplayed ? pageRangeDisplayed : 4}
        pageCount={pageCount}
        renderOnZeroPageCount={null}
        className={className}
        pageLinkClassName='px-5 py-3 bg-gray-100 text-2xl text-[#D2D2D2]'
        activeClassName='text-[#F25E26]  font-semibold'
        activeLinkClassName='border-[#f25e26] border-2'
        nextClassName='px-5 py-3 bg-gray-100 text-[#D2D2D2] text-2xl'
        nextLinkClassName=''
        previousClassName='px-5 py-3 bg-gray-100 text-[#D2D2D2] text-xl'
        previousLinkClassName=''
      />
    </div>
  )
}
