import { useState } from "react";
import { Alert } from "react-bootstrap";

const AlertMessage = ({ type, title, body }) => {
  const [show, setShow] = useState(true);
  return (
    <Alert
      show={show}
      variant={type}
      onClose={() => setShow(false)}
      dismissible
      className="p-2"
    >
      <Alert.Heading>{title}</Alert.Heading>
      <p>{body}</p>
    </Alert>
  );
};

export default AlertMessage;
