import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";
import "./Login.css";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("STAFF");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      await API.post("/auth/register", {
        name,
        email,
        password,
        role,
      });

      setMessage("Registration Successful");

      setTimeout(() => {
        navigate("/");
      }, 1000);

    } catch (error) {
      setMessage("Error during registration");
    }
  };

  return (
    <div className="login-container">
      <h1>Create Account</h1>
      <p>Register to continue</p>

      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

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

      <select
        value={role}
        onChange={(e) => setRole(e.target.value)}
      >
        <option value="STAFF">STAFF</option>
        <option value="HM">HM</option>
      </select>

      <button onClick={handleRegister}>Register</button>

      <p
        style={{ cursor: "pointer", color: "blue" }}
        onClick={() => navigate("/")}
      >
        Already have an account? Login
      </p>

      <p>{message}</p>
    </div>
  );
}

export default Register;