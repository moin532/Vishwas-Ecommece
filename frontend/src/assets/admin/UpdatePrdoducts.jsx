import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { DetailsPrd, UpdateProduct } from "../../action/ProductAction";
import { toast } from "react-toastify";
import { UPDATE_PRODUCT_RESET } from "../../constant/ProductContanat";

const UpdatePrdoducts = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const Navigate = useNavigate();

  const { loading, isUpd } = useSelector((state) => state.admProd);
  const { product } = useSelector((state) => state.prdDetails);

  const [name, setName] = useState("");
  const [price, setprice] = useState("");
  const [description, setdescription] = useState("");
  const [stock, setstock] = useState("");
  const [category, setcategory] = useState("");
  const Categories = [
    "Men",
    "Women",
    "children",
    "Sneakers",
    "Kitchen",
    "Home Decors",
  ];

  let productId = id;
  useEffect(() => {
    dispatch(DetailsPrd(id));

    setName(product.name);
    setdescription(product.description);
    setprice(product.price);
    setcategory(product.category);
    setstock(product.Stock);

    if (isUpd) {
      toast.success("Product Updated Successfully");
      Navigate("/admin/products");
      dispatch({ type: UPDATE_PRODUCT_RESET });
    }
  }, [dispatch, isUpd, toast, Navigate]);

  const HandleSubmit = (e) => {
    e.preventDefault();

    const formdata = new FormData();
    formdata.set("name", name);
    formdata.set("price", price);
    formdata.set("description", description);
    formdata.set("stock", stock);
    formdata.set("category", category);

    dispatch(UpdateProduct(id, formdata));
  };
  return (
    <div>
      <div>
        <form
          onSubmit={HandleSubmit}
          A
          className="max-w-lg mx-auto p-4  mt-14 bg-white shadow-md rounded-lg"
        >
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="name"
            >
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>{" "}
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="price"
            >
              Price
            </label>
            <input
              type="text"
              name="price"
              id="price"
              value={price}
              onChange={(e) => {
                setprice(e.target.value);
              }}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="description"
            >
              Description
            </label>
            <textarea
              name="description"
              id="description"
              value={description}
              onChange={(e) => setdescription(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="category"
            >
              Category
            </label>

            <div className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
              <select onChange={(e) => setcategory(e.target.value)}>
                <option value="">Choose Category</option>
                {Categories.map((cate) => (
                  <option key={cate} value={cate}>
                    {cate}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="stock"
            >
              Stock
            </label>
            <input
              type="text"
              name="stock"
              id="stock"
              value={stock}
              onChange={(e) => setstock(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <button
            disabled={loading ? true : false}
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdatePrdoducts;
