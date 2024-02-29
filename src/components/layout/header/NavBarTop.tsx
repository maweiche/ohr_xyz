import Link from "next/link";
import React from "react";

interface NavBarTopProps {
  shouldBeSticky?: boolean;
}

export const NavBarTop: React.FC<NavBarTopProps> = ({ shouldBeSticky }) => {
  return (
    <div className="navbar z-5">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost btn-circle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h7"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 p-2 z-[1] shadow-xl rounded-box bg-[#620080] "
          >
            <li className="p-3">
              <Link href="/">Home</Link>
            </li>
            <li className="p-3">
              <Link href="/about">About</Link>
            </li>
            <li className="p-3">
              <Link href="/blog">Blog</Link>
            </li>
            <li className="p-3">
              <Link href="/contact">Contact</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
