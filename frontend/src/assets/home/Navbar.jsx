import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { FiShoppingCart } from "react-icons/fi";
import { CgMenu, CgCloseR } from "react-icons/cg";
import { Button } from "../../Button";
import { useEffect, useState } from "react";
import { LoadUSer } from "../../action/UserAction";
import { useSelector, useDispatch } from "react-redux";
import { getUserOrder } from "../../action/OrderActtion";
import Cart from "./Cart";

const Navbar = () => {
  const [openmenu, setopenmenu] = useState(false);
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
    <div>
      <Nav>
        <div className={openmenu ? "menuIcon active" : "menuIcon"}>
          <div className="navbar">
            <ul className="navbar-lists">
              <li>
                <NavLink
                  to="/"
                  className="navbar-link home-link"
                  onClick={() => setopenmenu(false)}
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/about"
                  className="navbar-link home-link"
                  onClick={() => setopenmenu(false)}
                >
                  About
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/products"
                  className="navbar-link "
                  onClick={() => setopenmenu(false)}
                >
                  Prodoucts
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/contact"
                  className="navbar-link "
                  onClick={() => setopenmenu(false)}
                >
                  Contact
                </NavLink>
              </li>

              <li>
                <NavLink
                  className="navbar-link cart-trolley--link"
                  onClick={() => setopenmenu(false)}
                >
                  <FiShoppingCart
                    className="cart-trolly"
                    onClick={handleCartToggle}
                    color="blue"
                  />
                  {/* <span className="cart-total--item"> {order.length} </span> */}
                </NavLink>
              </li>

              <li>
                <NavLink to="/signup" className="navbar-link ">
                  <button> LOGIN </button>
                </NavLink>
              </li>

              {user?.role === "user" && (
                <li>
                  <NavLink to="/admin" className="navbar-link ">
                    <button> ADMIN</button>
                  </NavLink>
                </li>
              )}
            </ul>
            <div className="mobile-navbar-btn">
              <CgMenu
                name="menu-outline"
                className="mobile-nav-icon"
                onClick={() => setopenmenu(true)}
              />
              <CgCloseR
                name="close-outline"
                className="close-outline mobile-nav-icon"
                onClick={() => setopenmenu(false)}
              />
            </div>
          </div>
        </div>
      </Nav>

      {isCartOpen && <Cart onClose={closeCart} />}
    </div>
  );
};

const Nav = styled.nav`
  .navbar-lists {
    display: flex;
    gap: 4.8rem;
    align-items: center;
    list-style: none;
    justify-content: center;
    margin-top: 12px;

    .navbar-link {
      &:link,
      &:visited {
        display: inline-block;
        text-decoration: none;
        font-size: 1.8rem;

        text-transform: uppercase;
        color: black;
        transition: color 0.3s linear;
      }
      &:hover,
      &:active {
        color: "#8490ff";
      }
    }
  }
  .mobile-navbar-btn {
    display: none;
    background-color: transparent;
    cursor: pointer;
    border: black;
  }
  .mobile-nav-icon[name="close-outline"] {
    display: none;
  }
  .close-outline {
    display: none;
  }
  .cart-trolley--link {
    position: relative;

    .cart-trolley {
      position: relative;
      font-size: 3.2rem;
    }
    .cart-total--item {
      width: 1.4rem;
      height: 2rem;
      position: absolute;
      background-color: #d9eeaf;
      color: #000;
      border-radius: 50%;
      display: grid;
      place-items: center;
      top: -20%;
      left: 70%;
      background-color: "#8490ff";
    }
  }
  .user-login--name {
    text-transform: capitalize;
  }
  .user-logout,
  .user-login {
    font-size: 1.4rem;
    padding: 0.8rem 1.4rem;
  }

  @media only screen and (max-width: 768px) {
    .mobile-navbar-btn {
      display: inline-block;
      z-index: 9999;
      border: black;

      .mobile-nav-icon {
        font-size: 4.2rem;
        color: black;
      }
    }

    .active .mobile-nav-icon {
      display: none;
      font-size: 4.2rem;
      position: absolute;
      top: 30%;
      right: 10%;
      color: black;
      z-index: 9999;
    }
    .active .close-outline {
      display: inline-block;
    }
    .navbar-lists {
      width: 100vw;
      height: 100vh;
      position: absolute;
      top: 0;
      left: 0;
      background-color: #fff;

      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;

      visibility: hidden;
      opacity: 0;
      transform: translateX(100%);
      transition: all 1s linear;
    }
    .active .navbar-lists {
      visibility: visible;
      opacity: 1;
      transform: translateX(0);
      z-index: 999;
      transform-origin: right;
      transition: all 1s linear;

      .navbar-link {
        font-size: 6.2rem;
      }
    }
    .cart-trolley--link {
      position: relative;

      .cart-trolley {
        position: relative;
        font-size: 5.2rem;
      }

      .cart-total--item {
        width: 4.2rem;
        height: 4.2rem;
        font-size: 2rem;
      }
    }

    .user-logout,
    .user-login {
      font-size: 2rem;
      padding: 0.8rem 1.4rem;
    }
  }
`;
export default Navbar;
