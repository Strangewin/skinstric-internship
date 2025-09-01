"use client";
import React from "react";
import { usePathname } from "next/navigation";
import Navbar from "./Navbar";

export default function NavWrapper({ children }) {
  const pathname = usePathname();

  return (
    <>
      { <Navbar />}
      {children}
    </>
  );
}
