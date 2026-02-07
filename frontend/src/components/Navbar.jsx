import { assets } from "../assets/assets_frontend/assets";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="flex items-center justify-between text-sm py-4 mb-5 border-b border-b-gray-400">
      <img src={assets.logo} alt="" />
      <ul>
        <NavLink to={"../pages/Home.jsx"}>
          <li>HOME</li>
          <hr />
        </NavLink>
        <NavLink to={"../pages/Doctors.jsx"}>
          <li>ALL DOCTORS</li>
          <hr />
        </NavLink>
        <NavLink to={"../pages/About.jsx"}>
          <li>ABOUT</li>
          <hr />
        </NavLink>
        <NavLink to={"../pages/Contact.jsx"}>
          <li>CONTACT</li>
          <hr />
        </NavLink>
      </ul>
      <div>
        <button>Create account</button>
      </div>
    </div>
  );
};

export default Navbar;
