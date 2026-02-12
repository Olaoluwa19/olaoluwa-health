import { assets } from "@/assets/assets_frontend/assets";
import { AppContext } from "@/context/AppContext";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Appointment = () => {
  const { docId } = useParams();
  const { doctors, currencySymbol } = useContext(AppContext);

  const [docInfo, setDocInfo] = useState(null);
  const [docSlots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState("");

  const fetchDocInfo = async () => {
    const docInfo = doctors.find((doc) => doc._id === docId);
    setDocInfo(docInfo);
  };

  const getAvailableSlots = async () => {
    setDocSlots([]);

    // getting current date
    let today = new Date();

    for (let i = 0; i < 7; i++) {
      // getting date with index
      let currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);

      // setting end time of the date with index
      let endTime = new Date();
      endTime.setDate(today.getDate() + i);
      endTime.setHours(21, 0, 0, 0);

      // setting hours
      if (today.getDate() === currentDate.getDate()) {
        currentDate.setHours(
          currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10,
        );
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
      } else {
        currentDate.setHours(10);
        currentDate.setMinutes(0);
      }

      let timeSlots = [];
      while (currentDate < endTime) {
        let formattedTime = currentDate.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });

        // add slot to array
        timeSlots.push({
          datetime: new Date(currentDate),
          time: formattedTime,
        });

        // Increment current time by 30 minutes
        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }

      setDocSlots((prev) => [...prev, timeSlots]);
    }
  };

  useEffect(() => {
    fetchDocInfo();
  }, [doctors, docId]);

  useEffect(() => {
    getAvailableSlots();
  }, [docInfo]);

  useEffect(() => {
    console.log(docSlots);
  }, [docSlots]);

  return (
    docInfo && (
      <main>
        {/* ---------- Doctors Details ---------- */}
        <div className="flex flex-col sm:flex-row gap-4">
          <figure>
            <img
              className="bg-primary w-full sm:max-w-72 rounded-lg"
              src={docInfo.image}
              alt={`Dr. ${docInfo.name}, ${docInfo.speciality}`}
            />
          </figure>

          <article className="flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 -mt-20 sm:mt-0">
            {/* --------- Doc Info : name, degree, experience ---------- */}
            <h1 className="flex items-center gap-2 text-2xl font-medium text-gray-900">
              {docInfo.name}{" "}
              <img
                className="w-5"
                src={assets.verified_icon}
                alt="Verified doctor"
              />
            </h1>
            <p className="flex items-center gap-2 text-sm mt-1 text-gray-600">
              {docInfo.degree} — {docInfo.speciality}
              <span className="py-0.5 px-2 border text-xs rounded-full">
                {docInfo.experience} experience
              </span>
            </p>
            {/* --------- Doctors About ---------- */}
            <section>
              <h2 className="flex items-center gap-1 text-sm font-medium text-gray-900 mt-3">
                About <img className="w-3" src={assets.info_icon} alt="Info" />
              </h2>
              <p className="text-sm text-gray-500 max-w-175 mt-1">
                {docInfo.about}
              </p>
            </section>
            <p className="text-gray-500 font-medium mt-4">
              Appointment fees:{" "}
              <span className="text-gray-600">
                {currencySymbol}
                {docInfo.fees}
              </span>
            </p>
          </article>
        </div>
      </main>
    )
  );
};

export default Appointment;
