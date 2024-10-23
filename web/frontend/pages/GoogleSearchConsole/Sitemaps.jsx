import './pagename.css'

import React, { useState, useCallback, useEffect } from "react";
import { Card, Page, Layout, TextContainer, Text, Button, Collapsible, List, Icon } from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";
import { useTranslation } from "react-i18next";
import { ChevronDownMinor, ChevronUpMinor } from '@shopify/polaris-icons';

const Sitemaps = () => {
  return (
    <>

      <Page>
        <Layout>
          <Layout.Section>
            <div className="sitemap_outer_top">
              <div className="sitemap_top">
                <Card title="Sitemaps" sectioned>
                  <Text>A sitemap tells Google which pages and files you think are important in your site, and also provides valuable information about these files.</Text>
                  <button className='sitemap-btn'>upgrade</button>

                  {/* <Button varient='primary' className='srch-opt-btn'>connect</Button> */}
                </Card>

              </div>

              <div className="sitemap_top">
                <Card title="Page indexing" sectioned>
                  <Text>Monitor the indexing status of pages on your site to see which pages Google can find and index on your site, and learn about any indexing problems encountered.</Text>
                  <button className='sitemap-btn'>upgrade</button>

                  {/* <Button variant='primary' className='srch-opt-btn'>connect</Button> */}
                </Card>

              </div>
            </div>
          </Layout.Section>
        </Layout>
      </Page>

    </>
  )
}

export default Sitemaps