import { useRef, useState } from "react";
import { assets } from "../assets/assets_frontend/assets";
import { NavLink, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [token, setToken] = useState(true);
  const hamburgerRef = useRef(null);
  const closeButtonRef = useRef(null);

  const openMenu = () => {
    setShowMenu(true);
    // Focus close button after render
    setTimeout(() => closeButtonRef.current?.focus(), 100);
  };

  const closeMenu = () => {
    setShowMenu(false);
    hamburgerRef.current?.focus();
  };

  return (
    <header className="flex items-center justify-between text-sm py-4 mb-5 border-b border-b-gray-400">
      <a
        href="/"
        onClick={(e) => {
          e.preventDefault();
          navigate("/");
        }}
        aria-label="Olaoluwa Wellness home"
        className="block"
      >
        <img
          className="w-44 cursor-pointer"
          src={assets.logo_olaoluwa}
          width="404"
          height="160"
          alt="Olaoluwa Wellness logo"
        />
      </a>

      <nav
        className="hidden md:flex items-start gap-5 font-medium"
        aria-label="primary-navigation"
      >
        <NavLink to="/" end>
          {" "}
          {/* 'end' prop makes it exact match for homepage */}
          <p className="py-1">HOME</p>
          <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden group-hover:block data-active:block" />
        </NavLink>
        <NavLink to="/doctors" end>
          {" "}
          {/* 'end' prop makes it exact match for homepage */}
          <p className="py-1">ALL DOCTORS</p>
          <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden group-hover:block data-active:block" />
        </NavLink>
        <NavLink to="/about" end>
          {" "}
          {/* 'end' prop makes it exact match for homepage */}
          <p className="py-1">ABOUT</p>
          <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden group-hover:block data-active:block" />
        </NavLink>
        <NavLink to="/contact" end>
          {" "}
          {/* 'end' prop makes it exact match for homepage */}
          <p className="py-1">CONTACT</p>
          <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden group-hover:block data-active:block" />
        </NavLink>
      </nav>

      <div className="flex items-center gap-4">
        {token ? (
          <div className="relative">
            <button
              type="button"
              className="flex items-center gap-2 cursor-pointer group"
              aria-expanded={isOpen}
              aria-haspopup="true"
              onClick={() => setIsOpen(!isOpen)}
            >
              <img
                className="w-8 rounded-full"
                src={assets.profile_pic}
                alt="Your profile picture"
                width="32"
                height="32"
              />
              <img
                className="w-2.5"
                src={assets.dropdown_icon}
                alt=""
                aria-hidden="true"
              />
            </button>

            {isOpen && (
              <div
                className="absolute top-full right-0 mt-2 min-w-48 bg-stone-100 rounded shadow-lg flex flex-col gap-4 p-4 z-20"
                role="menu"
                aria-labelledby="profile-menu-button"
              >
                <button
                  id="profile-menu-button"
                  type="button"
                  onClick={() => {
                    navigate("/my-profile");
                    setIsOpen(false);
                  }}
                  className="hover:text-black text-left"
                >
                  My Profile
                </button>
                <button
                  type="button"
                  onClick={() => {
                    navigate("/my-appointments");
                    setIsOpen(false);
                  }}
                  className="hover:text-black text-left"
                >
                  My Appointments
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setToken(false);
                    setIsOpen(false);
                  }}
                  className="hover:text-black text-left"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <button
            type="button"
            onClick={() => navigate("/login")}
            className="bg-primary text-white px-8 py-3 rounded-full font-light hidden md:block"
          >
            Create account
          </button>
        )}
        <button
          ref={hamburgerRef}
          type="button"
          aria-label="Open mobile menu"
          aria-expanded={showMenu}
          onClick={openMenu}
          className="flex items-center py-2 px-2 gap-2 cursor-pointer group md:hidden"
        >
          <img
            className="w-6"
            src={assets.menu_icon}
            alt=""
            aria-hidden="true"
          />
        </button>

        {/* Mobile Menu */}
        {showMenu && (
          <aside className="fixed inset-0 z-20 bg-white md:hidden">
            <figure className="flex items-center justify-between px-5 py-6">
              <img
                className="w-36 cursor-pointer"
                src={assets.logo_olaoluwa}
                alt="Olaoluwa Wellness logo"
                width="404"
                height="160"
                onClick={() => {
                  closeMenu();
                  navigate("/");
                }}
              />
              <button
                ref={closeButtonRef}
                type="button"
                onClick={closeMenu}
                aria-label="Close navigation menu"
                className="flex items-center py-2 px-2 gap-2 cursor-pointer group"
              >
                <img
                  className="w-7 h-7"
                  src={assets.cross_icon}
                  width="100"
                  height="100"
                  alt=""
                  aria-hidden="true"
                />
              </button>
            </figure>
            <nav
              className="flex flex-col items-center gap-2 mt-5 px-5 text-lg font-medium"
              aria-label="mobile-nav"
            >
              <NavLink
                className={({ isActive }) =>
                  `w-full text-center py-4 px-4 ${isActive ? "text-white bg-primary rounded font-bold" : ""}`
                }
                onClick={() => setShowMenu(false)}
                to="/"
                end
              >
                HOME
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  `w-full text-center py-4 px-4 ${isActive ? "text-white bg-primary rounded font-bold" : ""}`
                }
                onClick={() => setShowMenu(false)}
                to="/doctors"
                end
              >
                ALL DOCTORS
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  `w-full text-center py-4 px-4 ${isActive ? "text-white bg-primary rounded font-bold" : ""}`
                }
                onClick={() => setShowMenu(false)}
                to="/about"
                end
              >
                ABOUT
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  `w-full text-center py-4 px-4 ${isActive ? "text-white bg-primary rounded font-bold" : ""}`
                }
                onClick={() => setShowMenu(false)}
                to="/contact"
                end
              >
                CONTACT
              </NavLink>
            </nav>
          </aside>
        )}
      </div>
    </header>
  );
};

export default Navbar;
