import React, { useState } from "react";
import styles from "./auth.module.scss";
import Card from "../../components/card/Card";
import { Link } from "react-router-dom";
import resetImg from "../.././assets/forgot.png";
import { sendPasswordResetEmail } from "firebase/auth";
import { toast } from "react-toastify";
import { auth } from "../../firebase/config";
import Loader from "../../components/loader/Loader";

const Reset = () => {
  const [email, setEmail] = useState("");
  const [isLoaging, setisLoaging] = useState(false);

  const resetPassword = (event) => {
    event.preventDefault();
    setisLoaging(true);
    sendPasswordResetEmail(auth, email)
      .then(() => {
        toast.success("check your email for reset link");
        setisLoaging(false);
      })
      .catch((error) => {
        setisLoaging(false);
        toast.error(error.message);
      });
  };
  return (
    <>
      {isLoaging && <Loader />}
      <section className={`container ${styles.auth}`}>
        <div>
          <img mclassName={styles.img} src={resetImg} alt="Login" width="400" />
        </div>
        <Card>
          <div className={styles.form}>
            <h2>Reset Password</h2>
            <form onSubmit={resetPassword}>
              <input
                type="text"
                placeholder="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button
                className="--btn --btn-primary --btn-block"
                type={"submit"}
              >
                Reset Password
              </button>
              <div className={styles.links}>
                <p>
                  <Link to="/login">- Login</Link>
                </p>
                <p>
                  <Link to="/register">- Register</Link>
                </p>
              </div>
            </form>
          </div>
        </Card>
      </section>
    </>
  );
};

export default Reset;
