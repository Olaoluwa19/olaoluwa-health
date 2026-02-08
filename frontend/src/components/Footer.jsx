import { assets } from "@/assets/assets_frontend/assets";
import React from "react";

const Footer = () => {
  return (
    <div>
      <div>
        {/* ------- Left Section -------- */}
        <div>
          <img src={assets.logo_olaoluwa} alt="" />
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta ea
            asperiores, dignissimos qui est mollitia fugit delectus aperiam,
            perferendis et odit? Minus, pariatur culpa. Doloribus error fuga
          </p>
        </div>

        {/* ------- Center Section -------- */}
        <div>
          <p>COMPANY</p>
          <ul>
            <li>Home</li>
            <li>About us</li>
            <li>Contact us</li>
            <li>Privacy policy</li>
          </ul>
        </div>

        {/* ------- Right Section -------- */}
        <div>
          <p>CONTACT DEVELOPER</p>
          <ul>
            <li>+234-906-775-9137</li>
            <li>oluwadurotimioladapo@gmail.com</li>
          </ul>
        </div>
      </div>

      {/* --------- Copyright Text ---------- */}
      <div>
        <hr />
        <p>Copyright ©️2026 Olaoluwa_codes - All Right Reserved.</p>
      </div>
    </div>
  );
};

export default Footer;
