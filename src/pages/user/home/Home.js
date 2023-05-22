import React, { useState } from "react";
import classNames from "classnames/bind";
import styles from "./Home.module.scss";
import getIntro, { introList } from "./config";
import { useNavigate } from "react-router-dom";
import owner from "./photo/Green Aesthetic Photo Frame Instagram Post.png";
import Button from "../../../components/DefaultLayouts/Button/Button";

const cx = classNames.bind(styles);
const Home = () => {
  const [inputValue, setInputValue] = useState("");
  const navigate = useNavigate();
  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const handlePress = (e) => {
    if (e.key === "Enter") {
      navigate(`/products?name=${inputValue}`);
    }
  };

  return (
    <div className={cx("wrapper")}>
      {/* Banner of the Page */}
      <div className={cx("bg-banner")}>
        <div className={cx("banner-title")}>
          <div className={cx("banner-name")}>Perfume for the Perfection</div>
          <div className={cx("banner-line")}>Much More Than Perfume</div>
          <div className={cx("banner-line-small")}>
            {" "}
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula,
            eget lacinia odio sem nec elit.{" "}
          </div>
          <div className={cx("banner-btn")}>
            <Button
              className={cx("banner-shop")}
              onClick={() => navigate("/products")}
            >
              {" "}
              Buy Now
            </Button>
            <Button
              className={cx("banner-shop")}
              onClick={() => navigate("/stores")}
            >
              {" "}
              See More
            </Button>
          </div>
        </div>
        <div className={cx("banner-img")}>
          <img
            className={cx("img-leaf")}
            src="https://demo.darrelwilson.com/olivia/wp-content/uploads/sites/93/2022/07/leave-2U8ZUJ.png"
            alt=""
          />
        </div>
      </div>

      {/* Quotes of the Page */}

      <div className={cx("body-quotes")}>
        <div className={cx("body-page")}>
          <div className={cx("body-img")}>
            <img
              src="https://demo.darrelwilson.com/olivia/wp-content/uploads/sites/93/2022/07/23-ESJ32AL-1024x1024.png"
              className={cx("img-flower")}
              alt=""
            />
          </div>
          <div className={cx("body-text-bg")}>
            <div className={cx("body-text")}>
              <div className={cx("body-name")}>About Our Store</div>
              <div className={cx("body-line")}> Welcome to Me</div>
              <div className={cx("body-small-line")}>
                {" "}
                Duis mollis, est non commodo luctus, nisi erat porttitor ligula,
                eget lacinia odio sem nec elit. Duis mollis, est non commodo
                luctus, nisi erat porttitor ligula, eget lacinia odio sem nec
                elit. Duis mollis, est non commodo luctus, nisi erat porttitor
                ligula, eget lacinia odio sem nec elit. Duis mollis, est non
                commodo luctus, nisi erat porttitor ligula, eget lacinia odio
                sem nec elit. Duis mollis, est non commodo luctus, nisi erat
                porttitor ligula, eget lacinia odio sem nec elit.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className={cx("search")}>
        <div className={cx("search-bar")}>
          <div className={cx("search-txt")}>Looking for...</div>
          <div className={cx("search-name")}>
            <input
              className={cx("search-input")}
              placeholder="Enter the name"
              onKeyPress={handlePress}
              onChange={handleChange}
              value={inputValue}
            />
          </div>
        </div>
      </div>

      {/* Advantage */}
      <div className={cx("intro")}>
        {introList.map((item, index) =>
          getIntro(item.img, item.p, item.background, index)
        )}
      </div>

      {/* Link to Page */}
      <div>
        <div className={cx("link-page")}>
          <div className={cx("link-img")}>
            <img
              src="https://demo.darrelwilson.com/olivia/wp-content/uploads/sites/93/2022/07/S8KH8AE.jpg"
              alt=""
              className={cx("perfume-img")}
            ></img>
          </div>
          <div className={cx("link-title")}>
            <div className={cx("link-name")}>Men Perfume</div>
            <div className={cx("link-line")}>What Makes A Man Charming</div>
            <div className={cx("link-line-small")}>
              {" "}
              Duis mollis, est non commodo luctus, nisi erat porttitor ligula,
              eget lacinia odio sem nec elit.{" "}
            </div>
            <div className={cx("link-btn")}>
              <Button
                className={cx("link-shop")}
                onClick={() => navigate("/products?type=men")}
              >
                {" "}
                Buy Now
              </Button>
            </div>
          </div>
        </div>

        <div className={cx("link-pagex")}>
          <div className={cx("link-titlex")}>
            <div className={cx("link-name")}>Women Perfume</div>
            <div className={cx("link-line")}>What Makes A Woman Beatiful</div>
            <div className={cx("link-line-small")}>
              {" "}
              Duis mollis, est non commodo luctus, nisi erat porttitor ligula,
              eget lacinia odio sem nec elit.{" "}
            </div>
            <div className={cx("link-btn")}>
              <Button
                className={cx("link-shop")}
                onClick={() => navigate("/products?type=women")}
              >
                {" "}
                Buy Now
              </Button>
            </div>
          </div>
          <div className={cx("link-imgx")}>
            <img
              src="https://demo.darrelwilson.com/olivia/wp-content/uploads/sites/93/2022/07/perfume-mockup-01.jpg"
              alt=""
              className={cx("perfume-imgx")}
            ></img>
          </div>
        </div>
      </div>

      {/* Trending */}
      <div className={cx("trend-container")}>
        <div className={cx("trend-bg-one")}>
          <div className={cx("trend-img")}>
            <img
              src="https://demo.darrelwilson.com/olivia/wp-content/uploads/sites/93/2022/07/25-ESJ32AL.png"
              alt=""
              className={cx("trend-img-x")}
            ></img>
          </div>
          <div className={cx("trend-title")}> Get Discount</div>
          <div className={cx("trend-txt")}>
            {" "}
            Subscribe To Get 50% OFF Storewide
          </div>
          <div className={cx("trend-prod")}>
            <input
              type="text"
              className={cx("trend-input")}
              placeholder="Email"
            ></input>
            <Button className={cx("trend-btn")}>Subscribe</Button>
          </div>
        </div>
        <div className={cx("trend-border")}>
          <div className={cx("trend-bg-two")}>
            <div className={cx("trend-txt-x")}>
              <div className={cx("trend-txt-one")}>End year sale</div>
              <div className={cx("trend-txt-two")}>All Item 40% Off</div>
            </div>
            <div className={cx("trend-img")}>
              <img
                src="https://demo.darrelwilson.com/olivia/wp-content/uploads/sites/93/2022/07/DM3N9SP-1536x1024.png"
                alt=""
                className={cx("trend-border-img")}
              />
            </div>
            <div className={cx("trend-txt-y")}>
              <div className={cx("trend-txt-one")}>Buy now</div>
              <div className={cx("trend-txt-two")}>
                Limited Offer Ends Tonight
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Dash */}
      <div className={cx("mainbanner-line")}>
        <div className={cx("dash", "left")}></div>
        <img
          src="https://demo.darrelwilson.com/olivia/wp-content/uploads/sites/93/2022/07/11-ESJ32AL-1536x1536.png"
          className={cx("star")}
          alt=""
        ></img>
        <div className={cx("dash", "right")}></div>
      </div>

      {/* Founder */}

      <div className={cx("founder-con")}>
        <div className={cx("founder-bg-img")}>
          <img src={owner} className={cx("founder-bg-pic")} alt="" />
        </div>
        <div className={cx("founder-info")}>
          <div className={cx("founder-word")}>Words from our founder</div>
          <div className={cx("founder-name")}>Huong Nguyen</div>
          <div className={cx("founder-txt")}>
            <div className={cx("founder-txt-left")}>
              <div>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit
                tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.
              </div>
              <br></br>
              <div>
                Maecenas faucibus mollis interdum. Morbi leo risus, porta ac
                consectetur ac, vestibulum at eros. Cras mattis consectetur
                purus sit amet fermentum. Nulla vitae elit libero.
              </div>
            </div>
            <div className={cx("founder-txt-right")}>
              Aenean lacinia bibendum nulla sed consectetur. Cras mattis
              consectetur purus sit amet fermentum. Fusce dapibus, tellus ac
              cursus commodo, tortor mauris condimentum nibh, ut fermentum massa
              justo sit amet risus. Nulla vitae elit libero, a pharetra augue.
              Lorem Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </div>
          </div>
          <div className={cx("founder-txt-sign")}>
            <img
              src="https://demo.darrelwilson.com/olivia/wp-content/uploads/sites/93/2022/07/Antonin-Scalia-Signature-2016021501.png"
              className={cx("founder-txt-sign-pic")}
              alt=""
            />
          </div>
          <div className={cx("founder-txt-name")}>
            {" "}
            Huong Nguyen, Owner Of Olivia & Co{" "}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
