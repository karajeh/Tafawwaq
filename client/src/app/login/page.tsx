"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import InputField from "../components/InputField";
import facebook from "public/images/auth/facebook.png";
import google from "public/images/auth/google.png";
import Button from "../components/Button";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import authUp from "public/images/auth/change/authUp.svg";
import authDown from "public/images/auth/change/authDown.svg";
import Cookies from "js-cookie";
import ForgotPasswordModal from "../components/ForgotPasswordModal";
import { loginUser } from "src/api/authService";

const Login: React.FC = () => {
  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [password, setPassword] = useState("");
  const [enableForgetForm, setEnableForgetForm] = useState(false);
  const router = useRouter();
  const [isPasswordReset, setIsPasswordReset] = useState<boolean>(false);
  useEffect(() => {
    document.title = `Login - Tafawwaq Tutoring`;
  }, []);
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!usernameOrEmail || !password) {
      toast.error("Please fill in both fields");
      return;
    }

    try {
      const response = await loginUser({
        usernameOrEmail,
        password,
      });

      if (
        response.status === 200 &&
        response.data.message === "Login successful"
      ) {
        toast.success("Login successful!");

        const sessionToken = response.data.user.authentication.sessionToken;

        Cookies.set("token", sessionToken, { expires: 1 });
        const userRole = response.data.user.role;

        if (userRole === "Student") {
          router.push("/student");
        } else if (userRole === "Teacher") {
          router.push("/teacher");
        }
      }
    } catch (error) {
      console.log(error);
      if (axios.isAxiosError(error)) {
        if (error.response && error.response.data.message) {

          toast.error(`Login error: ${error.response.data.message}`);
        } else {
          toast.error("An error occurred during login");
        }
      } else {
        toast.error("An unexpected error occurred");
      }
    }
  };

  const handleForgetClick = () => {
    setEnableForgetForm(true);
  };
  const handleCancelClick = () => {
    setEnableForgetForm(false);
  };
  return (
    <div
      className="flex relative w-full justify-center py-20 mt-24"
      style={{ minHeight: "calc(100vh - 68px)" }}
    >
      {enableForgetForm && (
        <div
          className="w-[100vw] h-[110vh] absolute -mt-48 z-40 flex justify-center items-center"
          style={{ backgroundColor: "#b1b2b596" }}
        >
          <div className="bg-white w-[32rem] h-[22rem] pl-6 pr-6 rounded-lg pt-4 flex flex-col gap-3">
            <h3 className="text-black  text-xl font-bold leading-4 pt-6">
              Forget Your Password?
            </h3>
            <p className="text-gray text-base pt-6">
              We&apos;ll email you a link to reset your password.
            </p>
            <input
              type="text"
              placeholder="Email"
              className="border-2 border-solid border-[#b4b4b4] rounded-3xl py-2 px-4 mt-7"
            ></input>
            <button className="border-2 border-solid border-[#a3d154] rounded-3xl py-2 px-2 bg-[#a3d154] text-[#646464] mt-4 font-semibold">
              Send me a password reset link
            </button>
            <button
              className="border-2 border-solid border-[#d5d4d9] rounded-3xl py-2 px-2 bg-[#d5d4d9] text-gray mt-2"
              onClick={handleCancelClick}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <div
        className="absolute inset-0 bg-gradient-to-r opacity-80 z-0"
        style={
          {
            //  background: "linear-gradient(279.4deg, rgba(64, 168, 205, 0.45) 4.93%, rgba(32, 84, 103, 0.45) 91.57%)",
            //  backdropFilter: "blur(2px)"
          }
        }
      ></div>
      <Image
        src={authUp}
        alt=""
        className="absolute top-0 left-0 z-0 w-1/2 h-[100%]"
        width={0}
        height={0}
      />
      <Image
        src={authDown}
        alt=""
        className="absolute bottom-0 right-0 z-0 w-1/2 h-[100%]"
        width={0}
        height={0}
      />
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
      <div className="w-full flex justify-center items-center">
        <div className="bg-white shadow-lg rounded-lg p-8 z-10 w-full max-w-md relative min-h-60 flex flex-col justify-center">
          <div
            className="flex flex-col items-center bg-secondary absolute top-[-70px] left-[50%] translate-x-[-50%] z-10 shadow-lg p-4 rounded-lg"
            style={{ width: "60%" }}
          >
            <div className="text-white text-center rounded-t-lg w-full pb-3">
              <span className="font-bold">Sign in with</span>
            </div>
            <div className="flex space-x-4">
              <button className="bg-white p-2 rounded-full shadow-md">
                <Image
                  src={google.src}
                  alt="Google"
                  className="w-5 h-5"
                  width={0}
                  height={0}
                />
              </button>
              <button className="bg-white p-2 rounded-full shadow-md">
                <Image
                  src={facebook.src}
                  alt="Facebook"
                  className="w-5 h-5"
                  width={0}
                  height={0}
                />
              </button>
            </div>
          </div>

          <form className="pt-8" onSubmit={handleLogin}>
            <InputField
              label="Username or Email"
              type="text"
              placeholder="e.g. john@doe.com or username"
              id="usernameOrEmail"
              value={usernameOrEmail}
              onChange={(e) => setUsernameOrEmail(e.target.value)}
            />

            <InputField
              label="Password"
              type="password"
              placeholder="*******"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <div className="mb-8 text-left">
              <button
                className="text-sm text-gray opacity-50 hover:underline"
                onClick={handleForgetClick}
              >
                Forgot password?
              </button>
            </div>
            <Button classNames="rounded-lg" label="Sign In" type="submit" />
          </form>

          {isPasswordReset && (
            <ForgotPasswordModal
              handleClose={() => setIsPasswordReset(false)}
            />
          )}

          <div className="mt-4 text-center">
            <p className="text-sm text-gray opacity-50">
              New here?{" "}
              <a
                onClick={() => router.push("/signUp")}
                href="#"
                className="text-primary opacity-100 hover:underline"
              >
                Sign up
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
