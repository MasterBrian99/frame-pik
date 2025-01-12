import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import Header from "../components/header/header";

const MainLayout = () => {
  const { t } = useTranslation("translation");

  return (
    <div>
      <Header />
      <div className="container mx-auto">
        <h1>hello</h1>
        <Button>asd</Button>
      </div>
      <p className="text-2xl">
        {t("title")}Click on the Vite and React logos to learn more
      </p>
    </div>
  );
};

export default MainLayout;
