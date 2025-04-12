import { Fragment, useEffect } from "react";
import { CgMouse } from "react-icons/cg";
import styled from "styled-components";
import { Button } from "../../Button";
import FtrProduct from "./FtrProduct";
import { useDispatch, useSelector } from "react-redux";
import { getAllprd } from "../../action/ProductAction";
import Loader from "../../../Loader";
import { useState } from "react";
import CategorySlider from "./Category";

const Home = () => {
  const dispatch = useDispatch();
  const { error, products, loading } = useSelector((state) => state.products);

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  // console.log(products, error);

  // const FileteredSearch = products?.filter((elem) => {
  //   return (
  //     elem.name.toLowerCase().includes(search.toLowerCase()) ||
  //     elem.category.toLowerCase().includes(search.toLowerCase())
  //   );
  // });
  const FileteredSearch = products?.filter((product) => {
    const matchesCategory = selectedCategory
      ? product.category.toLowerCase().includes(selectedCategory.toLowerCase())
      : true;

    const matchesSearch = search
      ? product.name.toLowerCase().includes(search.toLowerCase()) ||
        product.category.toLowerCase().includes(search.toLowerCase())
      : true;

    return matchesCategory && matchesSearch;
  });

  useEffect(() => {
    dispatch(getAllprd());
  }, [dispatch]);

  const getCategories = (category) => {
    setSelectedCategory(category);
  };
  return (
    <Wrapper>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="banner"></div>

          <h2 className="homeHeading"> Feauterd Product </h2>
          <div className="flex justify-center items-center my-4">
            <div className="relative w-1/2">
              {" "}
              {/* Adjust the width here */}
              <input
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
                type="text"
                placeholder="Search..."
                className="w-full h-12 pl-10 pr-4 border  font-serif text-mxl   border-gray-400 rounded-full
                 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:bg-gray-50 transition duration-200"
              />
              <svg
                className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 4a6 6 0 100 12 6 6 0 000-12zm6 6h1.5M18 18l-4.5-4.5"
                />
              </svg>
            </div>
          </div>

          <CategorySlider getCategories={getCategories} />
          {/* <Loader/> */}
          <div className="container1" id="container">
            {FileteredSearch ? (
              FileteredSearch.map((elem, ind) => {
                return <FtrProduct elem={elem} key={ind} />;
              })
            ) : (
              <div>
                <h2 className="text-2xl font-bold mb-4 text-center text-black">
                  No Products Found
                </h2>
              </div>
            )}
          </div>
        </Fragment>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .banner {
    background-image: url("https://images.unsplash.com/photo-1539185441755-769473a23570?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D");
    height: 100vmin;
    display: flex;
    text-align: center;
    align-items: center;
    justify-content: center;
    color: #efffff;
    flex-direction: column;
    background-color: "";
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    /* animation: slideAnimation 23s step-end infinite; */
    scroll-behavior: smooth;
  }

  @keyframes slideAnimation {
    0%,
    100% {
      transform: translateX(0);
      background-image: url("https://images.unsplash.com/photo-1539185441755-769473a23570?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D");
    }
    20% {
      transform: translateX(0);
      background-image: url("https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?q=80&w=1925&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D");
    }
    45% {
      transform: translateX(0%);
      background-image: url("https://media.istockphoto.com/id/1419091037/photo/white-sneaker-with-a-diversity-of-colors-shoe-on-a-white-gradient-background-yellow-pink-blue.webp?s=170667a&w=0&k=20&c=O1a46kfIBlIA66g0n6Nc3B3Xcf7Bu2fmiFc4I1D3OxU=");
    }
    70% {
      transform: translateX(0%);
      background-image: url("https://images.unsplash.com/photo-1562273138-f46be4ebdf33?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D");
    }

    83% {
      background-image: url("/images/sneaaker4.jpg");
      transform: translateX(0%);
    }
  }
  .banner,
  h1 {
    margin: 2vmax;
    font: 600 2.5vmax;
    background-color: #f6f8fa;
  }

  .banner > p {
    font: 300 1.4vmax;
    background-color: #f6f8fa;
  }

  .banner > a > Button {
    margin-bottom: 5vmax;
    cursor: pointer;
    padding: 1vmax;
    transition: all 0.5s;
    width: 9vmax;
    font: 500 1vmax;
  }
  .homeHeading {
    text-align: center;
    font-size: 3vmax;
    border-bottom: 1px solid rgba(21, 21, 21, 0.5);
    width: 30vmax;
    padding: 1vmax;
    margin: 5vmax auto;
    font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
      "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
  }
  .container {
    max-width: 120rem;
    margin: 0 auto;
  }
  .container1 {
    display: flex;
    margin: 1vmax auto;
    width: 90vw;
    flex-wrap: wrap;
    justify-content: center;
    max-width: 100%;
  }

  @media screen and (max-width: 600px) {
    .banner {
      margin: 0px;
      margin-top: 10px;
    }

    .banner,
    h1 {
      margin: 0px;
      font-size: 43px;
    }

    .banner,
    p {
      font-size: 20px;
      color: black;
      margin-bottom: 12px;
    }

    .banner > a > Button {
      width: 80px;
      font-size: 15px;
      margin-top: 15px;
    }
  }
`;

export default Home;
