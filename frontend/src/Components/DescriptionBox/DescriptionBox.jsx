import React from "react";
import "./DescriptionBox.css";

const DescriptionBox = () => {
  return (
    <div className="w-full mt-6 px-2 md:px-6">
      <div className="descriptionbox-navigator">
        <div className="descriptionbox-nav-box">Description</div>
        <div className="descriptionbox-nav-box fade">Reviews (122)</div>
      </div>
      <div className="descriptionbox-description">
        <p>
          E-commerce (Electronic Commerce) is the buying and selling of goods
          and services over the internet. It allows businesses and consumers to
          conduct transactions online using websites, mobile apps, and digital
          payment systems. E-commerce includes activities such as online
          shopping, electronic payments, internet banking, online auctions, and
          digital marketing. Common models are B2C (Business to Consumer), B2B
          (Business to Business), C2C (Consumer to Consumer), and C2B (Consumer
          to Business).
          </p>
         <p> Key advantages of e-commerce are 24/7 availability,
          global reach, lower operating costs, convenience, and faster
          transactions. However, it also faces challenges like security risks,
          privacy issues, dependence on technology, and lack of physical
          inspection of products. Overall, e-commerce has transformed
          traditional business by making trade faster, more efficient, and
          accessible worldwide.
        </p>
      </div>
    </div>
  );
};

export default DescriptionBox;
