import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import { FaPencilAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { AdminOrders, clearErrors, deleteOrder } from "../../action/OrderActtion";
import { MdDeleteSweep } from "react-icons/md";
import { CLEAR_ERROR, DELETE_ORDERS__RESET } from "../../constant/OrderConstant";
import {toast} from 'react-toastify'

const Orders = () => {
  const dispatch = useDispatch();
  const { orders, error } = useSelector((state) => state.adminOrd);
  const { isDeleted, err } = useSelector((state) => state.updOrd);

  
  useEffect(() => {

    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (err) {
      toast.error(deleteError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      toast.success("Order Deleted Successfully");
      dispatch({ type: DELETE_ORDERS__RESET });
    }

    dispatch(AdminOrders())
  },[dispatch,error,err,isDeleted]);


const deleteProductHandler = (id)=>{
  dispatch(deleteOrder(id))

}
  const columns = [
    {
      name: "id",
      selector: (row) => row.id,
      sortable: true,
      style: { fontSize: 20, backgroundColor: "#617fd2" },
    },


    {
      name: "Status",
      selector: (row) => row.Status,
      sortable: true,
      style: { fontSize: 20, backgroundColor: "#617fd2" },
    },
    {
      name: "amount",
      selector: (row) => row.amount,
      sortable: true,
      style: {  fontSize: 20,backgroundColor: "#617fd2", color : "#fff" },
    },

    {
      name: "Delete",
      button: true,
      cell: (params) => (
        <button onClick={() => deleteProductHandler(params.id, "id")}>
          <MdDeleteSweep />
        </button>
      ),
      style: { backgroundColor: "#d4844f" },
    },

    {
      name: "visit",
      selector: "visit.length",
      maxWidth: "100px",
      sortable: true,
      cell: (params) => {
        return (
        
            <Link to={`/admin/order/${params.id}`}>
              <FaPencilAlt />
            </Link>
         
        );
      },
      style: { backgroundColor: "#78d54c" },
    },
  ];

  const data = [];

   
  orders &&
    orders.forEach((ord) => {
  data.push({
    id: ord._id,
    Status: ord.orderStatus,
    amount: ord.totalPrice,
  
  });
  });

  const tableCustomStyles = {
    headRow: {
      style: {
        fontSize: 20,
        color: "#223336",
        backgroundColor: "#91e3dc",
      },
    },
  };
  return (
    <div>
      <div className="  mt-12 ">
        <h1 className=" flex justify-center text-3xl  underline font-serif mb-5">
          All Users Orders :
        </h1>
        <div className="productListContainer">
          <DataTable
            columns={columns}
            data={data}
            highlightOnHover
            pointerOnHover
            pagination
            customStyles={tableCustomStyles}
          />
        </div>
      </div>
    </div>
  );
};

export default Orders;
