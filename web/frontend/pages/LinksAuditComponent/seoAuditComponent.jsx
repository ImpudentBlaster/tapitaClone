import React, { useEffect, useState, useContext } from "react";
import { Card, Button, Text, Banner } from "@shopify/polaris";
import { Context } from "../../components/DataContext";
import "./auditComponent.css";
import { useNavigate } from "react-router-dom";

function SeoAuditComponent({ pageUrls, eachUrlData, loading ,error}) {
  console.log("SeoAuditComponent.jsx");
  const navigate = useNavigate();
  const { data, setData } = useContext(Context);
  console.log(eachUrlData, "each Url Data from seoAuditComponent");

  function handleAuditClick(responseUrl) {
    let selectedUrl = "";
    eachUrlData.map((urlData) => {
      if (urlData.urlName === responseUrl + "/") {
        return (selectedUrl = urlData);
      }
    });

    localStorage.setItem("clickedUrlData", JSON.stringify(selectedUrl));
    navigate("/SingleUrlSeoSummary");
  }
  useEffect(() => {
    if (eachUrlData) setData(eachUrlData);
  }, [eachUrlData]);
  return (
    <>
      <div className="seoAuditComponent-main">
        <Card>
          <p className="audit-component-heading">
            <Text variant="headingSm">Page Urls</Text>
          </p>
          <div className="urlmainbody">
            {/* <div className="audit-individual-urls">
            <p style={{ padding: "1.5rem 0" }}>
            https://039190-ff.myshopify.com
            </p>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <button
                className="custom-button"
                onClick={() => navigate("/SEOPageSummary" , {state:{url:"https://039190-ff.myshopify.com"}})}
              >
                Audit
                </button>
              <Button plain>Quick Fix</Button>
            </div>
            </div> */}
            
            {/* {error && (
              <Banner status="critical">Failed to load the data</Banner>
            )} */}
            {loading? (
              <Banner status="info">Loading Page Urls</Banner>
            ) : (
              pageUrls.map((responseUrls, index) => (
                <>
                  {" "}
                  <div key={index} className="audit-individual-urls">
                    <p style={{ padding: "1.5rem 0" }}>{responseUrls}</p>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <button
                      
                        onClick={() => {
                          handleAuditClick(responseUrls);
                        }}
                        className="custom-button"
                      >
                        Audit
                      </button>
                      <Button plain>Quick Fix</Button>
                    </div>
                  </div>
                </>
              ))
            )}
          </div>
        </Card>
      </div>
    </>
  );
}

export default SeoAuditComponent;
