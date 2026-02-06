"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { FaBars, FaTimes, FaSearch } from "react-icons/fa";
import NavbarLinks from "../ui/navbar-link";
import ProgramLinks from "../ui/program-links";

export default function HeaderInner({ className = "" }: { className?: string }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <nav className={`w-full bg-black/50 text-white fixed p-2 ${className} fixed top-0 left-0 w-full z-50 `}>
      <div className="mx-auto  px-2 md:px-6 py-2 md:py-2 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <div>
            <Link href="/" className="text-xl font-bold">
              <Image src="/storage/images/logos/dostv.png" alt="DOSTV" width={120} height={20} className="object-contain" sizes="(max-width: 300px) 100vw, 50vw" />
            </Link>
          </div>
          <ul className="hidden md:flex gap-x-4 text-[13px] uppercase font-bold">
            <NavbarLinks url="/home" pathname={pathname as string}>Home</NavbarLinks>
            <NavbarLinks url="/about" pathname={pathname as string}>About</NavbarLinks>
            <ProgramLinks />
            <NavbarLinks url="/testimonials" pathname={pathname as string}>Testimonials</NavbarLinks>
          </ul>
        </div>
        <div className=" items-center gap-4 flex">
          <div className="hidden sm:flex items-center border rounded-2xl px-3 py-2">
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent outline-none text-sm placeholder:text-slate-200"
            />
            <FaSearch className="ml-2 text-slate-200" />
          </div>
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden text-xl"
            aria-label="Toggle menu"
          >
            {open ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>
      <div
        className={`
          md:hidden overflow-hidden transition-all duration-300 ease-in-out
          ${open ? "max-h-125 opacity-100 overflow-y-scroll scroll-slim " : "max-h-0 opacity-0"}
        `}
      >
        <ul className="flex flex-col gap-4 px-6 pb-6 text-[13px] uppercase font-bold bg-black/80 backdrop-blur">
          <li className="my-4">
            <div className="flex items-center border rounded-2xl px-3 py-2">
              <input
                type="text"
                placeholder="Search..."
                className="bg-transparent outline-none text-sm placeholder:text-slate-200 w-full"
              />
              <FaSearch className="ml-2 text-slate-200" />
            </div>
          </li>
          <NavbarLinks url="/home" pathname={pathname as string} onClick={() => setOpen(false)}>
            Home
          </NavbarLinks>
          <NavbarLinks url="/about" pathname={pathname as string} onClick={() => setOpen(false)}>
            About
          </NavbarLinks>
          <ProgramLinks mobile />
          <NavbarLinks url="/testimonials" pathname={pathname as string} onClick={() => setOpen(false)}>
            Testimonials
          </NavbarLinks>
        </ul>
      </div>
    </nav>
  );
}

