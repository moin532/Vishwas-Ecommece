import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, createProducts } from "../action/ProductAction";
import { useNavigate } from "react-router-dom";
import { NEW_PRODUCT_RESET } from "../constant/ProductContanat";
import { toast } from "react-toastify";

const ImageUpload = () => {
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const { product, loading, error, success } = useSelector(
    (state) => state.newPrd
  );

  const [name, setName] = useState("");
  const [price, setprice] = useState("");
  const [description, setdescription] = useState("");
  const [stock, setstock] = useState("");
  const [kg, setKg] = useState("1");
  const [category, setcategory] = useState("");
  const [image, setimage] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);
  const [selectedNumbers, setSelectedNumbers] = useState([]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
      dispatch({ type: NEW_PRODUCT_RESET });
    }

    if (success) {
      toast.success("Product Created Successfully");
      Navigate("/admin");
      dispatch({ type: NEW_PRODUCT_RESET });
    }
  }, [dispatch, alert, error, Navigate, success]);

  const Categories = [
    "Kr Organics",
    "Organic Beauty",
    "Organic MAsalas",
    "Organic Products",
    "Beauty Products",
    "HomeMade Masalas",
    "Grocery",
    "PoojaStores",
    "Fashion",
    "Toys And Plays",
    "Home Made Snakcs",
    "Stationary and craft",
    "Vegetabls and fruits",
    "Bevarages",
    "Spices",
    "Dry Fruits",
  ];

  const HandleImage = (e) => {
    e.preventDefault();

    const files = Array.from(e.target.files);
    setImagesPreview((prevImages) => [...prevImages, ...files]);

    setimage([]);
    setImagesPreview([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((old) => [...old, reader.result]);
          setimage((old) => [...old, reader.result]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleCheckboxChange = (event) => {
    const value = parseInt(event.target.value, 10);
    if (event.target.checked) {
      setSelectedNumbers((prev) => [...prev, value]);
    } else {
      setSelectedNumbers((prev) => prev.filter((number) => number !== value));
    }
  };

  const HandleSubmit = (e) => {
    e.preventDefault();

    const formdata = new FormData();
    formdata.set("name", name);
    formdata.set("price", price);
    formdata.set("description", description);
    formdata.set("stock", stock);
    formdata.set("category", category);
    formdata.set("size", kg);

    image.forEach((img) => {
      formdata.append("images", img);
    });
    dispatch(createProducts(formdata));
  };

  return (
    <div>
      <form
        onSubmit={HandleSubmit}
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
            htmlFor="description"
          >
            Per Price Kilogram
          </label>
          <input
            name="description"
            id="description"
            value={kg}
            onChange={(e) => setKg(e.target.value)}
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
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="images"
          >
            Image
          </label>
          <input
            type="file"
            name="image1"
            multiple
            accept="image/*"
            onChange={HandleImage}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          {imagesPreview.map((image, index) => (
            <img
              key={index}
              src={image}
              alt="Product Preview"
              className="w-full h-auto rounded"
            />
          ))}
        </div>
        <button
          // disabled={loading ? true : false}
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          {loading ? "loading ...🏃" : "submit"}
        </button>
      </form>
    </div>
  );
};

export default ImageUpload;
