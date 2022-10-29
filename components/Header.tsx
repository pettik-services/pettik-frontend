import React from "react";
import { useMediaQuery } from "react-responsive";
import { DeskNav, MobileNav } from "./NavBar";

const Header = () => {
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 768px)" });
  return <>{isTabletOrMobile ? <MobileNav /> : <DeskNav />}</>;
};

export default Header;
