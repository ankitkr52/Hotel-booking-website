import React from "react";
import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <footer className="mt-10 border-t border-slate-800 bg-[#071120] text-white">
      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-12">

        {/* TOP SECTION */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 py-12">

          {/* BRAND */}
          <div>
            <img
              src={assets.luxebookIcon}
              alt="LuxeBook"
              className="h-10 mb-4"
            />

            <p className="text-sm leading-6 text-slate-300 max-w-[250px]">
              Luxury stays, curated hotels, premium suites and seamless booking
              experiences worldwide.
            </p>

            {/* SOCIAL */}
            <div className="flex gap-3 mt-5">
              {[
                assets.instagramIcon,
                assets.twitterIcon,
                assets.facebookIcon,
                assets.linkendinIcon,
              ].map((icon, index) => (
                <a
                  key={index}
                  href="#"
                  className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-primary hover:border-primary transition-all duration-300 hover:-translate-y-1"
                >
                  <img
                    src={icon}
                    alt=""
                    className="w-4 brightness-0 invert opacity-80"
                  />
                </a>
              ))}
            </div>
          </div>

          {/* COMPANY */}
          <div>
            <h3 className="text-base font-semibold mb-5">Company</h3>

            <ul className="space-y-3 text-sm text-slate-300">
              {[
                "About Us",
                "Careers",
                "Press",
                "Partners",
                "Blog",
              ].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="hover:text-white transition-all"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* SUPPORT */}
          <div>
            <h3 className="text-base font-semibold mb-5">Support</h3>

            <ul className="space-y-3 text-sm text-slate-300">
              {[
                "Help Center",
                "Booking Support",
                "Cancellation",
                "Safety Center",
                "Contact Us",
              ].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="hover:text-white transition-all"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* NEWSLETTER */}
          <div>
            <h3 className="text-base font-semibold mb-5">
              Stay Updated
            </h3>

            <p className="text-sm text-slate-300 leading-6 mb-4">
              Exclusive hotel offers, premium deals and travel updates.
            </p>

            <div className="flex items-center rounded-xl bg-white/5 border border-white/10 p-1">
              <input
                type="email"
                placeholder="Enter your email"
                className="bg-transparent outline-none px-3 py-2 text-sm flex-1 placeholder:text-slate-400"
              />

              <button className="px-5 py-2 rounded-lg bg-primary text-sm font-medium hover:opacity-90 transition">
                Join
              </button>
            </div>

            <p className="text-xs text-slate-400 mt-3">
              No spam. Unsubscribe anytime.
            </p>
          </div>
        </div>

        {/* DIVIDER */}
        <div className="h-px bg-white/10" />

        {/* BOTTOM BAR */}
        <div className="py-5 flex flex-col md:flex-row items-center justify-between gap-4">

          <p className="text-sm text-slate-400 text-center md:text-left">
            © {new Date().getFullYear()} LuxeBook. All rights reserved.
          </p>

          <p className="text-sm font-medium text-white">
            Crafted by Ankit Kumar
          </p>

          <div className="flex gap-5 text-sm text-slate-400">
            <a href="#" className="hover:text-white transition">
              Privacy
            </a>

            <a href="#" className="hover:text-white transition">
              Terms
            </a>

            <a href="#" className="hover:text-white transition">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;