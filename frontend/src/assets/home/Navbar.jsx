// import styled from "styled-components";
// import { NavLink } from "react-router-dom";
// import { FiShoppingCart } from "react-icons/fi";
// import { CgMenu, CgCloseR } from "react-icons/cg";
// import { Button } from "../../Button";
// import { useEffect, useState } from "react";
// import { LoadUSer } from "../../action/UserAction";
// import { useSelector, useDispatch } from "react-redux";
// import { getUserOrder } from "../../action/OrderActtion";
// import Cart from "./Cart";

// const Navbar = () => {
//   const [openmenu, setopenmenu] = useState(false);

//   return (
//     <div>
//       <Nav>
//         <div className={openmenu ? "menuIcon active" : "menuIcon"}>
//           <div className="navbar">
//             <ul className="navbar-lists">
//               <li>
//                 <NavLink
//                   to="/"
//                   className="navbar-link home-link"
//                   onClick={() => setopenmenu(false)}
//                 >
//                   Home
//                 </NavLink>
//               </li>
//               <li>
//                 <NavLink
//                   to="/about"
//                   className="navbar-link home-link"
//                   onClick={() => setopenmenu(false)}
//                 >
//                   About
//                 </NavLink>
//               </li>
//               <li>
//                 <NavLink
//                   to="/products"
//                   className="navbar-link "
//                   onClick={() => setopenmenu(false)}
//                 >
//                   Prodoucts
//                 </NavLink>
//               </li>
//               <li>
//                 <NavLink
//                   to="/contact"
//                   className="navbar-link "
//                   onClick={() => setopenmenu(false)}
//                 >
//                   Contact
//                 </NavLink>
//               </li>

//               <li>
//                 <NavLink
//                   className="navbar-link cart-trolley--link"
//                   onClick={() => setopenmenu(false)}
//                 >
//                   <FiShoppingCart
//                     className="cart-trolly"
//                     onClick={handleCartToggle}
//                     color="blue"
//                   />
//                   {/* <span className="cart-total--item"> {order.length} </span> */}
//                 </NavLink>
//               </li>

//               <li>
//                 <NavLink to="/signup" className="navbar-link ">
//                   <button> LOGIN </button>
//                 </NavLink>
//               </li>

//               {user && user[0]?.role === "seller" && (
//                 <li>
//                   <NavLink to="/admin" className="navbar-link ">
//                     <button> ADMIN</button>
//                   </NavLink>
//                 </li>
//               )}
//             </ul>
//             <div className="mobile-navbar-btn">
//               <CgMenu
//                 name="menu-outline"
//                 className="mobile-nav-icon"
//                 onClick={() => setopenmenu(true)}
//               />
//               <CgCloseR
//                 name="close-outline"
//                 className="close-outline mobile-nav-icon"
//                 onClick={() => setopenmenu(false)}
//               />
//             </div>
//           </div>
//         </div>
//       </Nav>

//       {isCartOpen && <Cart onClose={closeCart} />}
//     </div>
//   );
// };

// const Nav = styled.nav`
//   .navbar-lists {
//     display: flex;
//     gap: 4.8rem;
//     align-items: center;
//     list-style: none;
//     justify-content: center;
//     margin-top: 12px;

//     .navbar-link {
//       &:link,
//       &:visited {
//         display: inline-block;
//         text-decoration: none;
//         font-size: 1.8rem;

//         text-transform: uppercase;
//         color: black;
//         transition: color 0.3s linear;
//       }
//       &:hover,
//       &:active {
//         color: "#8490ff";
//       }
//     }
//   }
//   .mobile-navbar-btn {
//     display: none;
//     background-color: transparent;
//     cursor: pointer;
//     border: black;
//   }
//   .mobile-nav-icon[name="close-outline"] {
//     display: none;
//   }
//   .close-outline {
//     display: none;
//   }
//   .cart-trolley--link {
//     position: relative;

//     .cart-trolley {
//       position: relative;
//       font-size: 3.2rem;
//     }
//     .cart-total--item {
// width: 1.4rem;
// height: 2rem;
// position: absolute;
// background-color: #d9eeaf;
// color: #000;
// border-radius: 50%;
// display: grid;
// place-items: center;
// top: -20%;
// left: 70%;
// background-color: "#8490ff";
//     }
//   }
//   .user-login--name {
//     text-transform: capitalize;
//   }
//   .user-logout,
//   .user-login {
//     font-size: 1.4rem;
//     padding: 0.8rem 1.4rem;
//   }

//   @media only screen and (max-width: 768px) {
//     .mobile-navbar-btn {
//       display: inline-block;
//       z-index: 9999;
//       border: black;

//       .mobile-nav-icon {
//         font-size: 4.2rem;
//         color: black;
//       }
//     }

//     .active .mobile-nav-icon {
//       display: none;
//       font-size: 4.2rem;
//       position: absolute;
//       top: 30%;
//       right: 10%;
//       color: black;
//       z-index: 9999;
//     }
//     .active .close-outline {
//       display: inline-block;
//     }
//     .navbar-lists {
//       width: 100vw;
//       height: 100vh;
//       position: absolute;
//       top: 0;
//       left: 0;
//       background-color: #fff;

//       display: flex;
//       justify-content: center;
//       align-items: center;
//       flex-direction: column;

//       visibility: hidden;
//       opacity: 0;
//       transform: translateX(100%);
//       transition: all 1s linear;
//     }
//     .active .navbar-lists {
//       visibility: visible;
//       opacity: 1;
//       transform: translateX(0);
//       z-index: 999;
//       transform-origin: right;
//       transition: all 1s linear;

//       .navbar-link {
//         font-size: 6.2rem;
//       }
//     }
//     .cart-trolley--link {
//       position: relative;

//       .cart-trolley {
//         position: relative;
//         font-size: 5.2rem;
//       }

//       .cart-total--item {
//         width: 4.2rem;
//         height: 4.2rem;
//         font-size: 2rem;
//       }
//     }

//     .user-logout,
//     .user-login {
//       font-size: 2rem;
//       padding: 0.8rem 1.4rem;
//     }
//   }
// `;
// export default Navbar;

import React, { useState, useEffect } from "react";
import { FaShoppingCart, FaUser, FaBars, FaTimes } from "react-icons/fa";

import { NavLink, useNavigate } from "react-router-dom";
import { FiShoppingCart } from "react-icons/fi";
import { CgMenu, CgCloseR } from "react-icons/cg";
import { Button } from "../../Button";

import { LoadUSer } from "../../action/UserAction";
import { useSelector, useDispatch } from "react-redux";
import { getUserOrder } from "../../action/OrderActtion";
import Cart from "./Cart";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const Navigate = useNavigate();

  const { user } = useSelector((state) => state.userE);
  const { order } = useSelector((state) => state.userOrder);

  const [isCartOpen, setIsCartOpen] = useState(false);

  const handleCartToggle = () => {
    setIsCartOpen((prev) => !prev);
  };

  const closeCart = () => {
    setIsCartOpen(false);
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(LoadUSer());
    dispatch(getUserOrder());
  }, [dispatch]);
  return (
    <nav className="bg-white shadow-md fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-bold text-green-600">KrOrganics</h1>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            <a
              href="/"
              className="text-gray-700 hover:text-green-600 transition"
            >
              Home
            </a>
            <a
              href="#"
              className="text-gray-700 hover:text-green-600 transition"
            >
              About
            </a>
            <a
              href="#"
              className="text-gray-700 hover:text-green-600 transition"
            >
              Categories
            </a>
            <a
              href="#"
              className="text-gray-700 hover:text-green-600 transition"
            >
              Contact
            </a>

            {user && user[0]?.role === "seller" && (
              <a
                href="/admin"
                className="text-gray-700 hover:text-green-600 transition"
              >
                Admin
              </a>
            )}
          </div>

          {/* Search */}
          <div className="hidden md:flex items-center ml-6">
            <input
              type="text"
              placeholder="Search products..."
              className="border border-gray-300 rounded-full px-4 py-1 focus:outline-none focus:ring-2 focus:ring-green-300"
            />
          </div>

          {/* Icons */}
          <div className="flex items-center gap-4 ml-4">
            <span className="relative inline-block" onClick={handleCartToggle}>
              <FaShoppingCart className="text-gray-700 hover:text-green-600 text-xl cursor-pointer" />

              {/* Badge for cart length */}
              {order.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-green-600 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
                  {order.length}
                </span>
              )}
            </span>

            <FaUser
              onClick={() => {
                Navigate("/profile");
              }}
              className="text-gray-700 hover:text-green-600 text-xl cursor-pointer"
            />

            {/* Mobile toggle */}
            <div className="md:hidden">
              <button onClick={() => setIsOpen(!isOpen)}>
                {isOpen ? (
                  <FaTimes className="text-2xl text-gray-700" />
                ) : (
                  <FaBars className="text-2xl text-gray-700" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {isCartOpen && <Cart onClose={closeCart} />}

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="flex flex-col px-6 py-4 space-y-2">
            <a href="#" className="text-gray-700 hover:text-green-600">
              Home
            </a>
            <a href="#" className="text-gray-700 hover:text-green-600">
              Shop
            </a>
            <a href="#" className="text-gray-700 hover:text-green-600">
              Categories
            </a>
            <a href="#" className="text-gray-700 hover:text-green-600">
              Contact
            </a>
            <input
              type="text"
              placeholder="Search..."
              className="mt-2 border border-gray-300 rounded px-3 py-1 focus:outline-none"
            />
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
