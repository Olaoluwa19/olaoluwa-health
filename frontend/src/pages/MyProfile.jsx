import { assets } from "@/assets/assets_frontend/assets";
import { useState } from "react";

const MyProfile = () => {
  const [userData, setUserData] = useState({
    name: "Lagbaja Ajanlekoko",
    image: assets.profile_pic,
    email: "ajanlekoko@example.com",
    phone: "+234 906 775 9137",
    address: {
      line1: "Plot 225 Fola Osibo, Lekki",
      line2: "Lagos, Nigeria",
    },
    gender: "Male",
    dob: "2000-01-30",
  });

  const [isEdit, setIsEdit] = useState(false);

  return (
    <main className="max-w-lg mx-auto flex flex-col gap-6 text-sm">
      <h1 className="sr-only">My Profile</h1>

      <img
        className="w-36 rounded-full object-cover"
        src={userData.image}
        alt="" // decorative
        aria-hidden="true"
      />

      {isEdit ? (
        <input
          className="text-3xl font-medium bg-gray-50 border border-gray-300 rounded px-3 py-1.5 max-w-md focus:outline-none focus:ring-2 focus:ring-primary"
          type="text"
          value={userData.name}
          onChange={(e) =>
            setUserData((prev) => ({ ...prev, name: e.target.value }))
          }
          autoFocus // focus here when editing starts
          aria-label="Your full name"
        />
      ) : (
        <h2 className="text-3xl font-medium text-neutral-800">
          {userData.name}
        </h2>
      )}

      <hr className="border-t border-zinc-300 my-4" aria-hidden="true" />

      {/* Contact Information */}
      <section aria-labelledby="contact-heading">
        <h3
          id="contact-heading"
          className="text-neutral-500 font-medium underline mb-4"
        >
          CONTACT INFORMATION
        </h3>

        <dl className="grid grid-cols-[auto_1fr] gap-x-8 gap-y-4 text-neutral-700">
          <dt className="font-medium">Email:</dt>
          <dd className="text-blue-600">{userData.email}</dd>

          <dt className="font-medium">Phone:</dt>
          <dd>
            {isEdit ? (
              <input
                className="bg-gray-50 border border-gray-300 rounded px-3 py-1.5 w-full max-w-xs"
                type="tel"
                value={userData.phone}
                onChange={(e) =>
                  setUserData((p) => ({ ...p, phone: e.target.value }))
                }
              />
            ) : (
              <span className="text-blue-600">{userData.phone}</span>
            )}
          </dd>

          <dt className="font-medium">Address:</dt>
          <dd className="text-gray-600">
            {isEdit ? (
              <div className="space-y-2">
                <input
                  className="bg-gray-50 border border-gray-300 rounded px-3 py-1.5 w-full"
                  type="text"
                  value={userData.address.line1}
                  onChange={(e) =>
                    setUserData((p) => ({
                      ...p,
                      address: { ...p.address, line1: e.target.value },
                    }))
                  }
                />
                <input
                  className="bg-gray-50 border border-gray-300 rounded px-3 py-1.5 w-full"
                  type="text"
                  value={userData.address.line2}
                  onChange={(e) =>
                    setUserData((p) => ({
                      ...p,
                      address: { ...p.address, line2: e.target.value },
                    }))
                  }
                />
              </div>
            ) : (
              <>
                {userData.address.line1}
                <br />
                {userData.address.line2}
              </>
            )}
          </dd>
        </dl>
      </section>

      {/* Basic Information */}
      <section aria-labelledby="basic-heading">
        <h3
          id="basic-heading"
          className="text-neutral-500 font-medium underline mb-4"
        >
          BASIC INFORMATION
        </h3>

        <dl className="grid grid-cols-[auto_1fr] gap-x-8 gap-y-4 text-neutral-700">
          <dt className="font-medium">Gender:</dt>
          <dd>
            {isEdit ? (
              <select
                className="bg-gray-50 border border-gray-300 rounded px-3 py-1.5"
                value={userData.gender}
                onChange={(e) =>
                  setUserData((p) => ({ ...p, gender: e.target.value }))
                }
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            ) : (
              <span className="text-gray-600">{userData.gender}</span>
            )}
          </dd>

          <dt className="font-medium">Date of Birth:</dt>
          <dd>
            {isEdit ? (
              <input
                className="bg-gray-50 border border-gray-300 rounded px-3 py-1.5"
                type="date"
                value={userData.dob}
                onChange={(e) =>
                  setUserData((p) => ({ ...p, dob: e.target.value }))
                }
              />
            ) : (
              <span className="text-gray-600">{userData.dob}</span>
            )}
          </dd>
        </dl>
      </section>

      <div className="mt-10 flex gap-4">
        {isEdit ? (
          <>
            <button
              type="button"
              className="border border-primary px-8 py-2 rounded-full hover:bg-primary hover:text-white transition-colors"
              onClick={() => setIsEdit(false)}
            >
              Save Information
            </button>
            <button
              type="button"
              className="border border-gray-400 px-8 py-2 rounded-full hover:hover:bg-red-600 hover:text-white transition-colors"
              onClick={() => setIsEdit(false)}
            >
              Cancel
            </button>
          </>
        ) : (
          <button
            type="button"
            className="border border-primary px-8 py-2 rounded-full hover:bg-primary hover:text-white transition-colors"
            onClick={() => {
              setIsEdit(true);
              // Focus first input after small delay
              setTimeout(() => document.querySelector("input")?.focus(), 50);
            }}
          >
            Edit Profile
          </button>
        )}
      </div>
    </main>
  );
};

export default MyProfile;
