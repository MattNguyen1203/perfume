import React from "react";
import "./Mask.css";
// import { CaretRightOutlined } from "@ant-design/icons";

const Mask = () => {
  return (
    <div className="mask-one">
      <div className="mask-con">
        {/* <div className="mask-demo"></div> */}
        <div className="mask-txt-img">
          <video
            src="https://demo.darrelwilson.com/olivia/wp-content/uploads/sites/93/2023/04/female-hands-unpacking-gift-box-and-taking-perfume-ART2PM2.m4v"
            alt=""
            className="mask-img"
            loop
            muted
            autoPlay
          />
        </div>
      </div>
      {/* <div className="mask-txt">TIMELESS FRAGRANCE FOR TODAY'S TRENDS</div> */}
    </div>
  );
};

export default Mask;
