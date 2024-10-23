import React, { useState, useEffect, useContext } from "react";
import { Page, Card, Tabs, IndexTable, Button } from "@shopify/polaris";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Context } from "../../components/DataContext";
import './OnPageSeoAudit.css'
const OnPageSeoAudit = () => {
  const { data, setData } = useContext(Context);

  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState(0);
  const [auditData, setAuditData] = useState({
    home: [],
    products: [],
    collections: [],
    blogs: [],
    others: [],
  });

  const TABS = [
    { id: "home", content: "Home", badge: auditData.home.length },
    { id: "products", content: "Products", badge: auditData.products.length },
    { id: "collections", content: "Collections" },
    { id: "blogs", content: "Blogs", badge: auditData.blogs.length },
    { id: "others", content: "Others", badge: auditData.others.length },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/audit");
        const data = response.data;
        console.log(data, " onpage seo audit ");
        setAuditData({
          home: [{title:"Home" , pageUrl:"https://039190-ff.myshopify.com/" , handle:"HomePage"}] || [],
          products: data.products || [],
          collections: data.collections || [],
          blogs: data.blogs || [],
          others: data.pages || [],
        });
      } catch (error) {
        console.error("Failed to fetch audit data", error);
      }
    };
    fetchData();
  }, []);

  const handleTabChange = (selectedTabIndex) =>
    setSelectedTab(selectedTabIndex);

  function handleAuditClick(responseUrl) {
    let selectedUrl = "";
    data.map((urlData) => {
      if (urlData.urlName === responseUrl + "/") {
        return (selectedUrl = urlData);
      }
    });
    localStorage.setItem("clickedUrlData", JSON.stringify(selectedUrl));
    navigate("/SingleUrlSeoSummary");
  }

  const renderAuditTable = (sectionData) => {
    return (
      <IndexTable
        resourceName={{ singular: "audit", plural: "audits" }}
        itemCount={sectionData.length}
        headings={[
          { title: "Title" },
          { title: "Handle" },
          { title: "Actions" },
        ]}
        selectable={false}
      >
        {sectionData.map(({ id, title, handle, pageUrl }) => (
          <IndexTable.Row id={id} key={id}>
            <IndexTable.Cell>
              <Button onClick={() => handleAuditClick(pageUrl)} plain>
                {title}
              </Button>
            </IndexTable.Cell>
            <IndexTable.Cell>{handle}</IndexTable.Cell>
            <IndexTable.Cell>
              <Button primary>
                <a
                  style={{ textDecoration: "none", color: "white" }}
                  target="_Blank"
                  rel="noopener noreferrer"
                  href={pageUrl}
                  >
                  View
                </a>
              </Button>
            </IndexTable.Cell>
          </IndexTable.Row>
        ))}
      </IndexTable>
    );
  };
  function handleBack() {
    navigate("/SeoAuditMain/SeoAuditMain");
  }

  return (
    <div className="onPageSeoAuditMain" style={{padding:"0 3rem"}}>

    <Page
      backAction={{ content: "Products", onAction: handleBack }}
      title="On-page SEO Audit"
    >
      <Tabs tabs={TABS} selected={selectedTab} onSelect={handleTabChange}>
        <Card sectioned>
          {renderAuditTable(auditData[TABS[selectedTab].id])}
        </Card>
      </Tabs>
    </Page>
      </div>
  );
};

export default OnPageSeoAudit;
