import { assets } from "@/assets/assets_frontend/assets";
import React from "react";

const Contact = () => {
  return (
    <main>
      <h2
        id="contact-us-heading"
        className="text-center text-2xl pt-10 text-gray-500"
      >
        CONTACT <span className="text-gray-700 font-semibold">US</span>
      </h2>

      <section className="my-10 flex flex-col justify-center md:flex-row gap-10 mb-28 text-sm">
        <img
          className="w-full md:max-w-90"
          src={assets.contact_image}
          alt="A Doctor, a nurse and a child being treated"
          width="897"
          height="897"
          loading="lazy"
        />
        <address className="flex flex-col justify-center items-start gap-6 not-italic">
          <h2 className="font-semibold text-lg text-gray-600">OUR OFFICE</h2>
          <p className="text-gray-600">
            234 Obafemi Awolowo way, <br /> Ikeja, Lagos, Nigeria
          </p>
          <p className="text-gray-600">
            Tel: <a href="tel:906-775-9137">(906) 775-9137</a> <br /> Email:
            &nbsp;
            <a href="mailto:oluwadurotimioladapo@gmail.com">
              oluwadurotimioladapo@gmail.com
            </a>
          </p>
          <h3 className="font-semibold text-lg text-gray-600">
            CAREERS AT OLAOLUWA WELLNESS
          </h3>
          <p className="text-gray-600">
            Learn more about our teams and job openings...
          </p>
          <button className="border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-500">
            Explore Jobs
          </button>
        </address>
      </section>
    </main>
  );
};

export default Contact;
