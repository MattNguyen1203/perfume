import { Empty } from "antd";

const NotFound = () => (
  <Empty
    description="Not Found"
    style={{
      display: "flex",
      flexDirection: "column",
      width: "100%",
      height: "100%",
      justifyContent: "center",
      margin: "auto",
      fontSize: "1.8rem",
    }}
  />
);

export default NotFound;
