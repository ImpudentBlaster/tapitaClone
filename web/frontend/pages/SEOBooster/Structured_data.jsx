import React, { useState } from "react";
import { Banner, CalloutCard, Page, LegacyCard, Grid, Stack, Button, Divider } from "@shopify/polaris";
import './Structured_data.css';
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation

const calloutCards = [
    {
        title: "Local business",
        illustration: "https://d25xupuijjr19x.cloudfront.net/assets/business.88d77363.png",
        content: "Go to config",
        url: "/LocalBusinessForm",
        description: "With Local Business structured data, you can tell Google about your business hours, different departments within a business, reviews for your business, and more.",
    },
    {
        title: "Organization",
        illustration: "https://d25xupuijjr19x.cloudfront.net/assets/product.8a90433f.png",
        content: "Go to config",
        url: "#",
        description: "You can use organization structured data to let Google know about your organization's administrative details, for example, logo, address, contact information, and business identifiers.",
    },
    {
        title: "Breadcrumb",
        illustration: "https://d25xupuijjr19x.cloudfront.net/assets/breadcrumb.e8a1d2f3.png",
        url: "#",
        description: "Google Search uses breadcrumb markup in the body of a web page to categorize the information from the page in search results. While each search may return the same web page, the breadcrumb categorizes the content within the context of the Google Search query.",
    },
    {
        title: "Video",
        illustration: "https://d25xupuijjr19x.cloudfront.net/assets/video.0c69d1ca.png",
        content: "Upgrade",
        url: "#",
        description: "Google Search is an entry point for people to discover and watch videos. While Google tries to automatically understand details about your video, you can explicitly provide information, such as the description, thumbnail URL, upload date, and duration, by marking up your video with Video schema. Videos can appear in Google Search results, video search results, Google Images, and Google Discover.",
    },
    {
        title: "Product",
        illustration: "https://d25xupuijjr19x.cloudfront.net/assets/product.8a90433f.png",
        content: "Go to config",
        url: "/ProductShippingForm",
        description: "When you add Product structured data, Google search results (including Google Images and Google Lens) can show product information in richer ways. Users can see price, availability, review ratings, shipping information, and more right in search results.",
    },
    {
        title: "Article",
        illustration: "https://d25xupuijjr19x.cloudfront.net/assets/article.d7e9b992.png",
        url: "#",
        description: "Adding Article structured data to your news, blog, and sports article pages can help Google understand more about the web page and show better title text, images, and date information for the article in search results on Google Search and other properties (for example, Google News and the Google Assistant).",
    },
    {
        title: "Search box & Site name",
        illustration: "https://d25xupuijjr19x.cloudfront.net/assets/link.58def06e.png",
        content: "Go to config",
        url: "#",
        description: "A search box is a quick way for people to search your site or app immediately on the search results page. The search box implements real-time suggestions and other features.",
    },
    {
        title: "Recipe",
        illustration: "https://d25xupuijjr19x.cloudfront.net/assets/recipe.541a8fbd.png",
        content: "Upgrade",
        url: "#",
        description: "Help users find your recipe content by telling Google about your recipe with structured data. When you provide information such as reviewer ratings, cooking and preparation times, and nutrition information, Google can better understand your recipe and present it to users in interesting ways. Recipes can appear in Google Search results and Google Images.",
    },
];

export default function StructuredDataPage() {
    const navigate = useNavigate(); // Initialize useNavigate hook

    const handleBack = () => {
        navigate("/SEOBooster/SEO_Booster"); // Navigate back to SEO_Booster page
    };

    const navigatemyHandle = (url) => {
        if (url) {
            navigate(url); // Dynamically navigate to the URL
        } else {
            console.log("URL not found");
        }
    };

    return (
        <div style={{padding:"0 4rem"}}>

        <Page title="Structured data/Google schemas/rich snippets/JSON-LD" backAction={{ content: 'Products', onAction: handleBack }}>
            <div className="banner_container">
                <Banner title="You need to enable this settings first" onDismiss={() => { }}>
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
                                            style={{ width: '40px', height: '40px' }}
                                        />
                                    </Stack>
                                    <DescriptionWithToggle description={card.description} />
                                    <Divider borderColor="border" style={{ borderWidth: '10px' }} />
                                    {card.content && (
                                        <Button onClick={() => navigatemyHandle(card.url)}>
                                            {card.content}
                                        </Button>
                                    )}
                                </Stack>
                            </LegacyCard>
                        </Grid.Cell>
                    ))}
                </Grid>
            </div>
        </Page>
                    </div>
    );
}
// Component to handle description truncation and toggle
const DescriptionWithToggle = ({ description }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    
    const charLimit = 154;
    const wordLimit = 24;
    
    // Check if description exceeds the character or word limit
    const isTruncated = description.length > charLimit || description.split(" ").length > wordLimit;
    
    // Truncate description if necessary
    const truncatedDescription = isTruncated
    ? truncateText(description, charLimit, wordLimit)
    : description;
    
    const toggleExpand = () => setIsExpanded(!isExpanded);
    
    return (
        <div>
            <p>{isExpanded ? description : truncatedDescription}</p>
            {isTruncated && (
                <span style={{ color: "blue", cursor: "pointer" }} onClick={toggleExpand}>
                    {isExpanded ? "🔽" : "🔼"}
                </span>
            )}
        </div>
    );
};

// Function to truncate text based on both character and word limits
const truncateText = (text, charLimit, wordLimit) => {
    const words = text.split(" ");
    
    // Truncate based on character limit
    if (text.length > charLimit) {
        return text.substring(0, charLimit) + "...";
    }
    // Truncate based on word limit
    else if (words.length > wordLimit) {
        return words.slice(0, wordLimit).join(" ") + "...";
    }
    
    return text; // If no truncation is needed
};