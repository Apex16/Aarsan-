import { NavLink } from "react-router-dom";
import momoLogo from "../assets/momoLogo.png";
import { GiShoppingCart } from "react-icons/gi";
import { FaFacebook } from "react-icons/fa";
import { FaTiktok } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { useContext } from "react";
import { CartContext } from "../Context/CartContext/CartProvider";
import { useAuth0 } from "@auth0/auth0-react";
import { FaRegUserCircle } from "react-icons/fa";

function Navigation() {
  const { user, logout, isAuthenticated } = useAuth0();
  const { state } = useContext(CartContext);
  // console.log(state.cartItems)
  const totalCartItem = state.cartItems.reduce((acc, item) => {
    return acc + item.qty;
  }, 0);

  //console.log(totalCartItem)

  return (
    <div className="  flex  justify-around  ">
      <NavLink to="/" className=" flex  justify-center items-center gap-2  ">
        <img className="h-10" src={momoLogo} alt="" />
        <span className="text-green-800 font-bold  "> Momos</span>
      </NavLink>

      <div className="  flex justify-center items-center gap-x-5  ">
        <NavLink to="/about">About</NavLink>

        <NavLink to="/menu">Menu</NavLink>
        <NavLink to="/services">Services</NavLink>
        <NavLink to="/allergyAdvised">AllergyAdvised</NavLink>
        <NavLink to="/cartPage">
          <span>{totalCartItem}</span>
          <GiShoppingCart size={30} color="red" />
        </NavLink>
      </div>
      <div className="  flex  justify-center items-center gap-4   ">
        <NavLink to="https://www.facebook.com/ " target="_blank">
          <FaFacebook />
        </NavLink>

        <NavLink to="https://www.tiktok.com/" target="_blank">
          <FaTiktok />
        </NavLink>

        <NavLink to="https://www.instagram.com/" target="_blank">
          <FaInstagram />
        </NavLink>

        <NavLink
          className="bg-orange-500  text-white px-5 p-2 rounded-3xl m-1"
          to="/contact"
        >
          Contact
        </NavLink>

        {isAuthenticated ? (
          <NavLink to="/profile">
            <img className="rounded-full h-10 " src={user.picture} alt="" />
          </NavLink>
        ) : (
          <FaRegUserCircle size={30} color="green" />
        )}

        {isAuthenticated ? (
          <button
            onClick={() => {
              logout();
            }}
            className=" bg-orange-500 p-2  text-white rounded-2xl "
          >
            Logout
          </button>
        ) : (
          <NavLink to="/login">Login</NavLink>
        )}
      </div>
    </div>
  );
}

export default Navigation;
