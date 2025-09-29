import React, { useState, useEffect, useMemo } from 'react';
import { Pipeline } from './Pipeline';
import { AllOrder } from './AllOrder';
import { CompletedOrder } from './CompletedOrder';
import { PendingOrder } from './PendingOrder';
import { IconButton } from '../../component/Button';
import { MdOutlineFileDownload } from 'react-icons/md';
import { CustomPagination } from '../../component/Pagination';
import { useAuthStore } from '@/store/store';
import { useGetOrderData } from '@/hooks/useGetData';
import Cookies from 'js-cookie'

export const OrderDetails = () => {
  const orderSwitch = ['all', 'Completed', 'Pending'];
  const tableHeader = ['orderID', 'product details', 'amount', 'date', 'status', ' '];
  const [pipeline, setPipeline] = useState<string>('all');
  const [completedFilter, setCompletedFilter] = useState<any[]>([]);
  const [allordeerFilter, setAllorderFilter] = useState<any[]>([]);
  const [pendingFilter, setPendingFilter] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [isExporting, setIsExporting] = useState<boolean>(false);
  const itemsPerPage = 15; // Number of items per page

  const { isLoggedIn, user, token } = useAuthStore(state => ({
    isLoggedIn: state.isLoggedIn,
    user: state.user,
    token: state.token
  }));

  // const userToken = token;
  const userToken = Cookies.get('token') as string;

  const tkn_: string = Cookies.get('token') as string;

  const { data: orderinfo, isLoading: ordersLoading, error: ordererror } = useGetOrderData('/api/getallorders', "get_order_details", userToken);

  // CSV Export function for all transaction types
  const exportToCSV = async () => {
    if (ordersLoading) {
      alert('Please wait, data is still loading...');
      return;
    }

    if (!orderinfo?.data?.data?.data) {
      alert('No data available to export');
      return;
    }

    setIsExporting(true);

    let dataToExport: any[] = [];
    let fileName = '';

    // Determine which data to export based on current pipeline
    if (pipeline === orderSwitch[0]) {
      dataToExport = orderinfo.data.data.data.all_orders || [];
      fileName = 'all_transactions';
    } else if (pipeline === orderSwitch[1]) {
      dataToExport = orderinfo.data.data.data.completed_order || [];
      fileName = 'completed_transactions';
    } else if (pipeline === orderSwitch[2]) {
      dataToExport = orderinfo.data.data.data.pending_order || [];
      fileName = 'pending_transactions';
    } else {
      // Fallback to all orders if pipeline is not recognized
      dataToExport = orderinfo.data.data.data.all_orders || [];
      fileName = 'transactions';
    }

    if (!Array.isArray(dataToExport) || dataToExport.length === 0) {
      alert(`No ${pipeline} transactions available to export`);
      return;
    }

    try {
      // Prepare CSV data with better field mapping
      const csvHeaders = ['Order ID', 'Product Details', 'Amount', 'Date', 'Status', 'Customer Name', 'Reference'];
      const csvData = dataToExport.map((transaction: any) => [
        transaction.order_id || transaction.id || 'N/A',
        transaction.product_name || transaction.products[0].name || transaction.product_name || 'N/A',
        transaction.amount || transaction.total_price || transaction.total_amount || 'N/A',
        transaction.created_at || transaction.date || transaction.order_date || 'N/A',
        transaction.delivery_status || transaction.status || 'N/A',
        transaction.customer_name || transaction.full_name || 'N/A',
        transaction.reference || 'N/A'
      ]);

      // Create CSV content
      const csvContent = [
        csvHeaders.join(','),
        ...csvData.map(row => row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(','))
      ].join('\n');

      // Create and download CSV file
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', `${fileName}_${new Date().toISOString().split('T')[0]}.csv`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Clean up the URL object
      URL.revokeObjectURL(url);
      
      alert(`Successfully exported ${dataToExport.length} ${pipeline} transactions to CSV`);
    } catch (error) {
      console.error('Error exporting CSV:', error);
      alert('Error exporting CSV. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };


  useEffect(() => {
    if (orderinfo) {
      // Only set state if the data has changed
      const allOrders = orderinfo?.data?.data?.all_orders || [];
      const completedOrders = orderinfo?.data?.data?.completed_order || [];
      const pendingOrders = orderinfo?.data?.data?.pending_order || [];

      setAllorderFilter(allOrders.filter((transac: { delivery_status: string | string[]; }) => transac.delivery_status.includes(orderSwitch[0])));
      setCompletedFilter(completedOrders.filter((transac: { delivery_status: string | string[]; }) => transac.delivery_status.includes(orderSwitch[1])));
      setPendingFilter(pendingOrders.filter((transac: { delivery_status: string | string[]; }) => transac.delivery_status.includes(orderSwitch[2])));
    }
  }, [orderinfo]); // Add only necessary dependencies


  const handlePageChange = (selectedItem: { selected: number }) => {
    setCurrentPage(selectedItem.selected);
  };

  const paginatedTransactions = useMemo(() => {
    const start = currentPage * itemsPerPage;
    const end = start + itemsPerPage;
    if (pipeline === orderSwitch[0]) {
      return orderinfo?.data?.data?.data?.all_orders ? orderinfo?.data?.data?.data?.all_orders?.slice(start, end) : [];
    } else if (pipeline === orderSwitch[1]) {
      /*  return completedFilter?.slice(start, end); */
      return orderinfo?.data?.data?.data?.completed_order ? orderinfo?.data?.data?.data?.completed_order?.slice(start, end) : [];
    } else {
      /*    return pendingFilter?.slice(start, end); */
      return orderinfo?.data?.data?.data?.pending_order ? orderinfo?.data?.data?.data?.pending_order?.slice(start, end) : [];
    }
  }, [currentPage, pipeline, orderinfo, orderSwitch, itemsPerPage]);

  if (ordersLoading) {
    return <div>Loading...</div>;
  }

  if (!orderinfo) {
    return <div>No data available</div>;
  }

  return (
    <section className='mb-6 flex  flex-col w-full overflow-x-scroll overflow-y-scroll'>
      <div className='flex lg:justify-between lg:flex-row flex-col justify-center lg:my-0 my-4'>
        <h3 className='mb-1.5 text-xl font-Poppins text-[#101928] font-semibold'>Transactions</h3>
        <div className='flex flex-col items-end gap-1'>
          <IconButton
            type='button'
            text={isExporting ? 'Exporting...' : `Export ${pipeline.charAt(0).toUpperCase() + pipeline.slice(1)} CSV`}
            className='flex items-center gap-2 rounded-lg bg-[#F25E26] p-1 capitalize text-white w-fit justify-items-center'
            icon={<MdOutlineFileDownload className='text-base font-Poppins' />}
            handleClick={exportToCSV}
            disabled={isExporting}
          />
          <span className='text-xs text-gray-500 font-Poppins'>
            Export current view 
            {/* ({(() => {
              if (pipeline === orderSwitch[0]) {
                return orderinfo?.data?.data?.data?.all_orders?.length || 0;
              } else if (pipeline === orderSwitch[1]) {
                return orderinfo?.data?.data?.data?.completed_order?.length || 0;
              } else {
                return orderinfo?.data?.data?.data?.pending_order?.length || 0;
              }
            })()} {pipeline} transactions) */}
          </span>
        </div>
      </div>
      <Pipeline props={orderSwitch} setProps={setPipeline} start={pipeline} />

      <div className='relative mt-6 w-full overflow-x-auto'>
        <div className='mb-6 min-w-[720px] rounded-xl bg-white shadow-[0_12px_30px_rgba(16,24,40,0.08)] ring-1 ring-gray-100 overflow-hidden'>
        <table className='w-full table-auto'>
          <thead className='table-header-group rounded-t-xl bg-[#F0F2F5]'>
            <tr className='tracking-wide'>
              {tableHeader.map((val, index) => (
                <th
                  key={index}
                  className='mb-2 w-max p-6 text-left text-[12px] text-[#344054] font-Poppins font-medium capitalize tracking-wide'
                  scope='col'
                >
                  {val}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className=''>
            {

              paginatedTransactions?.length === 0 ?

                (
                  <tr>
                    <td colSpan={tableHeader.length} className='text-center py-6'>
                      <h1 className='font-Poppins text-center'>No Order Available</h1>
                    </td>
                  </tr>
                )
                :


                <>
                  {
                    pipeline === orderSwitch[0] ? (

                      <AllOrder transac={paginatedTransactions} />

                    ) : pipeline === orderSwitch[1] ? (
                      <CompletedOrder transac={paginatedTransactions} />
                    ) : (
                      <PendingOrder transac={paginatedTransactions} />
                    )}
                </>
            }
          </tbody>

          {/* Pagination */}
          <tfoot>
            <tr className='text-center'>
              <td colSpan={6} className='pt-3 text-center'>

                <CustomPagination
                  pageCount={Math.ceil(
                    pipeline === orderSwitch[0]
                      ? (orderinfo?.data?.data?.data?.all_orders ? orderinfo?.data?.data?.data?.all_orders.length : 0) / itemsPerPage
                      : pipeline === orderSwitch[1]
                        ? (completedFilter ? completedFilter.length : 0) / itemsPerPage
                        : (pendingFilter ? pendingFilter.length : 0) / itemsPerPage
                  )}
                  className='flex items-center justify-center gap-3'
                  pageRangeDisplayed={5}
                  onPageChange={handlePageChange}
                />

              </td>
            </tr>
          </tfoot>
        </table>
        </div>
      </div>
    </section>
  );
};

