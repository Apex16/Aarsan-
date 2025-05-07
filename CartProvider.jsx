import { createContext, useReducer } from "react";
import { Bounce, toast } from "react-toastify";
export const CartContext = createContext();
let initialState = {
  cartItems: [],
};
let cartReducer = (state, action) => {
  switch (action.type) {
    case "AddToCart": {
      const isExisting = state.cartItems.find((item) => {
        return item.id === action.payload.id;
      });
      if (isExisting) {
        return state;
      } else {
        const newProduct = { ...action.payload, qty: 1 };
        let newCartItem = [...state.cartItems, newProduct];
        toast.success(`${action.payload.name}  is added to cart`, {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });

        return {
          ...state,
          cartItems: newCartItem,
        };
      }
    }

    case "RemoveItem": {
      const filterCartItem = state.cartItems.filter((item) => {
        return item.id !== action.payload.id;
      });

      return {
        ...state,
        cartItems: filterCartItem,
      };
    }

    case "Increment": {
      const newCartItem = state.cartItems.map((item) => {
        return item.id === action.payload.id
          ? { ...item, qty: item.qty + 1 }
          : item;
      });
      return {
        cartItems: newCartItem,
      };
    }

    case "Decrement": {
      const newCartItem = state.cartItems.map((item) => {
        return item.id === action.payload.id && item.qty > 1
          ? { ...item, qty: item.qty - 1 }
          : item;
      });
      return {
        cartItems: newCartItem,
      };
    }
    case "ClearCart": {
      return {
        cartItems: [],
      };
    }
    default: {
      return state;
    }
  }
};
// eslint-disable-next-line react/prop-types
export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};
