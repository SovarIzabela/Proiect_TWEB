import { Link } from "react-router-dom";

export default function Logo() {
  return (
    <Link to="/" className="logo">
      <span className="logo__icon">📻</span>
      <h1 className="logo__text">ReactPlay</h1>
    </Link>
  );
}
