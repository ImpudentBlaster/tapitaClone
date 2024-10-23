import { readFileSync } from "fs";
import express from "express";
import serveStatic from "serve-static";
import shopify from "./shopify.js";
import PrivacyWebhookHandlers from "./privacy.js";
import axios from "axios";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const app = express();
const PORT = parseInt(
  process.env.BACKEND_PORT || process.env.PORT || "3000",
  10
);
let TOKEN = ""; // Store the access token here
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Serve static files from the public directory
app.use(express.static(join(__dirname, "../public")));

// Test route to check server
app.get("/test", (req, res) => {
  res.send("test");
});

const STATIC_PATH =
  process.env.NODE_ENV === "production"
    ? `${process.cwd()}/frontend/dist`
    : `${process.cwd()}/frontend/`;

// Start authentication process
app.get(shopify.config.auth.path, (req, res) => {
  const shop = req.query.shop;
  if (!shop) {
    return res.status(400).send("Missing shop parameter during auth start");
  }
  return shopify.auth.begin({ shop })(req, res);
});

// Callback after authentication
app.get(
  shopify.config.auth.callbackPath,
  shopify.auth.callback(),
  async (req, res) => {
    const session = res.locals.shopify.session; // Access the session
    console.log("Session:", session);
    const accessToken = session.accessToken;
    console.log(`Access Token: ${accessToken}`);
    TOKEN = accessToken; 

    const shop = session.shop;
    const host = req.query.host;
    res.redirect(`/?shop=${shop}&host=${host}`);
  }
);


app.post(
  shopify.config.webhooks.path,
  shopify.processWebhooks({ webhookHandlers: PrivacyWebhookHandlers })
);

app.get("/api/token", shopify.validateAuthenticatedSession(), (req, res) => {
  const session = res.locals.shopify.session;
  console.log("Session in /api/token:", session);
  console.log(`Access Token from session: ${session.accessToken}`);
  res.status(200).json(session);
});
app.get("/api/audit/:pageName", (req, res) => {
  console.log(req.params);
});

const shopifyStore = 'https://039190-ff.myshopify.com'; // Replace with your actual store URL
const accessToken = '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'; // Replace with your actual access token

app.get("/api/audit", async (req, res) => {
  const arrayOfPages = ["products", "custom_collections", "blogs", "pages"];

  try {
    const promises = arrayOfPages.map((url) => getData(url));
    const result = await Promise.all(promises);
   console.log(result)
    const structuredResult = {
      products: result[0],
      collections: result[1],
      blogs: result[2],
      pages: result[3],
    };
    console.log(structuredResult.products[0].count,structuredResult.blogs[0].count,structuredResult.collections[0].count,structuredResult.pages[0].count,)
    const count = structuredResult.products[0].count+structuredResult.blogs[0].count+structuredResult.collections[0].count+structuredResult.pages[0].count
    res.send({...structuredResult , totalPages:count});
  } catch (error) {
    console.error("Error fetching pages data:", error);
    res.status(500).send("Failed to fetch data");
  }
});

async function getData(urlEndpoint) {
  try {
    const pagesResponse = await axios.get(
      `${shopifyStore}/admin/api/2024-10/${urlEndpoint}.json`,
      {
        headers: {
          "X-Shopify-Access-Token": accessToken,
          "Content-Type": "application/json",
        },
      }
    );

    pagesResponse.data[urlEndpoint].map((item) => {
      if (urlEndpoint === "custom_collections")
        console.log(`${shopifyStore}/collections/${item.handle}`);
      else {
        console.log(`${shopifyStore}/${urlEndpoint}/${item.handle}`);
      }
    });
    return pagesResponse.data[urlEndpoint].map((item) => {
      if (urlEndpoint === "custom_collections") {
        return {
          id: item.id,
          handle: item.handle,
          title: item.title,
          pageUrl: `${shopifyStore}/collections/${item.handle}`,
          count:pagesResponse.data[urlEndpoint].length
        };
      } else {
        return {
          id: item.id,
          handle: item.handle,
          title: item.title,
          pageUrl: `${shopifyStore}/${urlEndpoint}/${item.handle}`,
          count:pagesResponse.data[urlEndpoint].length
        };
      }
    });
  } catch (error) {
    console.error(`Error fetching data for ${urlEndpoint}:`, error);
    return [];
  }
}
  

// Middleware to validate session for API routes
app.use("/api/*", shopify.validateAuthenticatedSession());
app.use(express.json());
app.use(shopify.cspHeaders());

// Serve static files for the frontend
console.log(STATIC_PATH, "static path");
app.use(serveStatic(STATIC_PATH, { index: false }));

// Middleware for handling all other requests
app.use("/*", shopify.ensureInstalledOnShop(), async (req, res) => {
  const shop = req.query.shop;
  const host = req.query.host;

  if (!shop || !host) {
    console.error("Missing shop or host parameter in ensureInstalledOnShop");
    return res
      .status(400)
      .send("Missing shop or host parameter in ensureInstalledOnShop");
  }

  res
    .status(200)
    .set("Content-Type", "text/html")
    .send(
      readFileSync(join(STATIC_PATH, "index.html"))
        .toString()
        .replace("%VITE_SHOPIFY_API_KEY%", process.env.SHOPIFY_API_KEY || "")
    );
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
