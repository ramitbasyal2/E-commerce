import React, { useContext } from "react";
import "./CSS/ShopCategory.css";
import { ShopContext } from "../Context/ShopContext";
import dropdowm_icon from "../assets/dropdown_icon.png";
import Item from "../Components/Items/Item";

const ShopCategory = (props) => {
  const { all_products } = useContext(ShopContext);

  return (
    <div className="shop-category">
      <img className="shopcategory-banner" src={props.banner} alt="" />
      <div className="Shopcategory-indexSort">
        <p>
          <span>Showing 1-12</span> out of 36 products
        </p>
        <div className="shopcategory-sort">
          Sort by <img src={dropdowm_icon} alt="" />
        </div>
      </div>
      <div className="shopcategory-products">
        {all_products?.map((item, i) => {
          if (props.category === item.category) {
            return (
              <>
                <Item
                  key={item.id}
                  id={item.id}
                  name={item.name}
                  image={item.image}
                  new_price={item.new_price}
                  old_price={item.old_price}
                />
              </>
            );
          } else {
            return null;
          }})}
      </div>
      <div className="shopcategory-loadmore">
           <p>Show More</p>
      </div>
    </div>
  );
};

export default ShopCategory;
