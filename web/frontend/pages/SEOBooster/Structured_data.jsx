// import React, { useState } from "react";
// import { Banner, CalloutCard, Page, LegacyCard, Grid, Stack, Button, Divider } from "@shopify/polaris";
// import './Structured_data.css';
// import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation

// const calloutCards = [
//     {
//         title: "Local business",
//         illustration: "https://d25xupuijjr19x.cloudfront.net/assets/business.88d77363.png",
//         content: "Go to config",
//         url: "/LocalBusinessForm",
//         description: "With Local Business structured data, you can tell Google about your business hours, different departments within a business, reviews for your business, and more.",
//     },
//     {
//         title: "Organization",
//         illustration: "https://d25xupuijjr19x.cloudfront.net/assets/product.8a90433f.png",
//         content: "Go to config",
//         url: "#",
//         description: "You can use organization structured data to let Google know about your organization's administrative details, for example, logo, address, contact information, and business identifiers.",
//     },
//     {
//         title: "Breadcrumb",
//         illustration: "https://d25xupuijjr19x.cloudfront.net/assets/breadcrumb.e8a1d2f3.png",
//         url: "#",
//         description: "Google Search uses breadcrumb markup in the body of a web page to categorize the information from the page in search results. While each search may return the same web page, the breadcrumb categorizes the content within the context of the Google Search query.",
//     },
//     {
//         title: "Video",
//         illustration: "https://d25xupuijjr19x.cloudfront.net/assets/video.0c69d1ca.png",
//         content: "Upgrade",
//         url: "#",
//         description: "Google Search is an entry point for people to discover and watch videos. While Google tries to automatically understand details about your video, you can explicitly provide information, such as the description, thumbnail URL, upload date, and duration, by marking up your video with Video schema. Videos can appear in Google Search results, video search results, Google Images, and Google Discover.",
//     },
//     {
//         title: "Product",
//         illustration: "https://d25xupuijjr19x.cloudfront.net/assets/product.8a90433f.png",
//         content: "Go to config",
//         url: "/ProductShippingForm",
//         description: "When you add Product structured data, Google search results (including Google Images and Google Lens) can show product information in richer ways. Users can see price, availability, review ratings, shipping information, and more right in search results.",
//     },
//     {
//         title: "Article",
//         illustration: "https://d25xupuijjr19x.cloudfront.net/assets/article.d7e9b992.png",
//         url: "#",
//         description: "Adding Article structured data to your news, blog, and sports article pages can help Google understand more about the web page and show better title text, images, and date information for the article in search results on Google Search and other properties (for example, Google News and the Google Assistant).",
//     },
//     {
//         title: "Search box & Site name",
//         illustration: "https://d25xupuijjr19x.cloudfront.net/assets/link.58def06e.png",
//         content: "Go to config",
//         url: "#",
//         description: "A search box is a quick way for people to search your site or app immediately on the search results page. The search box implements real-time suggestions and other features.",
//     },
//     {
//         title: "Recipe",
//         illustration: "https://d25xupuijjr19x.cloudfront.net/assets/recipe.541a8fbd.png",
//         content: "Upgrade",
//         url: "#",
//         description: "Help users find your recipe content by telling Google about your recipe with structured data. When you provide information such as reviewer ratings, cooking and preparation times, and nutrition information, Google can better understand your recipe and present it to users in interesting ways. Recipes can appear in Google Search results and Google Images.",
//     },
// ];

// export default function StructuredDataPage() {
//     const navigate = useNavigate(); // Initialize useNavigate hook

//     const handleBack = () => {
//         navigate("/SEOBooster/SEO_Booster"); // Navigate back to SEO_Booster page
//     };

//     const navigatemyHandle = (url) => {
//         if (url) {
//             navigate(url); // Dynamically navigate to the URL
//         } else {
//             console.log("URL not found");
//         }
//     };

//     return (
//         <div style={{padding:"0 4rem"}}>

//         <Page title="Structured data/Google schemas/rich snippets/JSON-LD" backAction={{ content: 'Products', onAction: handleBack }}>
//             <div className="banner_container">
//                 <Banner title="You need to enable this settings first" onDismiss={() => { }}>
//                     <div className="warning_container">
//                         <p>Please go to Theme Settings and enable Tapita SEO & Speed</p>
//                     </div>
//                     <div className="enable_button">
//                         <Button>Enable</Button>
//                     </div>
//                 </Banner>
//             </div>
//             <div className="grid_container">
//                 <Grid>
//                     {calloutCards.map((card, index) => (
//                         <Grid.Cell key={index} columnSpan={{ xs: 12, sm: 6, md: 6, lg: 6 }}>
//                             <LegacyCard sectioned>
//                                 <Stack vertical spacing="tight">
//                                     <Stack distribution="equalSpacing" alignment="center">
//                                         <h2 className="custom-heading">{card.title}</h2>
//                                         <img
//                                             alt={card.title}
//                                             src={card.illustration}
//                                             style={{ width: '40px', height: '40px' }}
//                                         />
//                                     </Stack>
//                                     <DescriptionWithToggle description={card.description} />
//                                     <Divider borderColor="border" style={{ borderWidth: '10px' }} />
//                                     {card.content && (
//                                         <Button onClick={() => navigatemyHandle(card.url)}>
//                                             {card.content}
//                                         </Button>
//                                     )}
//                                 </Stack>
//                             </LegacyCard>
//                         </Grid.Cell>
//                     ))}
//                 </Grid>
//             </div>
//         </Page>
//                     </div>
//     );
// }
// // Component to handle description truncation and toggle
// const DescriptionWithToggle = ({ description }) => {
//     const [isExpanded, setIsExpanded] = useState(false);

//     const charLimit = 154;
//     const wordLimit = 24;

//     // Check if description exceeds the character or word limit
//     const isTruncated = description.length > charLimit || description.split(" ").length > wordLimit;

//     // Truncate description if necessary
//     const truncatedDescription = isTruncated
//     ? truncateText(description, charLimit, wordLimit)
//     : description;

//     const toggleExpand = () => setIsExpanded(!isExpanded);

//     return (
//         <div>
//             <p>{isExpanded ? description : truncatedDescription}</p>
//             {isTruncated && (
//                 <span style={{ color: "blue", cursor: "pointer" }} onClick={toggleExpand}>
//                     {isExpanded ? "🔽" : "🔼"}
//                 </span>
//             )}
//         </div>
//     );
// };

// // Function to truncate text based on both character and word limits
// const truncateText = (text, charLimit, wordLimit) => {
//     const words = text.split(" ");

//     // Truncate based on character limit
//     if (text.length > charLimit) {
//         return text.substring(0, charLimit) + "...";
//     }
//     // Truncate based on word limit
//     else if (words.length > wordLimit) {
//         return words.slice(0, wordLimit).join(" ") + "...";
//     }

//     return text; // If no truncation is needed
// };

// structured data

import React, { useEffect, useState } from "react";
import {
  Banner,
  Page,
  LegacyCard,
  Grid,
  Stack,
  Button,
  Divider,
  Checkbox,
  Spinner,
} from "@shopify/polaris";
import "./ProductShippingForm.css";
import { useNavigate } from "react-router-dom";

const calloutCards = [
  {
    title: "Collections",
    illustration:
      "https://d25xupuijjr19x.cloudfront.net/assets/business.88d77363.png",
    url: "/LocalBusinessForm",
    schemaKey: "collection_isEnabled",
    description:
      "With Local Business structured data, you can tell Google about your business hours, different departments within a business, reviews for your business, and more.",
  },
  {
    title: "Organization",
    illustration:
      "https://d25xupuijjr19x.cloudfront.net/assets/product.8a90433f.png",
    url: "#",
    schemaKey: "organization_isEnabled",
    description:
      "You can use organization structured data to let Google know about your organization's administrative details, for example, logo, address, contact information, and business identifiers.",
  },
  {
    title: "Breadcrumb",
    illustration:
      "https://d25xupuijjr19x.cloudfront.net/assets/breadcrumb.e8a1d2f3.png",
    url: "#",
    schemaKey: "breadcrumb_isEnabled",
    description:
      "Google Search uses breadcrumb markup in the body of a web page to categorize the information from the page in search results.",
  },
  {
    title: "Video",
    illustration:
      "https://d25xupuijjr19x.cloudfront.net/assets/video.0c69d1ca.png",
    url: "#",
    schemaKey: "video_isEnabled",
    description:
      "Google Search is an entry point for people to discover and watch videos. Videos can appear in Google Search results, video search results, Google Images, and Google Discover.",
  },
  {
    title: "Product",
    illustration:
      "https://d25xupuijjr19x.cloudfront.net/assets/product.8a90433f.png",
    url: "/ProductShippingForm",
    schemaKey: "isEnabled",
    description:
      "When you add Product structured data, Google search results can show product information in richer ways.",
  },
  {
    title: "Article",
    illustration:
      "https://d25xupuijjr19x.cloudfront.net/assets/article.d7e9b992.png",
    url: "#",
    schemaKey: "article_isEnabled",
    description:
      "Adding Article structured data can help Google understand more about the web page and show better title text, images, and date information.",
  },
  {
    title: "Search box & Site name",
    illustration:
      "https://d25xupuijjr19x.cloudfront.net/assets/link.58def06e.png",
    url: "#",
    schemaKey: "searchbox_isEnabled",
    description:
      "A search box is a quick way for people to search your site or app immediately on the search results page.",
  },
  {
    title: "Recipe",
    illustration:
      "https://d25xupuijjr19x.cloudfront.net/assets/recipe.541a8fbd.png",
    url: "#",
    schemaKey: "recipe_isEnabled",
    description:
      "Help users find your recipe content by telling Google about your recipe with structured data.",
  },
];

export default function StructuredDataPage() {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/SEO_Booster");
  };

  const navigatemyHanlde = (url) => {
    if (url) {
      navigate(url);
    } else {
      console.log("URL not found");
    }
  };

  return (
    <Page
      title="Structured data/Google schemas/rich snippets/JSON-LD"
      backAction={{ content: "Products", onAction: handleBack }}
    >
      <div className="banner_container">
        <Banner
          title="You need to enable this settings first"
          onDismiss={() => {}}
        >
          <div className="warning_container">
            <p>Please go to Theme Settings and enable Tapita SEO & Speed</p>
          </div>
          <div className="enable_button">
            <Button>Enable</Button>
          </div>
        </Banner>
      </div>
      <div className="grid_container">
        <Grid>
          {calloutCards.map((card, index) => (
            <Grid.Cell key={index} columnSpan={{ xs: 12, sm: 6, md: 6, lg: 6 }}>
              <LegacyCard sectioned>
                <Stack vertical spacing="tight">
                  <Stack distribution="equalSpacing" alignment="center">
                    <h2 className="custom-heading">{card.title}</h2>
                    <img
                      alt={card.title}
                      src={card.illustration}
                      style={{ width: "40px", height: "40px" }}
                    />
                  </Stack>
                  <DescriptionWithToggle description={card.description} />
                  <Divider
                    borderColor="border"
                    style={{ borderWidth: "10px" }}
                  />
                  <ToggleConfigButton card={card} navigate={navigatemyHanlde} />
                </Stack>
              </LegacyCard>
            </Grid.Cell>
          ))}
        </Grid>
      </div>
    </Page>
  );
}

const DescriptionWithToggle = ({ description }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const charLimit = 154;
  const wordLimit = 24;

  const isTruncated =
    description.length > charLimit || description.split(" ").length > wordLimit;

  const truncatedDescription = isTruncated
    ? truncateText(description, charLimit, wordLimit)
    : description;

  const toggleExpand = () => setIsExpanded(!isExpanded);

  return (
    <div>
      <p>{isExpanded ? description : truncatedDescription}</p>
      {isTruncated && (
        <Button plain onClick={toggleExpand}>
          {isExpanded ? "🔽" : "🔼"}
        </Button>
      )}
    </div>
  );
};

const truncateText = (text, charLimit, wordLimit) => {
  const words = text.split(" ");

  if (text.length > charLimit) {
    return text.substring(0, charLimit) + "...";
  } else if (words.length > wordLimit) {
    return words.slice(0, wordLimit).join(" ") + "...";
  }

  return text;
};

const ToggleConfigButton = ({ card, navigate }) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [isEnabled_ls, setIsEnabled_ls] = useState(false);
  const [shopName, setShopName] = useState(null); // State to store the shop name
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  // Fetch shop name from URL and check localStorage for saved state on component mount
  useEffect(() => {
    // const urlParams = new URLSearchParams(window.location.search);
    // const extractedShopName = urlParams.get("shop");
    // console.log(urlParams , "urlParams")
    const currentUrl = window.location.href;
    console.log(currentUrl, "currentUrl");

    const urlParams = new URLSearchParams(window.location.search);

    // Extract the 'shop' parameter from the URL
    const extractedShopName = urlParams.get("shop");
    if (extractedShopName) {
      setShopName(extractedShopName);
      fetchEnabledState(extractedShopName);
      fetchEnabledState_ls(extractedShopName);
    } else {
      console.error("Failed to extract shop name from URL.");
      setLoading(false);
    }
  }, []); // Empty dependency array ensures this runs only once when the component mounts

  // Fetch the saved state from the API
  const fetchEnabledState = async (shopName) => {
    try {
      const response = await fetch(
        `https://server-page-xo9v.onrender.com/check-state/${shopName}`
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setIsEnabled(data.shop[card.schemaKey] === "true");
    } catch (error) {
      console.error("Failed to fetch the state:", error);
      setError(error.message);
    } finally {
      setLoading(false); // Set loading to false after fetching
    }
  };

  // Fetch the saved state from localStorage
  const fetchEnabledState_ls = (shopName) => {
    const savedState = localStorage.getItem(
      `isenabled-${shopName}-${card.schemaKey}`
    ); // Get state using the unique shop key
    if (savedState !== null) {
      setIsEnabled_ls(JSON.parse(savedState)); // If found, parse and set the isEnabled state
    }
  };

  // Handle toggle action and save the new state to both API and localStorage
  const handleToggle = async () => {
    try {
      const newEnabledState = !isEnabled;
      setIsEnabled(newEnabledState);
      console.log(shopName);
      const response = await fetch(
        `https://server-page-xo9v.onrender.com/update-state/${shopName}/${card.schemaKey}/${newEnabledState}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("response", response);

      if (!response.ok) {
        throw new Error("Failed to update state on server");
      }

      localStorage.setItem(
        `isenabled-${shopName}-${card.schemaKey}`,
        JSON.stringify(newEnabledState)
      ); // Save new state to localStorage
    } catch (error) {
      console.error("Error updating state:", error);
    }
  };

  if (loading) {
    return <Spinner size="small" />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <Stack distribution="equalSpacing" alignment="center">
      <Checkbox
        checked={isEnabled}
        onChange={handleToggle}
        label="Enable access"
      />
      {card.url && card.content && (
        <Button onClick={() => navigate(card.url)} disabled={!isEnabled}>
          {card.content}
        </Button>
      )}
    </Stack>
  );
};
