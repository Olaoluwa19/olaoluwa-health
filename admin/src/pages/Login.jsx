import { useState } from "react";
import { assets } from "../assets/assets_admin/assets";

const Login = () => {
  const [state, setState] = useState("Admin");
  return (
    <form id="login" className="min-h-[80vh] flex items-center">
      <section className="flex flex-col gap-3 m-auto items-start p-8 min-w-85 sm:min-w-96 border rounded-xl text-[#5E5E5E] text-sm shadow-lg">
        <h2 className="text-2xl font-bold m-auto">
          <span className="text-primary">{state}</span> Login
        </h2>
        <p className="m-auto">Welcome back! Please enter your details.</p>

        <div className="w-full">
          <label htmlFor="identifier">Email or Phone Number</label>
          <input
            className="border border-[#DADADA] rounded w-full p-2 mt-1"
            id="identifier"
            name="identifier"
            type="text"
            placeholder="example@email.com or +2348012345678"
            required
            autoComplete="username tel"
          />
        </div>

        <div className="w-full">
          <label htmlFor="password">Password</label>
          <input
            className="border border-[#DADADA] rounded w-full p-2 mt-1"
            id="password"
            name="password"
            type="password"
            required
            autoComplete="current-password"
          />
        </div>

        <button
          className="bg-primary text-white w-full py-2 rounded-md text-base"
          type="submit"
        >
          Sign In
        </button>
        {state === "Admin" ? (
          <p>
            Doctor Login?{" "}
            <a
              className="text-primary underline cursor-pointer"
              href="#login"
              onClick={() => setState("Doctor")}
            >
              Login
            </a>
          </p>
        ) : (
          <p>
            Admin Login?{" "}
            <a
              className="text-primary underline cursor-pointer"
              href="#login"
              onClick={() => setState("Admin")}
            >
              Login
            </a>
          </p>
        )}
      </section>
    </form>
  );
};

export default Login;
