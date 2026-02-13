import { AppContext } from "@/context/AppContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

const TopDoctors = () => {
  const navigate = useNavigate();
  const { doctors } = useContext(AppContext);
  return (
    <article
      className="flex flex-col items-center gap-4 my-16 text-gray-900 md:mx-10"
      aria-labelledby="top-doctors-heading"
    >
      <h2 className="text-3xl font-medium" id="top-doctors-heading">
        Top Doctors to Book
      </h2>

      <p className="sm:w-1/3 text-center text-sm">
        Simply browse through our extensive list of trusted Doctors
      </p>

      <ul
        className="w-full grid grid-cols-auto gap-4 pt-5 gap-y-6 px-3 sm:px-0"
        role="list"
      >
        {doctors.slice(0, 10).map((item) => (
          <li
            className="border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:-translate-y-2.5 transition-all duration-500 focus-within:outline-2 focus-within:outline-blue-500 focus-within:outline-offset-2"
            key={item._id}
          >
            {/* Use <a> wrapping the whole card content for navigation and semantic relaiability */}
            <a
              href={`/appointment/${item._id}`}
              className="block h-full no-underline"
              onClick={(e) => {
                e.preventDefault();
                navigate(`/appointment/${item._id}`);
              }}
            >
              <img
                className="bg-blue-50 w-full"
                src={item.image}
                alt={`Headshot of ${item.name}, ${item.speciality}`}
                width="411"
                height="411"
                loading="lazy"
              />

              <section className="p-4">
                <div className="flex items-center gap-2 text-sm text-center text-green-500">
                  <span
                    className="w-2 h-2 bg-green-500 rounded-full"
                    aria-hidden="true"
                  />
                  <p>Available</p>
                </div>

                <h3 className="text-gray-900 text-lg font-medium">
                  {item.name}
                </h3>

                <p className="text-gray-600 text-sm">{item.speciality}</p>
              </section>
            </a>
          </li>
        ))}
      </ul>

      <button
        onClick={() => {
          navigate("/doctors");
          scrollTo(0, 0);
        }}
        className="bg-blue-50 text-gray-600 px-12 py-3 rounded-full mt-10"
        type="button"
      >
        more
      </button>
    </article>
  );
};

export default TopDoctors;
