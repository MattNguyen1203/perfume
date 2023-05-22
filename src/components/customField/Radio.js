import { Radio, Space } from "antd";
import { useState } from "react";

function RadioField() {
  const [value, setValue] = useState("Payment on delivery");
  const onChange = (e) => {
    setValue(e.target.value);
  };
  return (
    <Radio.Group onChange={onChange} value={value}>
      <Space direction="vertical">
        <Radio value={"Payment on delivery"} style={{ fontSize: "1.5rem" }}>
          Payment on delivery
        </Radio>
        <Radio
          value={"Payment by bank transfer"}
          style={{ fontSize: "1.5rem" }}
        >
          Payment by bank transfer
        </Radio>
        <Radio
          value={"Payment by international card Visa, Master"}
          style={{ fontSize: "1.5rem" }}
        >
          Payment by international card Visa, Master
        </Radio>
      </Space>
    </Radio.Group>
  );
}

export default RadioField;
