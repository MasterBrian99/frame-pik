import { useMemo } from "react";
import { Button } from "./components/ui/button";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useTranslation } from "react-i18next";
function App() {
  const queryClient = useMemo(() => new QueryClient({}), []);
  const { t } = useTranslation("translation");
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <div>
          <h1>hello</h1>
          <Button>asd</Button>
        </div>
        <p className="text-2xl">
          {t("features")}Click on the Vite and React logos to learn more
        </p>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </>
  );
}

export default App;
