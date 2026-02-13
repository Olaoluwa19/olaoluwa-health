import { assets } from "@/assets/assets_frontend/assets";

const Header = () => {
  return (
    <section
      className="flex flex-col md:flex-row flex-wrap bg-primary rounded-lg px-6 md:px-10 lg:px-20"
      aria-labelledby="hero-heading"
    >
      {/* Left Side – promotional content */}
      <div className="md:w-1/2 flex flex-col items-start justify-center gap-4 py-10 m-auto md:py-[10vw] md:-mb-7.5">
        <h1
          id="hero-heading"
          className="text-3xl md:text-4xl lg:text-5xl text-white font-semibold leading-tight md:leading-tight lg:leading-tight"
        >
          Book Appointment <br className="hidden sm:block" />
          With Trusted Doctors
        </h1>

        <div className="flex flex-col md:flex-row items-center gap-3 text-white text-sm font-light">
          <img
            className="w-28"
            src={assets.group_profiles}
            alt="Group of diverse trusted doctors and healthcare professionals"
            width="130"
            height="56"
            loading="lazy"
          />
          <p>
            Simply browse through our extensive list of trusted doctors,{" "}
            <br className="hidden sm:block" />
            schedule your appointment hassle-free.
          </p>
        </div>

        {/* CTA as <a> since it links to #speciality – or change to <button> if JS handled */}
        <a
          href="#speciality"
          className="flex items-center gap-2 bg-white px-8 py-3 rounded-full text-gray-600 text-sm m-auto md:m-0 hover:scale-105 focus-visible:scale-105 transition-all duration-300 focus-visible:outline focus-visible:outline-white focus-visible:outline-offset-2"
        >
          Book appointment{" "}
          <img
            className="w-3"
            src={assets.arrow_icon}
            alt=""
            aria-hidden="true"
          />
        </a>
      </div>

      {/* Right Side – illustrative image */}
      <figure className="md:w-1/2 relative">
        <img
          className="w-full md:absolute bottom-0 h-auto rounded-lg"
          src={assets.header_img}
          alt="Doctor and Nurses in a modern clinic setting"
          width="734"
          height="596"
          loading="lazy"
        />

        <figcaption className="sr-only">
          Trusted medical consultation
        </figcaption>
      </figure>
    </section>
  );
};

export default Header;
