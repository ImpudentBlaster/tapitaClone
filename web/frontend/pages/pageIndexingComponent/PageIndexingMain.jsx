import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../components/DataContext";
import { Card, Page, Text, Spinner } from "@shopify/polaris";
import axios from "axios";
import "./PageIndexingMain.css";
import { useNavigate } from "react-router-dom";
function PageIndexingMain() {
  const [siteUrls, setSiteUrls] = useState();
  const navigate = useNavigate();
  const [pageUrls, setPageUrls] = useState([]);
  function handleBackAction() {
    navigate("/GoogleSearchConsole/Google_Search_Console");
  }
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/audit");
        const data = response.data;
        console.log(data, " onpage seo audit ");
        const temp = {
          home:
            [
              {
                title: "Home",
                pageUrl: "https://039190-ff.myshopify.com/",
                handle: "HomePage",
              },
            ] || [],
          products: data.products || [],
          collections: data.collections || [],
          blogs: data.blogs || [],
          others: data.pages || [],
        };

        setSiteUrls(temp);
      } catch (error) {
        console.error("Failed to fetch audit data", error);
      }
    };
    fetchData();
  }, []);
  return (
    <div className="pageIndexingMain">
      <Page
        title="Page Indexing Status"
        backAction={{ content: "options", onAction: handleBackAction }}
      >
        <Card>
          {siteUrls ? (
            <div
              style={{
                padding: "0.75rem",
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
              }}
            >
              <div className="pageIndexing-rows pageIndexing-heading">
                <div>CATEGORY</div>
                <div>PAGE URL</div>
                <div>PAGE INDEXED</div>
              </div>
              <div className="pageIndexing-rows pageIndexing-home">
                <div>Home</div>
                <div>
                  {siteUrls
                    ? siteUrls.home.map((item) => (
                        <a
                          rel="noopener noreferrer"
                          href={item.pageUrl}
                          target="_Blank"
                        >
                          {item.pageUrl}
                        </a>
                      ))
                    : ""}
                </div>
                <div>
                  {siteUrls
                    ? siteUrls.home.map((item) =>
                        item.pageIsIndexed ? (
                          <p className="true">YES</p>
                        ) : (
                          <p className="false">NO</p>
                        )
                      )
                    : ""}
                </div>
              </div>
              <div className="pageIndexing-rows">
                <div>Products</div>
                <div>
                  {siteUrls
                    ? siteUrls.products.map((item) => (
                        <a
                          rel="noopener noreferrer"
                          href={item.pageUrl}
                          target="_Blank"
                        >
                          {item.pageUrl}
                        </a>
                      ))
                    : ""}
                </div>
                <div>
                  {siteUrls
                    ? siteUrls.products.map((item) =>
                        item.pageIsIndexed ? (
                          <p className="true">YES</p>
                        ) : (
                          <p className="false">NO</p>
                        )
                      )
                    : ""}
                </div>
              </div>
              <div className="pageIndexing-rows">
                <div>Blogs</div>
                <div>
                  {siteUrls
                    ? siteUrls.blogs.map((item) => (
                        <a
                          rel="noopener noreferrer"
                          href={item.pageUrl}
                          target="_Blank"
                        >
                          {item.pageUrl}
                        </a>
                      ))
                    : ""}
                </div>
                <div>
                  {siteUrls
                    ? siteUrls.blogs.map((item) =>
                        item.pageIsIndexed ? (
                          <p className="true">YES</p>
                        ) : (
                          <p className="false">NO</p>
                        )
                      )
                    : ""}
                </div>
              </div>
              <div className="pageIndexing-rows">
                <div>Collections</div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    textAlign: "center",
                  }}
                >
                  {siteUrls
                    ? siteUrls.collections.map((item) => (
                        <a
                          rel="noopener noreferrer"
                          href={item.pageUrl}
                          target="_Blank"
                        >
                          {item.pageUrl}
                        </a>
                      ))
                    : ""}
                </div>
                <div>
                  {siteUrls
                    ? siteUrls.collections.map((item) =>
                        item.pageIsIndexed ? (
                          <p className="true">YES</p>
                        ) : (
                          <p className="false">NO</p>
                        )
                      )
                    : ""}
                </div>
              </div>
              <div className="pageIndexing-rows">
                <div>Others</div>
                <div>
                  {siteUrls
                    ? siteUrls.others.map((item) => (
                        <a
                          rel="noopener noreferrer"
                          href={item.pageUrl}
                          target="_Blank"
                        >
                          {item.pageUrl}
                        </a>
                      ))
                    : ""}
                </div>
                <div>
                  {siteUrls
                    ? siteUrls.others.map((item) =>
                        item.pageIsIndexed ? (
                          <p className="true">YES</p>
                        ) : (
                          <p className="false">NO</p>
                        )
                      )
                    : ""}
                </div>
              </div>
            </div>
          ) : (
            <div
              style={{
                height: "10rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Spinner size="large" />
            </div>
          )}
        </Card>
      </Page>
    </div>
  );
}

export default PageIndexingMain;
