import { assets } from "@/assets/assets_frontend/assets";
import { AppContext } from "@/context/AppContext";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Appointment = () => {
  const { docId } = useParams();
  const { doctors } = useContext(AppContext);

  const [docInfo, setDocInfo] = useState(null);

  const fetchDocInfo = async () => {
    const docInfo = doctors.find((doc) => doc._id === docId);
    setDocInfo(docInfo);
    console.log(docInfo);
  };

  useEffect(() => {
    fetchDocInfo();
  }, [doctors, docId]);
  return (
    docInfo && (
      <div>
        {/* ---------- Doctors Details ---------- */}
        <div>
          <figure>
            <img src={docInfo.image} alt={docInfo.name} />
          </figure>
        </div>

        <section>
          {/* --------- Doc Info : name, degree, experience ---------- */}
          <h2>
            {docInfo.name} <img src={assets.verified_icon} alt="Verified" />
          </h2>
          <div>
            <p>
              {docInfo.degree} - {docInfo.speciality}
            </p>
            <button>{docInfo.experience}</button>
          </div>
          {/* --------- Doctors About ---------- */}
          <article>
            <h3>
              About <img src={assets.info_icon} alt="Info" />
            </h3>
            <p>{docInfo.about}</p>
          </article>
        </section>
      </div>
    )
  );
};

export default Appointment;
