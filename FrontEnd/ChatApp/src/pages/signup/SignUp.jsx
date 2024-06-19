import { Link } from "react-router-dom";
import GenderCheckbox from "./GenderCheckbox";
import { useState } from "react";
import useSignup from "../../hooks/useSignup";

const SignUp = () => {
  const [inputs, setinputs] = useState({
    fullName: "",
    userName: "",
    password: "",
    gender: "",
    confirmPassword: "",
  });
  const { signup, loading } = useSignup();
  const handleCheckboxChange = (gender) => {
    setinputs({ ...inputs, gender });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    signup(inputs);
  };
  return (
    <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
      <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
        <h1 className="text-3xl font-semibold text-center text-gray-300">
          Sign Up <span className="text-blue-500"> ChatApp</span>
        </h1>

        <form onSubmit={handleSubmit}>
          <div>
            <label className="label p-2">
              <span className="text-white label-text">Full Name</span>
            </label>
            <input
              type="text"
              placeholder="John Doe"
              className="w-full input input-bordered  h-10"
              value={inputs.fullName}
              id="fullName"
              onChange={(e) => {
                setinputs({ ...inputs, fullName: e.target.value });
              }}
            />
          </div>

          <div>
            <label className="label p-2 ">
              <span className="text-white label-text">Username</span>
            </label>
            <input
              type="text"
              placeholder="johndoe"
              className="w-full input input-bordered h-10"
              value={inputs.userName}
              id="username"
              onChange={(e) => {
                setinputs({ ...inputs, userName: e.target.value });
              }}
            />
          </div>

          <div>
            <label className="label">
              <span className="text-white label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              id="password"
              className="w-full input input-bordered h-10"
              value={inputs.password}
              onChange={(e) => {
                setinputs({ ...inputs, password: e.target.value });
              }}
            />
          </div>

          <div>
            <label className="label">
              <span className="text-white label-text">Confirm Password</span>
            </label>
            <input
              type="password"
              placeholder="Confirm Password"
              id="confirmpass"
              className="w-full input input-bordered h-10"
              value={inputs.confirmPassword}
              onChange={(e) => {
                setinputs({ ...inputs, confirmPassword: e.target.value });
              }}
            />
          </div>

          <GenderCheckbox
            onCheckboxChange={handleCheckboxChange}
            selectedGender={inputs.gender}
          />

          <Link
            className="text-sm text-white font-semibold hover:underline hover:text-blue-600 mt-2 inline-block"
            to="/login"
          >
            Already have an account?
          </Link>

          <div>
            <button className="btn btn-block btn-sm mt-2 border border-slate-700">
              {!loading ? (
                <span>Sign Up</span>
              ) : (
                <span className="loading loading-spinner"></span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default SignUp;
