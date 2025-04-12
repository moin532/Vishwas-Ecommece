import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AddSellerAction } from "../../action/SellerAction";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const GSTRegistrationForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, isSeller } = useSelector((state) => state.seller);

  console.log(isSeller, error);
  useEffect(() => {
    if (isSeller) {
      toast.success("Buisness register SuccsesFully ");
      navigate("/admin");
    }

    if (error) {
      toast.error(error);
    }
  }, [isSeller, toast, error]);
  const [formData, setFormData] = useState({
    buisnessName: "",
    email: "",
    gstnumber: "",
    address: "",
    pincode: "",
    number: "",
    category: "",
    gst: null,
    fssai: null,
    terms: false,
    role: "seller",
    verified: "pending",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData({ ...formData, [name]: files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataObj = new FormData();
    Object.keys(formData).forEach((key) => {
      formDataObj.append(key, formData[key]);
    });

    dispatch(AddSellerAction(formDataObj));
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-2xl bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-700">
          GST Registration Form
        </h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-gray-700 font-medium">
              Business/Firm Name
            </label>
            <input
              type="text"
              name="buisnessName"
              value={formData.buisnessName}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter Business/Firm Name"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium">Email ID</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter Email ID"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium">
              GST number
            </label>
            <input
              type="text"
              name="gstnumber"
              value={formData.gstnumber}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter GST number"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium">
              Business/Shop Address
            </label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter Business/Shop Address"
            ></textarea>
          </div>
          <div>
            <label className="block text-gray-700 font-medium">Pincode</label>
            <input
              type="text"
              name="pincode"
              value={formData.pincode}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter Pincode"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium">number</label>
            <input
              type="text"
              name="number"
              value={formData.number}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enternumber number"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium">
              Choose Category
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Category</option>
              <option value="Retail">Retail</option>
              <option value="Wholesale">Wholesale</option>
              <option value="Manufacturing">Manufacturing</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-700 font-medium">
              Upload GST number
            </label>
            <input
              type="file"
              name="gstFile"
              onChange={handleFileChange}
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium">
              Upload Food Licensing (FSSAI for food products)
            </label>
            <input
              type="file"
              name="fssaiFile"
              onChange={handleFileChange}
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
          </div>
          <div>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="terms"
                checked={formData.terms}
                onChange={handleChange}
                className="w-5 h-5 text-blue-600"
              />
              <span className="text-gray-700">
                I agree to the Terms and Conditions
              </span>
            </label>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default GSTRegistrationForm;
