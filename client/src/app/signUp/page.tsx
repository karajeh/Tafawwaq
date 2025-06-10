import Image from "next/image";
import { ToastContainer } from "react-toastify";
import SignUpForm from "../components/SignUpForm";
import authUp from "public/images/auth/change/authUp.svg";
import authDown from "public/images/auth/change/authDown.svg";
import { Suspense } from "react";

const page: React.FC = () => {
  return (
    <div
      className="flex relative w-full justify-center py-20 mt-20"
      style={{ minHeight: "calc(100vh - 68px)" }}
    >
      {" "}
      {/* Assuming the navbar height is 70px */}
      <div
        className="absolute inset-0 bg-gradient-to-r opacity-80 z-0"
        style={
          {
            //  background: "linear-gradient(279.4deg, rgba(64, 168, 205, 0.45) 4.93%, rgba(32, 84, 103, 0.45) 91.57%)",
            //  backdropFilter: "blur(2px)"
          }
        }
      ></div>{" "}
      {/* Overlay */}
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
      <div className={`w-full flex justify-center items-center`}>
        <Suspense>
          <SignUpForm />
        </Suspense>
      </div>
    </div>
  );
};

export default page;
