import { useContext } from "react";
import { CartContext } from "../Context/CartContext/CartProvider";
import { MdDelete } from "react-icons/md";
import { NavLink, useNavigate } from "react-router-dom";

function CartPage() {
  const navigate = useNavigate();
  const { state, dispatch } = useContext(CartContext);
  console.log(state);
  const totalAmount = state.cartItems.reduce((acc, item) => {
    return acc + item.qty * item.caloriesPerServing;
  }, 0);

  const totalItem = state.cartItems.reduce((acc, item) => {
    return acc + item.qty;
  }, 0);
  return (
    <div>
      <div>
        {state.cartItems.length > 0 ? (
          <div className="  mt-10 flex">
            <div className="w-[900px]">
              {state.cartItems.map((item) => {
                return (
                  <div key={item.id}>
                    <div className="  shadow-2xl  shadow-gray-800 rounded-3xl  flex  justify-around  m-5 items-center h-40 ">
                      <div className=" ">
                        <img
                          className="h-20  rounded-2xl "
                          src={item.image}
                          alt=""
                        />
                      </div>
                      <div className="  h-14 w-64 ">
                        <h1>{item.name}</h1>
                      </div>
                      <div className=" h-14 w-20 ">
                        <h1 className="text-red-400 font-bold">
                          Rs.{item.caloriesPerServing}
                        </h1>

                        <button
                          onClick={() => {
                            dispatch({
                              type: "RemoveItem",
                              payload: { id: item.id },
                            });
                          }}
                        >
                          <MdDelete color="red" size={30} />
                        </button>
                      </div>

                      <div className=" h-14 space-x-4 ">
                        <button
                          onClick={() => {
                            dispatch({
                              type: "Decrement",
                              payload: { id: item.id },
                            });
                          }}
                          className="bg-slate-300 rounded-sm px-2"
                        >
                          -
                        </button>
                        <span>{item.qty}</span>
                        <button
                          onClick={() => {
                            dispatch({
                              type: "Increment",
                              payload: { id: item.id },
                            });
                          }}
                          className="bg-slate-300 rounded-sm px-2"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className=" gap-y-3 mt-16  w-80 shadow-2xl shadow-gray-500 h-56 rounded-3xl flex flex-col  justify-center  items-center  ">
              <h1 className="text-2xl">Order Summary</h1>
              <h1>Total Rs. {totalAmount} </h1>
              <button
                onClick={() => {
                  navigate("/payment",{state:{totalAmount:totalAmount,totalItem:totalItem}});
                }}
                className="bg-orange-600 p-3 text-white"
              >
                Procced to CheckOut ({totalItem})
              </button>

              <button
                onClick={() => {
                  dispatch({ type: "ClearCart" });
                }}
                className="bg-orange-600 p-3 mb-3 text-white"
              >
                Clear Cart
              </button>
            </div>
          </div>
        ) : (
          <div className="  w-96  h-60  flex  justify-center items-center   flex-col m-auto  mt-16  ">
            <img
              className="h-60"
              src="https://cdni.iconscout.com/illustration/premium/thumb/empty-cart-illustration-download-in-svg-png-gif-file-formats--wishlist-bucket-shopping-state-pack-design-development-illustrations-1800917.png?f=webp"
              alt=""
            />
            <p className="font-mono">
              Item Not Found On Cart
              <NavLink
                to="/menu"
                className="underline text-xl font-bold text-red-500"
              >
                Shop Now
              </NavLink>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default CartPage;
