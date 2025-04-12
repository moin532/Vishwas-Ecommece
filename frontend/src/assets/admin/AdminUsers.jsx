import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AllAdminUsers } from "../../action/UserAction";
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import { FaPencilAlt } from "react-icons/fa";
import { MdDeleteSweep } from "react-icons/md";
const AdminUsers = () => {
  const dispatch = useDispatch();
  const { users, error, loading } = useSelector((state) => state.admUsers);

  useEffect(() => {
    // dispatch(AllAdminUsers())
  }, [dispatch]);

  const columns = [
    {
      name: "id",
      selector: (row) => row.id,
      sortable: true,
      style: { fontSize: 20, backgroundColor: "#617fd2" },
    },

    {
      name: "Name",
      selector: (row) => row.Name,
      sortable: true,
      style: { fontSize: 20, backgroundColor: "#617fd2" },
    },
    {
      name: "Email",
      selector: (row) => row.Email,
      sortable: true,
      style: { fontSize: 20, backgroundColor: "#617fd2", color: "#fff" },
    },
    {
      name: "Number",
      selector: (row) => row.Number,
      sortable: true,
      style: { fontSize: 20, backgroundColor: "#617fd2", color: "#fff" },
    },
    {
      name: "Role",
      selector: (row) => row.Role,
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

    //     {
    //       name: "visit",
    //       selector: "visit.length",
    //       maxWidth: "100px",
    //       sortable: true,
    //       cell: (params) => {
    //         return (

    //             <Link to={`/admin/order/${params.id}`}>
    //               <FaPencilAlt />
    //             </Link>

    //         );
    //       },
    //       style: { backgroundColor: "#78d54c" },
    //     },
  ];

  const data = [];

  users &&
    users.forEach((prd) => {
      data.push({
        id: prd._id,
        Name: prd.name,
        Role: prd.role,
        Email: prd.email,
        Number: prd.number,
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
            All Login Users :
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

export default AdminUsers;
