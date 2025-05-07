import { useState } from "react";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";

function Menu() {
  const [product, setProduct] = useState([]);
  const getData = async () => {
    let response = await fetch("https://dummyjson.com/recipes");
    response = await response.json();
    console.log(response.recipes);
    setProduct(response.recipes);
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <div>
      {product.length > 0 ? (
        <div
          className=" flex  flex-wrap justify-center 
         gap-5  px-20 py-5  "
        >
          {product.map((item) => {
            return (
              <NavLink  className='' 
               key={item.name} to={`/productDescription/${item.id}`}>
                <div
                  className="  flex  justify-center  items-center flex-col 
                 shadow-gray-800 shadow-2xl rounded-2xl p-1    h-48 w-48 "
                >
                  <img className="h-24  rounded-2xl" src={item.image} alt="" />
                  <h1>{item.name}</h1>
                  <h1>Rs.{item.caloriesPerServing}</h1>
                </div>
              </NavLink>
            );
          })}
        </div>
      ) : (
        <div> loading... </div>
      )}
    </div>
  );
}

export default Menu;
