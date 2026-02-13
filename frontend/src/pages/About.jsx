import { assets } from "@/assets/assets_frontend/assets";
import React from "react";

const About = () => {
  return (
    <main>
      <section aria-labelledby="about-us-heading">
        <h2
          id="about-us-heading"
          className="text-center text-2xl pt-10 text-gray-500"
        >
          ABOUT <span className="text-gray-700 font-medium">US</span>
        </h2>

        <figure className="my-10 flex flex-col md:flex-row gap-12">
          <img
            className="w-full md:max-w-90"
            src={assets.about_image}
            alt="A Doctor and a Nurse collaborating in a modern medical environment"
            width="657"
            height="668"
            loading="lazy"
          />
          <article className="flex flex-col justify-center gap-6 md:w-2/4 text-sm text-gray-600">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nemo
              laborum quae quos sint asperiores. Voluptatibus animi nobis culpa
              officia aspernatur sint aperiam corporis quia, iure distinctio
              labore. Aut, qui recusandae!
            </p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corporis
              reiciendis fugiat voluptatem eaque ea repellendus, voluptates eum
              iusto quas, facilis cupiditate exercitationem illum rerum?
              Possimus nisi impedit libero velit ducimus autem laboriosam labore
              perspiciatis, rerum quaerat, voluptates at sequi animi.
            </p>

            <h3 className="text-gray-800 text-xl font-medium">Our Vision</h3>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla
              praesentium quisquam similique ipsa asperiores eveniet iure, non
              ab vel unde illum cumque modi sit! Culpa tempore odit temporibus
              perferendis architecto.
            </p>
          </article>
        </figure>
      </section>

      <section aria-labelledby="why-choose-us-heading" className="my-16">
        <h2
          id="why-choose-us-heading"
          className="text-center text-2xl mb-10 text-gray-500"
        >
          WHY <span className="text-gray-700 font-semibold">CHOOSE US</span>
        </h2>

        {/* Used <dl> for term-description pairs and semantic advantages */}
        <dl className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          <div className="border border-blue-200 px-8 md:px-12 py-10 flex flex-col gap-4 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer rounded-lg">
            <dt className="font-bold text-lg">Efficiency</dt>
            <dd className="text-gray-600 hover:text-white">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis
              nihil eveniet...
            </dd>
          </div>

          <div className="border border-blue-200 px-8 md:px-12 py-10 flex flex-col gap-4 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer rounded-lg">
            <dt className="font-bold text-lg">Convenience</dt>
            <dd className="text-gray-600 hover:text-white">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit,
              architecto...
            </dd>
          </div>

          <div className="border border-blue-200 px-8 md:px-12 py-10 flex flex-col gap-4 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer rounded-lg">
            <dt className="font-bold text-lg">Personalisation</dt>
            <dd className="text-gray-600 hover:text-white">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Repudiandae, corporis!...
            </dd>
          </div>
        </dl>
      </section>
    </main>
  );
};

export default About;
