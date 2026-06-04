import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import API from "../api";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

const handleLogin = async () => {
  try {
    const res = await API.post("/auth/login", {
      email,
      password,
    });

    setMessage(res.data.message);

    if (res.data.role === "STAFF") {
      navigate("/staff");
    }

    if (res.data.role === "HM") {
      navigate("/hm");
    }

  } catch (error) {
    setMessage("Server Error or Invalid Credentials");
  }
};

  return (
    <div className="login-container">
      <h1>Welcome Back</h1>
      <p>Sign in to continue</p>

      <input
        type="email"
        placeholder="Email Address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={handleLogin}>Login</button>

      <div className="extra-links">
        <a href="#">Forgot Password?</a>

        <p
          style={{ cursor: "pointer", color: "blue" }}
          onClick={() => navigate("/register")}
        >
          Create new account
        </p>
      </div>

      <p>{message}</p>
    </div>
  );
}

export default Login;