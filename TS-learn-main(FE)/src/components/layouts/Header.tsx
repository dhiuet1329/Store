import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext, AuthContextType } from "../../contexts/AuthContext";

export default function Header() {
  const { user, logout } = useContext(AuthContext) as AuthContextType;

  return (
    <header>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>

        {user ? (
          <>
            {user.role === "admin" && (
              <li>
                <Link to="/admin">Admin</Link>
              </li>
            )}
            <li>
              <p>Wellcome, {user?.email}</p>
            </li>
            <li>
              <button onClick={logout}>Logout</button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/register">Register</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
          </>
        )}
      </ul>
    </header>
  );
}
