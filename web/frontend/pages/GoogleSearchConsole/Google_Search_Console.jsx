import './pagename.css'
import React, { useState, useCallback, useEffect } from "react";
import { Card, Page, Layout, TextContainer, Text, Button, Collapsible, List, Icon } from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";
import { useTranslation } from "react-i18next";
import { ChevronDownMinor, ChevronUpMinor } from '@shopify/polaris-icons';
import SearchPerformance from './SearchPerformance';
import Sitemaps from './Sitemaps';
import Connect_disable from './Connect_disable';
import ConnectGoogle from './ConnectGoogle';



const Google_Search_Console = () => {

  const { t } = useTranslation();
  const [accordionOpen, setAccordionOpen] = useState(false);

  const handleToggleAccordion = useCallback(() => setAccordionOpen((open) => !open), []);



  return (
    <>
      <ConnectGoogle />
      <Connect_disable />
      <Sitemaps />
      <SearchPerformance />

      <Page>
        <TitleBar title={t("Google Search Console")} />

        <Layout>
          <Layout.Section>
            <div className="faq-outer_top">
              <Card title="FAQs" sectioned>

                <div className="faq-top">

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginLeft: '-10px', fontSize: '15px', fontWeight: '350' }}>

                    <div
                      onClick={handleToggleAccordion}
                      ariaExpanded={accordionOpen}
                      ariaControls="seoDetailsAccordion"
                      plain
                      fullWidth
                      textAlign="left"
                      className='faq_accordion'
                    >
                      <p style={{ fontWeight: "550", marginLeft: "10px" , fontSize:"1rem" }}> What do the statuses in Page Indexing mean?</p>
                      <div style={{ fontWeight: "550", marginRight: "10px" }}>
                        {accordionOpen ? <Icon source={ChevronUpMinor} /> : <Icon source={ChevronDownMinor} />}
                      </div>
                    </div>


                  </div>
                  <Collapsible
                    open={accordionOpen}
                    id="seoDetailsAccordion"
                    transition={{ duration: '150ms', timingFunction: 'ease-in-out' }}
                  >
                    <br />
                    <Text>They are the statuses of your page indexing on Google. Specifically:</Text>
                    <Text><b>- Checking:</b> these pages are being scanned to check for indexing status (Indexed or Not indexed)</Text>
                    <Text><b> - Indexed:</b> these pages are indexed on Google</Text>
                    <Text><b> - Not indexed:</b> these pages are not indexed on Google</Text>
                    <Text> <b>- Request sent: </b>you have requested Google to index theses pages. They are being queued in a waiting line to be indexed. Please note that there is no guarantee for these pages to be indexed. The final decision will always up to Google to make.</Text>

                  </Collapsible>


                </div>
              </Card>

            </div>
          </Layout.Section>
        </Layout>
      </Page>

    </>
  )
}

export default Google_Search_Console