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
          // Backdrop - only when menu is open
          <div
            className="fixed inset-0 z-40 bg-black/40 md:hidden transition-opacity duration-300"
            onClick={closeMenu}
            aria-hidden="true"
          />
        )}

        {/* Right sliding drawer */}
        <aside
          className={`
    fixed top-0 bottom-0 right-0 z-50 w-4/5 max-w-sm bg-white shadow-2xl
    transform transition-transform duration-300 ease-in-out md:hidden
    ${showMenu ? "translate-x-0" : "translate-x-full"}
  `}
          aria-label="Mobile navigation menu"
        >
          <div className="flex flex-col h-full">
            {/* Header with logo + close */}
            <div className="flex items-center justify-between px-5 py-6 border-b">
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
                className="p-2 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <img
                  className="w-7 h-7"
                  src={assets.cross_icon}
                  alt=""
                  aria-hidden="true"
                />
              </button>
            </div>

            {/* Navigation links */}
            <nav className="flex-1 px-5 py-8 overflow-y-auto">
              <ul className="flex flex-col gap-2 text-lg font-medium">
                <li>
                  <NavLink
                    className={({ isActive }) =>
                      `block w-full text-center py-4 px-6 rounded-xl transition-colors ${
                        isActive
                          ? "text-white bg-primary font-bold shadow-sm"
                          : "text-gray-800 hover:bg-gray-100"
                      }`
                    }
                    onClick={closeMenu}
                    to="/"
                    end
                  >
                    HOME
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className={({ isActive }) =>
                      `block w-full text-center py-4 px-6 rounded-xl transition-colors ${
                        isActive
                          ? "text-white bg-primary font-bold shadow-sm"
                          : "text-gray-800 hover:bg-gray-100"
                      }`
                    }
                    onClick={closeMenu}
                    to="/doctors"
                  >
                    ALL DOCTORS
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className={({ isActive }) =>
                      `block w-full text-center py-4 px-6 rounded-xl transition-colors ${
                        isActive
                          ? "text-white bg-primary font-bold shadow-sm"
                          : "text-gray-800 hover:bg-gray-100"
                      }`
                    }
                    onClick={closeMenu}
                    to="/about"
                  >
                    ABOUT
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className={({ isActive }) =>
                      `block w-full text-center py-4 px-6 rounded-xl transition-colors ${
                        isActive
                          ? "text-white bg-primary font-bold shadow-sm"
                          : "text-gray-800 hover:bg-gray-100"
                      }`
                    }
                    onClick={closeMenu}
                    to="/contact"
                  >
                    CONTACT
                  </NavLink>
                </li>
              </ul>
            </nav>
          </div>
        </aside>
      </div>
    </header>
  );
};

export default Navbar;
