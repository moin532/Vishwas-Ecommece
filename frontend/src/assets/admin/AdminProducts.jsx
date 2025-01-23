import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { DeleteProduct, getAdminPrd } from "../../action/ProductAction";
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import { FaPencilAlt } from "react-icons/fa";
import { MdDeleteSweep } from "react-icons/md";
import { toast } from "react-toastify";

const AdminProducts = () => {
  const dispatch = useDispatch();

  const { loading, admPrd } = useSelector((state) => state.admProd);
  const { isDeleted, error } = useSelector((state) => state.admProd);

  useEffect(() => {
    if (isDeleted) {
      toast.success(isDeleted);
    }
    if (error) {
      toast.error(error);
    }
    dispatch(getAdminPrd());
  }, [dispatch, toast]);

  const deleteProductHandler = (id) => {
    dispatch(DeleteProduct(id));
  };
  const columns = [
    {
      name: "id",
      selector: (row) => row.id,
      sortable: true,
      style: { fontSize: 20, backgroundColor: "#617fd2" },
    },

    {
      name: "  Category",
      selector: (row) => row.category,
      sortable: true,
      style: { fontSize: 20, backgroundColor: "#617fd2" },
    },
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
      style: { fontSize: 20, backgroundColor: "#617fd2", color: "#fff" },
    },
    {
      name: " Stock",
      selector: (row) => row.Stock,
      sortable: true,
      style: { fontSize: 20, backgroundColor: "#617fd2" },
    },
    {
      name: " Price",
      selector: (row) => row.price,
      sortable: true,
      style: { fontSize: 20, backgroundColor: "#617fd2" },
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
          <Link to={`/admin/products/${params.id}`}>
            <FaPencilAlt />
          </Link>
        );
      },
      style: { backgroundColor: "#78d54c" },
    },
  ];

  const data = [];

  admPrd &&
    admPrd.forEach((prd) => {
      data.push({
        id: prd._id,
        category: prd.category,
        name: prd.name,
        Stock: prd.Stock,
        price: prd.price,
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
      <div>
        <div className="  mt-12 ">
          <h1 className=" flex justify-center text-3xl  underline font-serif mb-5">
            All Products :
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
    </div>
  );
};

export default AdminProducts;
