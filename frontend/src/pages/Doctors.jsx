import { AppContext } from "@/context/AppContext";
import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Doctors = () => {
  const { speciality } = useParams();
  const [filterDoc, setFilterDoc] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
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
        aria-labelledby="speciality-heading"
      >
        {/* Mobile Filters Button + Dropdown */}
        <div className="w-full md:hidden">
          <button
            type="button"
            aria-label="Toggle filter menu"
            aria-expanded={showFilter}
            aria-controls="mobile-filter-panel"
            onClick={() => setShowFilter(!showFilter)}
            className="flex items-center justify-between w-full py-3 px-4 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <span className="font-medium">Filter by Speciality</span>
            <span
              className={`transform transition-transform ${showFilter ? "rotate-180" : ""}`}
            >
              ▼
            </span>
          </button>

          {/* Expanding panel – only visible when toggled */}
          <div
            id="mobile-filter-panel"
            className={`
        overflow-hidden transition-all duration-300 ease-in-out
        ${showFilter ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}
      `}
          >
            <div className="bg-white border border-gray-200 border-t-0 rounded-b-lg px-4 py-5">
              <nav aria-label="Doctor specialities">
                <ul className="flex flex-col gap-2">
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
                          onClick={(e) => {
                            e.preventDefault();
                            navigate(url);
                            setShowFilter(false); // auto-close after selection
                          }}
                          className={`block py-3 px-4 rounded-lg transition-colors ${
                            isActive
                              ? "bg-indigo-100 text-indigo-800 font-medium"
                              : "text-gray-700 hover:bg-gray-100"
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
            </div>
          </div>
        </div>

        {/* Desktop Sidebar – always visible on md+ */}
        <aside className="hidden md:block md:w-64 shrink-0">
          <h2
            id="speciality-heading"
            className="text-gray-800 text-lg font-medium mb-4"
          >
            Filter by Speciality
          </h2>
          <nav aria-label="Doctor specialities" className="flex flex-col gap-3">
            <ul className="flex flex-col gap-3">
              {/* same list items as above – you can extract to a component if you want to avoid duplication */}
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
                      onClick={(e) => {
                        e.preventDefault();
                        navigate(url);
                      }}
                      className={`block pl-4 py-2.5 pr-8 border border-gray-200 rounded-xl transition-all hover:bg-indigo-50 hover:border-indigo-200 ${
                        isActive
                          ? "bg-indigo-100 border-indigo-200 text-black font-semibold"
                          : "text-gray-700"
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

        {/* Doctors Grid */}
        <div className="w-full flex-1 min-w-0">
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
                  className="border border-blue-200 rounded-xl overflow-hidden hover:-translate-y-1 transition-all duration-300 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2"
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
                      className="bg-blue-50 w-full aspect-5/3 object-cover"
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
