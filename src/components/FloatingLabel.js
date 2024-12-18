import { FloatingLabel, Form } from "react-bootstrap";

export default function FloatingLabelApp({
  id,
  label,
  type,
  placeholder,
  ...props
}) {
  return (
    <FloatingLabel controlId={id} label={label}>
      <Form.Control
        type={type}
        placeholder={placeholder}
        value={props.value}
        onChange={props.onChange}
      />
    </FloatingLabel>
  );
}
