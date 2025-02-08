// import { useTranslation } from "react-i18next";
import Header from "../components/header/header";
import { Outlet } from "@tanstack/react-router";

const MainLayout = () => {
  // const { t } = useTranslation("translation");

  return (
    <div>
      <Header />
      <div className="container py-4 mx-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
