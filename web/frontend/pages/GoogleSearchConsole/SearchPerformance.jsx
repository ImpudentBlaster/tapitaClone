import './pagename.css'

import React, { useState, useCallback, useEffect } from "react";
import { Card, Page, Layout, TextContainer, Text, Button, Collapsible, List, Icon } from "@shopify/polaris";

const SearchPerformance = () => {

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>

      <Page>
        <Layout>
          <Layout.Section>
            <div className="searchoptmz_top">
              <Card title="Search performance" sectioned>
                <Text>The Search Performance report shows important metrics about how your site performs in Google Search results.</Text>
                {/* <button className='srch-opt-btn'>connect</button> */}
                <button className='srch-opt-btn' onClick={scrollToTop}>connect</button>

                {/* <Button variant='primary' className='srch-opt-btn'>connect</Button> */}
              </Card>

            </div>
          </Layout.Section>
        </Layout>
      </Page>

    </>
  )
}

export default SearchPerformance