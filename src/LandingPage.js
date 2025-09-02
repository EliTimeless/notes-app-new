import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./Firebase";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";

import "./LandingPage.css";

export default function LandingPage() {
  const [isUser] = useAuthState(auth);
  const navigate = useNavigate();

  return (
    <div className="landing-page">
      <h2>Welcome to Notes app</h2>
      <h3>Application for writing, reading, saving, and editing notes</h3>

      {isUser ? (
        <>
          <Link className="routes" to="/notes">
            Go to your notes
          </Link>
          <button
            type="button"
            onClick={async () => {
              try {
                await signOut(auth);
                navigate("/");
              } catch (error) {
                console.error("Chyba při odhlašování:", error);
              }
            }}
          >
            Log Out
          </button>
        </>
      ) : (
        <>
          <Link className="routes" to="/login">
            Log in{" "}
          </Link>{" "}
          <Link className="routes" to="/signup">
            Sign up{" "}
          </Link>
        </>
      )}
    </div>
  );
}

/* <>
        <Link className="routes" to="/login">
          Log In
        </Link>{" "}
        <Link className="routes" to="/signup">
          Sign Up
        </Link>
      </> */
