"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Button from "../components/Button";
import facebook from "public/images/auth/facebook.png";
import google from "public/images/auth/google.png";
import InputField from "../components/InputField";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";

import { useDisableDashboard } from "../../store/disableDashboard";

// import bg from "public/images/auth/bg.png";
import axiosInstance from "src/api/axiosInstance";
import apiRoutes from "src/api/apiRoutes";
import Link from "next/link";
import { signUpUser } from "src/api/authService";

const SignUpForm: React.FC = () => {
  const router = useRouter();
  const [isRoleSelected, setIsRoleSelected] = useState(false);
  const [role, setRole] = useState<"Student" | "Teacher" | null>(null);
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const { disableDashboard, studentSignUp, teacherSignUp } =
    useDisableDashboard();
  const params = useSearchParams();
  useEffect(() => {
    document.title =
      role === "Student" || !role
        ? "Become a Student - Tafawwaq Tutoring"
        : "Tutor Sign Up- Tafawwaq Tutoring";
  }, [role]);
  useEffect(() => {
    if (params.get("role")) {
      setRole(params.get("role") as "Student" | "Teacher");
      setIsRoleSelected(true);
    }
  }, [params]);
  // const router = useRouter();
  // const handleSignup = () => {
  //   if (signupRole === "student") {
  //     router.push("/student");
  //   }
  //   if (signupRole === "teacher") {
  //     router.push("/teacher");
  //   }
  // };

  const handleRoleSelect = (selectedRole: "Student" | "Teacher") => {
    setRole(selectedRole);
    setIsRoleSelected(true);
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !username || !email || !password || !rePassword) {
      toast.error("Please fill in all fields");
      return;
    }
    if (password !== rePassword) {
      toast.error("Passwords do not match");
      return;
    }
    if (!role) {
      toast.error("Please select a role");
      return;
    }
    try {
      const response = await signUpUser({
        name,
        username,
        email,
        password,
        role,
      });

      if (response.status === 201) {
        toast.success("User registered successfully");

        setName("");
        setUsername("");
        setEmail("");
        setPassword("");
        setRePassword("");
        setRole(null);
        setIsRoleSelected(false);

        setTimeout(() => {
          if (role === "Teacher")
            router.push("/teacher/onboarding");
          else
            router.push("/student/onboarding");
        }, 2000);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(
          `Registration error: ${error.response?.data.message || "Unknown error"
          }`,
        );
      } else {
        toast.error("An unexpected error occurred during registration");
      }
    }
  };

  return (
    <div className="bg-lightGray shadow-lg rounded-lg p-8 z-10 w-full max-w-lg relative min-h-60 flex flex-col justify-center">
      {!isRoleSelected ? (
        <>
          {/* Role Selection */}
          <div className="flex justify-between items-center mb-6">
            <Button
              label="Student"
              classNames={`rounded-lg bg-primary text-white`}
              onClick={() => {
                disableDashboard();
                setIsRoleSelected(true);
                studentSignUp();
                handleRoleSelect("Student");
              }}
            />
            <span className="px-4 text-light_gray">Or</span>
            {/* <Link href="/signup" className=" w-full"> */}
            <Button
              label="Teacher"
              classNames={`rounded-lg bg-primary text-white`}
              onClick={() => {
                disableDashboard();
                setIsRoleSelected(true);
                teacherSignUp();
                handleRoleSelect("Teacher");
              }}
            />
          </div>
        </>
      ) : (
        <>
          <div
            className="flex flex-col items-center bg-secondary absolute top-[-70px] mt-6 left-[50%] translate-x-[-50%] z-10 shadow-lg p-4 rounded-lg"
            style={{ width: "60%" }}
          >
            <div className="text-white text-center rounded-t-lg w-full pb-3">
              <span className="font-bold">Sign up with</span>
            </div>
            <div className="flex space-x-4">
              {/* Google Icon */}
              <button className="bg-white p-2 rounded-full shadow-md">
                <Image
                  src={google.src}
                  alt="Google"
                  className="w-5 h-5"
                  width={0}
                  height={0}
                />
              </button>
              {/* Facebook Icon */}
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

          <form className="pt-8 flex flex-col h-full" onSubmit={handleSignUp}>
            <InputField
              labelStyle={{ fontWeight: "bold" }}
              label="Your name"
              type="text"
              placeholder="e.g. John Doe"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <InputField
              labelStyle={{ fontWeight: "bold" }}
              label="Your username"
              type="text"
              placeholder="e.g. JohnDoe"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <InputField
              labelStyle={{ fontWeight: "bold" }}
              label="Email"
              type="email"
              placeholder="e.g. john@doe.com"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <InputField
              labelStyle={{ fontWeight: "bold" }}
              label="Password"
              type="password"
              placeholder="*******"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <InputField
              labelStyle={{ fontWeight: "bold" }}
              label="Confirm Password"
              type="password"
              placeholder="*******"
              id="repassword"
              value={rePassword}
              onChange={(e) => setRePassword(e.target.value)}
            />

            <div className="flex items-center my-4 mt-5">
              <label htmlFor="terms" className="text-sm text-gray-600">
                By clicking on &quot;Sign up&quot; you confirm that you accept
                the{" "}
                <Link href="/terms" className="text-primary hover:underline">
                  Terms and Conditions
                </Link>{" "}
                and the{" "}
                <Link href="/privacy" className="text-primary hover:underline">
                  Privacy Policy
                </Link>
              </label>
            </div>

            <Button
              label="Sign up"
              type="button"
              classNames="py-4 rounded-lg mt-6"
              onClick={handleSignUp}
            />
          </form>
        </>
      )}
    </div>
  );
};

export default SignUpForm;
