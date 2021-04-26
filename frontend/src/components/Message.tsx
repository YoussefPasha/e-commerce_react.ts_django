import { Alert } from "react-bootstrap";

const Message = ({ variant, children }: any) => {
  return <Alert variant={variant}>{children}</Alert>;
};

export default Message;
