import { Form, Input } from "antd";
import PropTypes from "prop-types";
import { ErrorMessage } from "formik";

InputField.propTypes = {
  field: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired,

  label: PropTypes.string,
  placeholder: PropTypes.string,
  type: PropTypes.string,
};

InputField.defaultProps = {
  label: "",
  placeholder: "",
  type: "text",
};

function InputField(props) {
  const { field, form, type, label, placeholder } = props;

  const { name, value } = field;
  const { errors, touched } = form;
  const showError = errors[name] && touched[name];

  return (
    <Form.Item
      label={label}
      name={name}
      rules={[
        {
          required: true,
        },
      ]}
      labelCol={{
        offset: 1,
      }}
      labelAlign="left"
    >
      <Input
        id={name}
        {...field}
        type={type}
        placeholder={placeholder}
        style={showError && { border: "1px solid red" }}
        allowClear={true}
        value={type === "number" ? (value === 0 ? 0 : `0${value}`) : value}
      />

      <ErrorMessage
        name={name}
        render={(msg) => (
          <p
            style={{
              color: "red",
              width: "100%",
              height: "10px",
              fontSize: "12px",
            }}
          >
            {msg}
          </p>
        )}
      />
    </Form.Item>
  );
}

export default InputField;
