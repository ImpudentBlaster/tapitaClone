import React, { useEffect, useState } from "react";
import { XMLParser } from "fast-xml-parser";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import SEOPageSummary from "../SeoPageSummary/SEOPageSummary";
import SeoAuditComponent from "../LinksAuditComponent/seoAuditComponent";
import { FaRegSquarePlus } from "react-icons/fa6";
import OnPageSeoAudit from "./../OnPageSeoAudit/OnPageSeoAudit";
import HomeOnPageSeoAudit from "./HomeOnPageSeoAudit";
import { TitleBar } from "@shopify/app-bridge-react";
import { Banner } from "@shopify/polaris";
import SeoOptimizationMain from "../SeoOptimizationComponent/SeoOptimizationMain";

function SeoAuditMain() {
  console.log("seoAuditMain.jsx");
  const [score, setScore] = useState(0);
  const [pageUrlLoaded, setPageUrlLoaded] = useState(false);
  const [urls, setUrls] = useState([]);
  const [pageUrls, setPageUrls] = useState([]);
  const [error, setError] = useState(false);
  const [eachUrlData, setEachUrlData] = useState();
  const [spinnerLoading, setSpinnerLoading] = useState(true);
  const [linksAuditLoading, setLinksAuditLoading] = useState(true);
  const [seoPageSummaryLoading, setSeoPageSummaryLoading] = useState(true);
  // const [linksAuditError, setLinksAuditError] = useState(false);
  // const [seoPageSummaryError, setSeoPageSummaryError] = useState(false);

  const [values, setValues] = useState({
    good: {},
    critical: {},
    improvement: {},
  });

  const parentSitemapUrl = "https://039190-ff.myshopify.com/sitemap.xml";

  async function getSiteMapUrl() {
    setLinksAuditLoading(true);
    try {
      const parser = new XMLParser();
      const response = await axios.get(parentSitemapUrl);
      const result = parser.parse(response.data);

      const tempUrls = [];
      console.log(result, "Result");
      if (result && result.sitemapindex && result.sitemapindex.sitemap) {
        result.sitemapindex.sitemap.forEach((item) => {
          tempUrls.push(item.loc);
        });
      }

      setUrls(tempUrls);
      console.log("Child sitemap URLs fetched:", tempUrls);

      await getExactPages(tempUrls);
    } catch (error) {
      // setLinksAuditError(true);
      setError(true)
      setLinksAuditLoading(false);
      // setSeoPageSummaryError(true);
      setSeoPageSummaryLoading(false);
      setSpinnerLoading(false);
      console.error("Error fetching sitemap URLs:", error);
    }
  }

  async function getExactPages(sitemapUrls) {
    try {
      if (!error) {
        const parser = new XMLParser();
        const tempPageUrls = [];

        async function fetchSitemapPages(sitemapUrl) {
          const response = await axios.get(sitemapUrl);
          const result = parser.parse(response.data);
          console.log(result);
          if (result.urlset) {
            const urls = Array.isArray(result.urlset.url)
              ? result.urlset.url
              : [result.urlset.url];
            urls.forEach((item) => {
              tempPageUrls.push(item.loc);
            });
          }
          if (result.sitemapindex && result.sitemapindex.sitemap) {
            for (const item of result.sitemapindex.sitemap) {
              await fetchSitemapPages(item.loc);
            }
          }
        }
        for (const sitemapUrl of sitemapUrls) {
          await fetchSitemapPages(sitemapUrl);
        }

        setPageUrls(tempPageUrls);
        setPageUrlLoaded(true);
        setLinksAuditLoading(false);
        console.log("Page URLs fetched:", tempPageUrls);
      } else {
        setLinksAuditLoading(false);
        setError(true)
        // setLinksAuditError(true);
        // setSeoPageSummaryError(true);
      }
    } catch (error) {
      setLinksAuditLoading(false);
      setError(true)
      // setLinksAuditError(true);
      // setSeoPageSummaryError(true);
      console.error("Error fetching page URLs:", error);
    }
  }

  async function fetchData() {
    console.log("fetchData");
    setSpinnerLoading(true);
    setSeoPageSummaryLoading(true);
    try {
      const promises = pageUrls.map((url) => getData(url));
      const results = await Promise.all(promises);
      console.log(results, "result of fetching all the data");
      if (results.length < pageUrls.length) {
        setValues({
          good:{} , critical:{} , improvement:{}
        })
        setScore(0)
        setError(true)
        setSpinnerLoading(false);
        setSeoPageSummaryLoading(false);
        return;
      } else {
        console.log(results.length , pageUrls.length , "length of result and pageUrl")
        let totalScore = 0;
        let combinedCritical = {};
        let combinedGood = {};
        let combinedImprovement = {};
        let tempUrlData = [];

        results.forEach((res) => {
          totalScore += res.score;
          tempUrlData.push(res.urlData);
          Object.keys(res.critical).forEach((key) => {
            combinedCritical[key] =
              (combinedCritical[key] || 0) + res.critical[key];
          });

          Object.keys(res.good).forEach((key) => {
            combinedGood[key] = (combinedGood[key] || 0) + res.good[key];
          });

          Object.keys(res.improvement).forEach((key) => {
            combinedImprovement[key] =
              (combinedImprovement[key] || 0) + res.improvement[key];
          });
        });

        setEachUrlData(tempUrlData);
        setScore(totalScore);
        setValues({
          critical: combinedCritical,
          good: combinedGood,
          improvement: combinedImprovement,
        });
        setSpinnerLoading(false);
        setSeoPageSummaryLoading(false);
        // setSeoPageSummaryError(false);
        setError(false)
      }
    } catch (error) {
      // setSeoPageSummaryError(true);
      setError(true)
      setSeoPageSummaryLoading(false);
      console.error("Error in fetchData:", error);
    }
  }

  useEffect(() => {
    if (values)
      sessionStorage.setItem("pageSummaryData", JSON.stringify(values));
  }, [values]);

  async function getData(url) {
    try {
      const response = await axios.get(
        `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${url}/&key=AIzaSyDhgPizmnR_MJhYGZhOoSklYRA4cKXrCFg&category=performance&category=seo&category=accessibility`
      );
      console.log(response.data, "Response.data");
      const urlData = {
        urlName: response.data.id,
        lighthouseResult: response.data.lighthouseResult,
      };
      const { audits } = response.data.lighthouseResult;
      const { auditRefs } = response.data.lighthouseResult.categories.seo;
      const temp = auditRefs.map((item) => audits[item.id]);

      const score = response.data.lighthouseResult.categories.seo.score;
      const Tcritical = {};
      const Tgood = {};
      const Timprovement = {};

      temp.forEach((audit) => {
        if (audit.score !== null) {
          if (audit.score < 0.5) {
            Tcritical[audit.id] = Tcritical[audit.id]
              ? Tcritical[audit.id] + 1
              : 1;
          } else if (audit.score >= 0.9) {
            Tgood[audit.id] = Tgood[audit.id] ? Tgood[audit.id] + 1 : 1;
          } else {
            Timprovement[audit.id] = Timprovement[audit.id]
              ? Timprovement[audit.id] + 1
              : 1;
          }
        }
      });

      return {
        urlData,
        score,
        critical: Tcritical,
        good: Tgood,
        improvement: Timprovement,
      };
    } catch (error) {
      console.error("Error fetching data for URL:", error);
      return {
        score: 0,
        critical: {},
        good: {},
        improvement: {},
      };
    }
  }

  useEffect(() => {
    getSiteMapUrl();
  }, []);

  useEffect(() => {
    if (pageUrlLoaded) {
      fetchData();
    }
  }, [pageUrlLoaded]);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
     {error && <div style={{padding:"0 4rem"}}>
      <Banner status="critical">Failed to load the data</Banner>
      </div>}
      <SEOPageSummary
        totalPages={pageUrls}
        seoScore={score}
        pageSummaryData={values}
        spinnerLoading={spinnerLoading}
        seoPageSummaryLoading={seoPageSummaryLoading}
        // error={seoPageSummaryError}
      />
      <SeoAuditComponent
        loading={linksAuditLoading}
        eachUrlData={eachUrlData}
        pageUrls={pageUrls}
        // error={linksAuditError}
      />
      <HomeOnPageSeoAudit totalPages={pageUrls} />
      <SeoOptimizationMain/>
    </div>
  );
}

export default SeoAuditMain;