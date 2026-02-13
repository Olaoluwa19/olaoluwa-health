import { AppContext } from "@/context/AppContext";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Doctors = () => {
  const { speciality } = useParams();
  const [filterDoc, setFilterDoc] = useState([]);
  const navigate = useNavigate();

  const { doctors } = useContext(AppContext);

  const applyFilter = () => {
    speciality
      ? setFilterDoc(doctors.filter((doc) => doc.speciality === speciality))
      : setFilterDoc(doctors);
  };

  useEffect(() => {
    applyFilter();
  }, [doctors, speciality]);

  return (
    <main>
      <h1 className="text-gray-600 text-2xl font-medium mb-6">
        Browse through doctors by speciality
      </h1>

      <section
        className="flex flex-col sm:flex-row items-start gap-5 mt-5"
        aria-labelledby="speciality-heading" // better than aria-label for landmark
      >
        <aside className="sm:w-64 shrink-0">
          {" "}
          {/* aside for sidebar/filter */}
          <h2
            id="speciality-heading"
            className="text-gray-800 text-lg font-medium mb-4 sr-only sm:not-sr-only"
          >
            Filter by Speciality
          </h2>
          <nav aria-label="Doctor specialities">
            <ul className="flex flex-col gap-3">
              {[
                "General physician",
                "Gynecologist",
                "Dermatologist",
                "Pediatricians",
                "Neurologist",
                "Gastroenterologist",
              ].map((spec) => {
                const isActive = speciality === spec;
                const url = isActive ? "/doctors" : `/doctors/${spec}`;

                return (
                  <li key={spec}>
                    <a
                      href={url}
                      className={`block pl-4 py-2 pr-8 border border-gray-300 rounded transition-all hover:bg-indigo-50 focus-visible:bg-indigo-100 focus-visible:outline  focus-visible:outline-indigo-500 ${
                        isActive
                          ? "bg-indigo-100 text-black font-medium"
                          : "text-gray-600"
                      }`}
                      aria-current={isActive ? "page" : undefined}
                    >
                      {spec}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>
        </aside>

        <div className="w-full">
          {filterDoc.length === 0 ? (
            <p className="text-center text-gray-500 py-10">
              No doctors found for this speciality.
            </p>
          ) : (
            <ul
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              role="list"
            >
              {filterDoc.map((item) => (
                <li
                  key={item._id}
                  className="border border-blue-200 rounded-xl overflow-hidden hover:-translate-y-2 transition-all duration-300 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2"
                >
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
                      alt={`Dr. ${item.name}, ${item.speciality}`}
                      loading="lazy"
                    />
                    <section className="p-4">
                      <div className="flex items-center gap-2 text-sm text-green-600">
                        <span
                          className="w-2 h-2 bg-green-500 rounded-full"
                          aria-hidden="true"
                        />
                        <span>Available</span>
                      </div>
                      <h3 className="text-gray-900 text-lg font-medium mt-1">
                        {item.name}
                      </h3>
                      <p className="text-gray-600 text-sm">{item.speciality}</p>
                    </section>
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </main>
  );
};

export default Doctors;
