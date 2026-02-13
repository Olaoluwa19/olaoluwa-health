import { useState } from "react";

const Login = () => {
  const [state, setState] = useState("Sign Up");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const onSubmitHandler = async (event) => {
    event.preventDefault();
  };

  return (
    <form
      className="min-h-[80vh] flex items-center"
      aria-labelledby="auth-heading"
      onSubmit={onSubmitHandler}
    >
      <fieldset className="flex flex-col gap-5 m-auto items-start p-8 min-w-85 sm:min-w-96 border border-blue-200 rounded-xl text-zinc-600 text-sm shadow-lg">
        <legend className="sr-only">
          Account {state === "Sign Up" ? "creation" : "login"}
        </legend>

        <h2 id="auth-heading" className="text-2xl font-semibold">
          {state === "Sign Up" ? "Create Account" : "Login"}
        </h2>

        <p className="text-zinc-500">
          Please {state === "Sign Up" ? "sign up" : "log in"} to book an
          appointment
        </p>

        {state === "Sign Up" && (
          <div className="flex flex-col w-full">
            <label htmlFor="full_name">Full name</label>
            <input
              className="border border-zinc-300 rounded w-full p-2.5 mt-1"
              onChange={(e) => setName(e.target.value)}
              value={name}
              type="text"
              id="full_name"
              name="full_name"
              autoComplete="name"
              required
              placeholder="John Snow"
            />
          </div>
        )}

        <div className="flex flex-col w-full">
          <label htmlFor="email">Email</label>
          <input
            className="border border-zinc-300 rounded w-full p-2.5 mt-1"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            id="email"
            name="email"
            autoComplete="email"
            required
            placeholder="youremail@example.com"
          />
        </div>

        <div className="flex flex-col w-full">
          <label htmlFor="password">Password</label>
          <input
            className="border border-zinc-300 rounded w-full p-2.5 mt-1"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type="password"
            id="password"
            name="password"
            autoComplete="current-password"
            required
            placeholder="Your secret password"
          />
        </div>

        <button
          type="submit"
          className="bg-primary text-white w-full p-3 rounded-md text-base font-medium mt-2"
        >
          {state === "Sign Up" ? "Create Account" : "Login"}
        </button>

        {state === "Sign Up" ? (
          <p className="text-center mt-4">
            Already have an account?{" "}
            <button
              type="button"
              onClick={() => setState("Login")}
              className="text-primary underline font-medium hover:text-primary/80"
            >
              Login here
            </button>
          </p>
        ) : (
          <p className="text-center mt-4">
            Don't have an account?{" "}
            <button
              type="button"
              onClick={() => setState("Sign Up")}
              className="text-primary underline font-medium hover:text-primary/80"
            >
              Sign up here
            </button>
          </p>
        )}
      </fieldset>
    </form>
  );
};

export default Login;
