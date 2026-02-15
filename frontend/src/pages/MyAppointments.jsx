import { AppContext } from "@/context/AppContext";
import { useContext } from "react";

const MyAppointments = () => {
  const { doctors } = useContext(AppContext);
  return (
    <main>
      <h1 className="pb-3 mt-12 font-medium text-zinc-700 border-b">
        My Appointments
      </h1>
      <section aria-labelledby="appointments-heading">
        <h2 className="sr-only" id="appointments-heading">
          My Appointments
        </h2>
        {doctors.slice(0, 2).map((item, index) => (
          <div
            className="grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 bprder-b"
            key={index}
          >
            <figure>
              <img
                className="w-32 bg-indigo-50"
                src={item.image}
                alt=""
                aria-hidden="true"
              />
            </figure>
            <article
              className="flex-1 text-sm text-zinc-600"
              aria-labelledby="appointment-details-heading"
            >
              <h3
                className="text-neutral-800 font-semibold"
                id="appointment-details-heading"
              >
                {item.name}
              </h3>
              <p>{item.speciality}</p>
              <address className="not-italic mt-1">
                <h4 className="text-zinc-700 font-medium">Address:</h4>
                <p className="text-xs">{item.address.line1}</p>
                <p className="text-xs">{item.address.line2}</p>
                <p className="text-xs mt-1">
                  <span className="text-sm text-neutral-700 font-medium">
                    Date & Time:
                  </span>{" "}
                  25, Feb 2026 | <time dateTime="16:30">8:30 PM</time>{" "}
                </p>
              </address>
            </article>
            <div></div>
            <div className="flex flex-col gap-2 justify-end">
              <button className="text-sm text-stone-500 sm:min-w-48 py-2 border border-primary rounded hover:bg-primary hover:text-white transition-all duration-300">
                Pay Online
              </button>
              <button className="text-sm text-stone-500 sm:min-w-48 py-2 border border-primary rounded hover:bg-red-600 hover:text-white transition-all duration-300">
                Cancel Appointment
              </button>
            </div>
          </div>
        ))}
      </section>
    </main>
  );
};

export default MyAppointments;
