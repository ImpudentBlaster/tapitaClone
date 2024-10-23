import './pagename.css'

import React, { useState, useCallback, useEffect } from "react";
import { Card, Page, Layout, TextContainer, Text, Button, Collapsible, List, Icon } from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";
import { useTranslation } from "react-i18next";
import { ChevronDownMinor, ChevronUpMinor } from '@shopify/polaris-icons';
import image from './image.png';

const Connect_disable = () => {
  return (
    <>
      <Page>
        <Layout>
          <Layout.Section>
            <div className="connect-disable_top">
              <Card title="Connect a Google Search Console property" sectioned>
                <div className="disable-inner-box">
                  <img src={image} alt="settings" width="50" height="50"></img>
                  <button className='connect-disable-btn'>connect</button>

                  {/* <Button variant='primary' className='srch-opt-btn'>connect</Button> */}

                </div>
                <Text>Connect an existig property or create a new property to get search and indexing data. Search Console tools and reports help you measure Your site's Search traffic and performance, fix issues, and make your site shine in Google Search results</Text>

              </Card>

            </div>
          </Layout.Section>
        </Layout>
      </Page>

    </>
  )
}

export default Connect_disable