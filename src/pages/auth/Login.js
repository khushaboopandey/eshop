import React, { useState } from "react";
import styles from "./auth.module.scss";
import loginImg from "../.././assets/login.png";
import { toast } from "react-toastify";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import Card from "../../components/card/Card";
import Loader from "../../components/loader/Loader";
import { auth } from "../../firebase/config";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoaging, setisLoaging] = useState(false);

  const navigate = useNavigate();

  const loginUser = (event) => {
    event.preventDefault();
    setisLoaging(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // const user = userCredential.user;
        setisLoaging(false);
        toast.success("Login Successfull...");
        navigate("/home");
      })
      .catch((error) => {
        toast.error(error.message);
        setisLoaging(false);
      });
  };

  // google login
  const provider = new GoogleAuthProvider();
  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // const user = result.user;
        toast.success("Login successfully");
        navigate("/");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <>
      {" "}
      {isLoaging && <Loader />}
      <section className={`container ${styles.auth}`}>
        <div>
          <img mclassName={styles.img} src={loginImg} alt="Login" width="400" />
        </div>
        <Card>
          <div className={styles.form}>
            <h2>Login</h2>
            <form onSubmit={loginUser}>
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
              <button
                className="--btn --btn-primary --btn-block"
                type={"submit"}
              >
                Login
              </button>
              <div className={styles.links} type={"submit"}>
                <Link to="/reset">Reset Password</Link>
              </div>
              <p>-- or --</p>
            </form>
            <button
              className="--btn --btn-danger --btn-block"
              onClick={signInWithGoogle}
            >
              <FaGoogle color="fff" /> Login with Google
            </button>
            <span className={styles.register}>
              <p>Don't have an account?</p>
              <Link to="/register"> Register</Link>
            </span>
          </div>
        </Card>
      </section>
    </>
  );
};

export default Login;
