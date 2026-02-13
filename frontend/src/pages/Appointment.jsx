import { assets } from "@/assets/assets_frontend/assets";
import RelatedDoctors from "@/components/RelatedDoctors";
import { AppContext } from "@/context/AppContext";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Appointment = () => {
  const { docId } = useParams();
  const { doctors, currencySymbol } = useContext(AppContext);
  const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

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
        {/* Doctor Details */}
        <div className="flex flex-col sm:flex-row gap-4">
          <figure>
            <img
              className="bg-primary w-full sm:max-w-72 rounded-lg"
              src={docInfo.image}
              alt={`Dr. ${docInfo.name}, ${docInfo.speciality}`}
              width="411"
              height="411"
              loading="lazy"
            />
          </figure>

          <article className="flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 -mt-20 sm:mt-0">
            <h2 className="flex items-center gap-2 text-2xl font-medium text-gray-900">
              {docInfo.name}{" "}
              <img
                className="w-5"
                src={assets.verified_icon}
                alt="Verified doctor"
              />
            </h2>
            <p className="flex items-center gap-2 text-sm mt-1 text-gray-600">
              {docInfo.degree} — {docInfo.speciality}
              <span className="py-0.5 px-2 border text-xs rounded-full">
                {docInfo.experience} experience
              </span>
            </p>

            <section>
              <h3 className="flex items-center gap-1 text-sm font-medium text-gray-900 mt-3">
                About{" "}
                <img
                  className="w-3"
                  src={assets.info_icon}
                  alt="About information"
                />
              </h3>
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

        {/* Booking Slots */}
        <article
          className="sm:ml-72 sm:pl-4 mt-8"
          aria-labelledby="booking-slots-heading"
        >
          <h2 id="booking-slots-heading" className="font-medium text-gray-700">
            Booking slots
          </h2>

          {/* Day selector – treated as tabs or radio group */}
          <div role="group" aria-label="Select appointment day">
            <div className="flex gap-3 items-center w-full overflow-x-auto mt-4 pb-2 snap-x snap-mandatory">
              {docSlots.length > 0 &&
                docSlots.map((item, index) => {
                  const dayName = item[0]
                    ? daysOfWeek[item[0].datetime.getDay()]
                    : "";
                  const dayNum = item[0] ? item[0].datetime.getDate() : "";
                  const isSelected = slotIndex === index;

                  return (
                    <button
                      key={index}
                      type="button"
                      onClick={() => setSlotIndex(index)}
                      className={`text-center py-6 min-w-16 rounded-full cursor-pointer snap-center shrink-0 ${
                        isSelected
                          ? "bg-primary text-white"
                          : "border border-gray-200"
                      } focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-primary`}
                      aria-pressed={isSelected}
                      aria-label={`Select ${dayName} ${dayNum}${isSelected ? ", selected" : ""}`}
                    >
                      <p>{dayName}</p>
                      <p>{dayNum}</p>
                    </button>
                  );
                })}
            </div>
          </div>

          {/* Time selector – similar approach */}
          <div
            role="group"
            aria-label={`Available times for ${docSlots[slotIndex]?.[0]?.datetime ? new Date(docSlots[slotIndex][0].datetime).toLocaleDateString() : "selected day"}`}
          >
            <div className="flex gap-3 items-center w-full overflow-x-auto mt-4 pb-2 snap-x snap-mandatory">
              {docSlots.length > 0 &&
                docSlots[slotIndex].map((item, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => setSlotTime(item.time)}
                    className={`text-sm font-light shrink-0 px-5 py-2 rounded-full cursor-pointer snap-center ${
                      item.time === slotTime
                        ? "bg-primary text-white"
                        : "text-gray-400 border border-gray-300"
                    } focus-visible:outline  focus-visible:outline-offset-2 focus-visible:outline-primary`}
                    aria-pressed={item.time === slotTime}
                    aria-label={`${item.time.toLowerCase()}${item.time === slotTime ? ", selected" : ""}`}
                  >
                    {item.time.toLowerCase()}
                  </button>
                ))}
            </div>
          </div>

          <button
            type="button"
            className="bg-primary text-white text-sm font-light px-14 py-3 rounded-full my-6 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!slotTime}
            onClick={() => {
              // your booking logic
            }}
          >
            Book an appointment
          </button>
        </article>

        {/* Listing Related Doctors */}
        <RelatedDoctors docId={docId} speciality={docInfo.speciality} />
      </main>
    )
  );
};

export default Appointment;
