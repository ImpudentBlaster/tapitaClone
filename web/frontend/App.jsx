import { BrowserRouter } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { NavMenu } from "@shopify/app-bridge-react";
import Routes from "./Routes";
import { ContextProvider } from "./components/DataContext";
import { Link } from "react-router-dom";

import { QueryProvider, PolarisProvider } from "./components";

export default function App() {

  const pages = import.meta.glob("./pages/**/!(*.test.[jt]sx)*.([jt]sx)", {
    eager: true,
  });
  const { t } = useTranslation();

  return (
    <PolarisProvider>
      <BrowserRouter>
        <QueryProvider>
          <ContextProvider>
            <NavMenu  >
              <Link to="/" rel="home" />
              <Link to="/SeoAuditMain/SeoAuditMain">SEO Audit</Link>
              <Link to="/SEOBooster/SEO_Booster">SEO Booster</Link>
              <Link to="/GoogleSearchConsole/Google_Search_Console">
                Google Search Console
              </Link>
              <Link to='/pagination'>Pagination</Link>
            </NavMenu>
            <Routes pages={pages} />
          </ContextProvider>
        </QueryProvider>
      </BrowserRouter>
    </PolarisProvider>
  );
}
