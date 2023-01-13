import React, { useState } from "react";
import styles from "./auth.module.scss";
import RegisterImg from "../.././assets/register.png";
import { Link, useNavigate } from "react-router-dom";
import Card from "../../components/card/Card";
import { toast } from "react-toastify";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/config";
import Loader from "../../components/loader/Loader";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");
  const [isLoaging, setisLoaging] = useState(false);

  const navigate = useNavigate();

  const registerUser = (event) => {
    event.preventDefault();
    if (password !== cpassword) {
      toast.error("Passwords do not match");
    }
    setisLoaging(true);

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        setisLoaging(false);
        toast.success("Registration successful...");
        navigate("/login");
      })
      .catch((error) => {
        toast.error(error.message);
        setisLoaging(false);
      });
  };

  return (
    <>
      {" "}
      {isLoaging && <Loader />}
      <section className={`container ${styles.auth}`}>
        <Card>
          <div className={styles.form}>
            <h2>Register</h2>
            <form onSubmit={registerUser}>
              <input
                type="text"
                placeholder="Email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <input
                type="password"
                placeholder="Confirm Password "
                required
                value={cpassword}
                onChange={(e) => setCpassword(e.target.value)}
              />
              <button className="--btn --btn-primary --btn-block" type="submit">
                Register
              </button>
            </form>

            <span className={styles.register}>
              <p>Already an account?</p>
              <Link to="/login">Login</Link>
            </span>
          </div>
        </Card>
        <div>
          <img
            className={styles.img}
            src={RegisterImg}
            alt="register"
            width="400"
          />
        </div>
      </section>
    </>
  );
};

export default Register;
