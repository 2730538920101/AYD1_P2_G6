import { FloatingLabel } from "react-bootstrap";
import Form from "react-bootstrap/Form";

const FormInput = ({
  placeholder,
  errors,
  name,
  controlId,
  register,
  type,
  props = null,
}) => {
  return (
    <Form.Group className="p-3 w-auto" controlId={controlId}>
      <FloatingLabel
        controlId="floatingInput"
        label={placeholder}
        className="mb-3"
      >
        <Form.Control
          type={type}
          placeholder={placeholder}
          {...register(name)}
          defaultValue=""
          {...props}
          isInvalid={!!errors[name]}
        />
      </FloatingLabel>
      {!!errors[name] && (
        <Form.Text className="text-danger">{errors[name].message}</Form.Text>
      )}
    </Form.Group>
  );
};

export default FormInput;
