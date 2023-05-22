import classNames from "classnames/bind";
import styles from "./Home.module.scss";
const cx = classNames.bind(styles);

export const introList = [
  {
    img: "https://demo.darrelwilson.com/olivia/wp-content/uploads/sites/93/2022/07/5-ESJ32AL.png",
    p: "Money Back Guarantee",
    background:
      "https://demo.darrelwilson.com/olivia/wp-content/uploads/sites/93/2022/07/shape8-TJ3H4MU.png",
  },
  {
    img: "https://demo.darrelwilson.com/olivia/wp-content/uploads/sites/93/2022/07/2-ESJ32AL.png",
    p: "Fast Delivery",
    background:
      "https://demo.darrelwilson.com/olivia/wp-content/uploads/sites/93/2022/07/shape27-TJ3H4MU.png",
  },
  {
    img: "https://demo.darrelwilson.com/olivia/wp-content/uploads/sites/93/2022/07/11-ESJ32AL.png",
    p: "Gift-Wrapped Packaging",
    background:
      "https://demo.darrelwilson.com/olivia/wp-content/uploads/sites/93/2022/07/shape10-TJ3H4MU.png",
  },
  {
    img: "https://demo.darrelwilson.com/olivia/wp-content/uploads/sites/93/2022/07/24-ESJ32AL.png",
    p: "Free Ship Worldwide",
    background:
      "https://demo.darrelwilson.com/olivia/wp-content/uploads/sites/93/2022/07/shape17-TJ3H4MU.png",
  },
];

function getIntro(img, p, background, index) {
  return (
    <div className={cx("intro-layout")} key={index}>
      <div
        className={cx("intro-left")}
        style={{ backgroundImage: `url(${background})` }}
      >
        <img className={cx("pic-small")} src={img} alt={p} />
      </div>
      <div className={cx("intro-right")}>{p}</div>
    </div>
  );
}

export default getIntro;
