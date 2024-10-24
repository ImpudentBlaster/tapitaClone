// import { readFileSync } from "fs";
// import express from "express";
// import serveStatic from "serve-static";
// import shopify from "./shopify.js";
// import PrivacyWebhookHandlers from "./privacy.js";
// import axios from "axios";
// import { fileURLToPath } from "url";
// import { dirname, join } from "path";

// const app = express();
// const PORT = parseInt(
//   process.env.BACKEND_PORT || process.env.PORT || "3000",
//   10
// );
// let TOKEN = ""; 
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);


// app.use(express.static(join(__dirname, "../public")));


// app.get("/test", (req, res) => {
//   res.send("test");
// });

// const STATIC_PATH =
//   process.env.NODE_ENV === "production"
//     ? `${process.cwd()}/frontend/dist`
//     : `${process.cwd()}/frontend/`;

// // Start authentication process
// app.get(shopify.config.auth.path, (req, res) => {
//   const shop = req.query.shop;
//   if (!shop) {
//     return res.status(400).send("Missing shop parameter during auth start");
//   }
//   return shopify.auth.begin({ shop })(req, res);
// });

// // Callback after authentication
// app.get(
//   shopify.config.auth.callbackPath,
//   shopify.auth.callback(),
//   async (req, res) => {
//     const session = res.locals.shopify.session; // Access the session
//     console.log("Session:", session);
//     const accessToken = session.accessToken;
//     console.log(`Access Token: ${accessToken}`);
//     TOKEN = accessToken; 

//     const shop = session.shop;
//     const host = req.query.host;
//     res.redirect(`/?shop=${shop}&host=${host}`);
//   }
// );


// app.post(
//   shopify.config.webhooks.path,
//   shopify.processWebhooks({ webhookHandlers: PrivacyWebhookHandlers })
// );

// app.get("/api/token", shopify.validateAuthenticatedSession(), (req, res) => {
//   const session = res.locals.shopify.session;
//   console.log("Session in /api/token:", session);
//   console.log(`Access Token from session: ${session.accessToken}`);
//   res.status(200).json(session);
// });
// app.get("/api/audit/:pageName", (req, res) => {
//   console.log(req.params);
// });

// const shopifyStore = 'https://039190-ff.myshopify.com'; // Replace with your actual store URL
// const accessToken = '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'; 

// app.get("/api/audit", async (req, res) => {
//   const arrayOfPages = ["products", "custom_collections", "blogs", "pages"];

//   try {
//     const promises = arrayOfPages.map((url) => getData(url));
//     const result = await Promise.all(promises);
//    console.log(result)
//     const structuredResult = {
//       products: result[0],
//       collections: result[1],
//       blogs: result[2],
//       pages: result[3],
//     };
//     console.log(structuredResult.products[0].count,structuredResult.blogs[0].count,structuredResult.collections[0].count,structuredResult.pages[0].count,)
//     const count = structuredResult.products[0].count+structuredResult.blogs[0].count+structuredResult.collections[0].count+structuredResult.pages[0].count
//     res.send({...structuredResult , totalPages:count});
//   } catch (error) {
//     console.error("Error fetching pages data:", error);
//     res.status(500).send("Failed to fetch data");
//   }
// });

// async function getData(urlEndpoint) {
//   try {
//     const pagesResponse = await axios.get(
//       `${shopifyStore}/admin/api/2024-10/${urlEndpoint}.json`,
//       {
//         headers: {
//           "X-Shopify-Access-Token": accessToken,
//           "Content-Type": "application/json",
//         },
//       }
//     );

//     pagesResponse.data[urlEndpoint].map((item) => {
//       if (urlEndpoint === "custom_collections")
//         console.log(`${shopifyStore}/collections/${item.handle}`);
//       else {
//         console.log(`${shopifyStore}/${urlEndpoint}/${item.handle}`);
//       }
//     });
//     return pagesResponse.data[urlEndpoint].map((item) => {
//       if (urlEndpoint === "custom_collections") {
//         return {
//           id: item.id,
//           handle: item.handle,
//           title: item.title,
//           pageUrl: `${shopifyStore}/collections/${item.handle}`,
//           count:pagesResponse.data[urlEndpoint].length
//         };
//       } else {
//         return {
//           id: item.id,
//           handle: item.handle,
//           title: item.title,
//           pageUrl: `${shopifyStore}/${urlEndpoint}/${item.handle}`,
//           count:pagesResponse.data[urlEndpoint].length
//         };
//       }
//     });
//   } catch (error) {
//     console.error(`Error fetching data for ${urlEndpoint}:`, error);
//     return [];
//   }
// }
  

// // Middleware to validate session for API routes
// app.use("/api/*", shopify.validateAuthenticatedSession());
// app.use(express.json());
// app.use(shopify.cspHeaders());

// // Serve static files for the frontend
// console.log(STATIC_PATH, "static path");
// app.use(serveStatic(STATIC_PATH, { index: false }));

// // Middleware for handling all other requests
// app.use("/*", shopify.ensureInstalledOnShop(), async (req, res) => {
//   const shop = req.query.shop;
//   const host = req.query.host;

//   if (!shop || !host) {
//     console.error("Missing shop or host parameter in ensureInstalledOnShop");
//     return res
//       .status(400)
//       .send("Missing shop or host parameter in ensureInstalledOnShop");
//   }

//   res
//     .status(200)
//     .set("Content-Type", "text/html")
//     .send(
//       readFileSync(join(STATIC_PATH, "index.html"))
//         .toString()
//         .replace("%VITE_SHOPIFY_API_KEY%", process.env.SHOPIFY_API_KEY || "")
//     );
// });

// // Start the server
// app.listen(PORT, () => {
//   console.log(`Server is running at http://localhost:${PORT}`);
// });






import { join } from "path";
import { readFileSync } from "fs";
import express from "express";
import serveStatic from "serve-static";
import sqlite3 from 'sqlite3';
import shopify from "./shopify.js";
import productCreator from "./product-creator.js";
import PrivacyWebhookHandlers from "./privacy.js";
import axios from "axios";
import cors from 'cors';
import cron from 'node-cron';
// const mongoose = require('mongoose');
import mongoose from "mongoose";
import { type } from "os";
// const MONGO_URI = '127.0.0.1:27017/scripttag';
// import shopSchema from "./shopSchema.js";
// const Shop = require('./shopSchema');
// const mongoose = require('mongoose');
// mongoose.connect("mongodb://127.0.0.1:27017/scripttag");
mongoose.connect("mongodb+srv://spuspam111:Sp123456@cluster0.0taaaup.mongodb.net/scripttag?retryWrites=true&w=majority");



// const connectDB = async () => {
//   try {
//     await mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
//     console.log('MongoDB connected successfully');
//   } catch (err) {
//     console.error('MongoDB connection error:', err);
//     process.exit(1);
//   }
// };

// connectDB();





// const { Shopify } = require('@shopify/shopify-api');


const shopifyStore = 'impudentblaster';
const accessToken = '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';
// const scriptUrl = 'https://developertechhub.com/custom.js';
// const scriptUrl = 'https://server-page-xo9v.onrender.com';
// const scriptUrl = "https://server-page-1.onrender.com/static/product-title-script.js";

// const scriptUrl = "https://server-page-xo9v.onrender.com/all-script.js";
// const scriptUrl = "https://server-page-xo9v.onrender.com/newproduct-script.js";
const scriptUrl = "https://server-page-xo9v.onrender.com/newschema-script.js";



const PORT = parseInt(
  process.env.BACKEND_PORT || process.env.PORT || "3000",
  10
);

const STATIC_PATH =
  process.env.NODE_ENV === "production"
    ? `${process.cwd()}/frontend/dist`
    : `${process.cwd()}/frontend/`;

const DB_PATH = `${process.cwd()}/database.sqlite`;

const app = express();

app.use(cors());



// API endpoint to retrieve and store shops and access tokens
// app.post('/api/shops', async (req, res) => {



const Shop = mongoose.model('Shop', new mongoose.Schema({
  shop: { type: String, required: true, unique: true },
  accessToken: { type: String, required: true },
  isEnabled: { type: String, default: "false" },
  collection_isEnabled: { type: String, default: "false" },
  article_isEnabled: { type: String, default: "false" },
  organization_isEnabled: { type: String, default: "false" },
  breadcrumb_isEnabled: { type: String, default: "false" },
  video_isEnabled: { type: String, default: "false" },
  searchbox_isEnabled: { type: String, default: "false" },
  recipe_isEnabled: { type: String, default: "false" },
}));


async function postdata(req, res) {

  const DB_PATH = `${process.cwd()}/database.sqlite`;

  const db = new sqlite3.Database(DB_PATH);

  db.all("SELECT shop, accessToken FROM shopify_sessions", async (err, rows) => {
    if (err) {
      console.log('Failed to retrieve store tokens from SQLite:', err);
      return;
    }

    try {
      // Iterate through each shop from SQLite
      for (const row of rows) {
        const existingShop = await Shop.findOne({ shop: row.shop });

        // If shop is not found in MongoDB, add it
        if (!existingShop) {
          const newShop = new Shop({
            shop: row.shop,
            accessToken: row.accessToken,
          });
          await newShop.save();
          res.status(200).send(`Stored new shop: ${row.shop}`);
        } else {
          res.status(200).send(`Shop ${row.shop} already exists in MongoDB`);
        }
      }
    } catch (error) {
      res.status(500).send('Error storing shops in MongoDB:', error);
    } finally {
      // Close the SQLite connection
      db.close();
      console.log('Closed SQLite connection');
    }
  });
}


app.post('/api/store', postdata);


// API endpoint to get all shops
app.get('/api/shops', async (req, res) => {
  try {
    const allShops = await Shop.find();
    res.status(200).json(allShops);
  } catch (error) {
    console.error('Error fetching shops:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});










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
      `https://039190-ff.myshopify.com/admin/api/2024-10/${urlEndpoint}.json`,
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
          pageUrl: `https://039190-ff.myshopify.com/collections/${item.handle}`,
          count:pagesResponse.data[urlEndpoint].length
        };
      } else {
        return {
          id: item.id,
          handle: item.handle,
          title: item.title,
          pageUrl: `https://039190-ff.myshopify.com/${urlEndpoint}/${item.handle}`,
          count:pagesResponse.data[urlEndpoint].length
        };
      }
    });
  } catch (error) {
    console.error(`Error fetching data for ${urlEndpoint}:`, error);
    return [];
  }
}
  









// Fetch store access tokens from the SQLite database
app.get('/api/stores/tokens', async (_req, res) => {
  const db = new sqlite3.Database(DB_PATH);

  db.all("SELECT shop, accessToken FROM shopify_sessions", [], (err, rows) => {
    if (err) {
      res.status(500).send({ error: 'Failed to retrieve store tokens' });
    } else {
      const storeTokens = rows.map(row => ({ store: row.shop, token: row.accessToken }));
      console.log(storeTokens);
      res.status(200).send(storeTokens);
    }
  });

  db.close();
});






// Automatically create or update script tags

async function createScriptTagsForAllStores() {
  const db = new sqlite3.Database(DB_PATH);

  db.all("SELECT shop, accessToken FROM shopify_sessions", [], async (err, rows) => {
    if (err) {
      console.error("Failed to retrieve store tokens:", err);
      return;
    }

    for (const row of rows) {
      const { shop, accessToken } = row;

      try {
        // Step 1: Check for existing script tags
        const existingResponse = await axios.get(
          `https://${shop}/admin/api/2024-10/script_tags.json`,
          {
            headers: {
              "X-Shopify-Access-Token": accessToken,
              "Content-Type": "application/json",
            },
          }
        );

        // Step 2: Normalize URLs to avoid duplicates
        const normalizedScriptUrl = new URL(scriptUrl).href;
        const scriptTagExists = existingResponse.data.script_tags.some(
          (tag) => new URL(tag.src).href === normalizedScriptUrl
        );

        if (!scriptTagExists) {
          // Step 3: Create the script tag if it doesn’t exist
          await axios.post(
            `https://${shop}/admin/api/2024-10/script_tags.json`,
            {
              script_tag: {
                event: "onload",
                src: scriptUrl,
              },
            },
            {
              headers: {
                "X-Shopify-Access-Token": accessToken,
                "Content-Type": "application/json",
              },
            }
          );

          console.log(`Script tag created for store ${shop}`);
        } else {
          console.log(`Script tag with the same URL already exists for store ${shop}`);
        }
      } catch (error) {
        console.error(`Error creating script tag for store ${shop}:`, error.message);
      }
    }

    db.close();
  });
}






// Schedule the function to run daily at midnight
// cron.schedule("0 0 * * *", () => {
//   console.log("Running scheduled task to create script tags for all stores");
//   createScriptTagsForAllStores();
// });


// cron.schedule("* * * * * *", () => {
//   console.log("Running scheduled task to create script tags for all stores every second");
//   createScriptTagsForAllStores();
//    postdata();
// });


// Manual endpoint for testing purposes
app.get('/api/create-script-tags', async (req, res) => {
  await createScriptTagsForAllStores();
  res.send("Script tags creation triggered manually.");
});








app.get('/admin/api/products/:handle', async (req, res) => {
  const { handle } = req.params;

  // Open the database connection
  const db = new sqlite3.Database(DB_PATH, sqlite3.OPEN_READONLY, (err) => {
    if (err) {
      console.error('Failed to connect to the database:', err.message);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  });

  // Retrieve the store name and access token from the database
  db.get('SELECT shop, accessToken FROM shopify_sessions LIMIT 1', async (err, row) => {
    if (err) {
      console.error('Failed to retrieve store tokens:', err.message);
      return res.status(500).json({ message: 'Internal Server Error' });
    }

    if (!row) {
      console.error('No store found in the database.');
      return res.status(404).json({ message: 'Store not found' });
    }

    const { shop, accessToken } = row;

    try {
      // Make API request to fetch product details by handle
      const response = await fetch(`https://${shop}/admin/api/2024-04/products.json?handle=${handle}`, {
        method: 'GET',
        headers: {
          'X-Shopify-Access-Token': accessToken,
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (response.ok) { // Check if the response was successful
        if (data.products.length > 0) {
          res.json(data.products[0]); // Return the first product
        } else {
          res.status(404).json({ message: 'Product not found' });
        }
      } else {
        console.error('Error fetching product from Shopify:', data);
        res.status(response.status).json({ message: data.errors || 'Error fetching product' });
      }
    } catch (error) {
      console.error('Error fetching product:', error.message);
      res.status(500).json({ message: 'Internal Server Error' });
    } finally {
      // Close the database connection
      db.close();
    }
  });
});












// Manually create script tag from postman:

app.get('/api/create-script-tags', async (req, res) => {
  const db = new sqlite3.Database(DB_PATH);

  db.all("SELECT shop, accessToken FROM shopify_sessions", [], async (err, rows) => {
    if (err) {
      console.error("Failed to retrieve store tokens:", err);
      return res.status(500).json({ error: "Failed to retrieve store tokens" });
    }

    const results = [];

    for (const row of rows) {
      const { shop, accessToken } = row;

      try {
        // Step 1: Check if the script tag already exists
        const existingResponse = await axios.get(
          `https://${shop}/admin/api/2024-10/script_tags.json`,
          {
            headers: {
              "X-Shopify-Access-Token": accessToken,
              "Content-Type": "application/json",
            },
          }
        );

        const scriptTagExists = existingResponse.data.script_tags.some(
          (tag) => tag.src === scriptUrl
        );

        if (scriptTagExists) {
          results.push({ shop, status: "Script tag already exists" });
        } else {
          // Step 2: Create a new script tag if it doesn’t exist
          const response = await axios.post(
            `https://${shop}/admin/api/2024-10/script_tags.json`,
            {
              script_tag: {
                event: "onload",
                src: scriptUrl,
              },
            },
            {
              headers: {
                "X-Shopify-Access-Token": accessToken,
                "Content-Type": "application/json",
              },
            }
          );

          results.push({ shop, status: "Script tag created successfully", data: response.data });
        }
      } catch (error) {
        console.error(`Error creating script tag for store ${shop}:`, error.message);
        results.push({ shop, status: "Failed to create script tag", error: error.message });
      }
    }

    // Close the database after processing
    db.close();

    // Send the response with all results
    res.status(200).json({ results });
  });
});



// Shopify authentication and webhook handling
app.get(shopify.config.auth.path, shopify.auth.begin());
app.get(
  shopify.config.auth.callbackPath,
  shopify.auth.callback(),
  shopify.redirectToShopifyOrAppRoot()
);
app.post(
  shopify.config.webhooks.path,
  shopify.processWebhooks({ webhookHandlers: PrivacyWebhookHandlers })
);

app.use("/api/*", shopify.validateAuthenticatedSession());

app.use(express.json());

// New route: Fetch product count from Shopify API
app.get("/api/products/count", async (_req, res) => {
  const client = new shopify.api.clients.Graphql({
    session: res.locals.shopify.session,
  });

  try {
    const countData = await client.request(`
      query {
        productsCount {
          count
        }
      }
    `);

    res.status(200).send({ count: countData.data.productsCount.count });
  } catch (error) {
    console.error("Error fetching product count:", error);
    res.status(500).send({ error: 'Failed to fetch product count' });
  }
});





// Create products
app.post("/api/products", async (_req, res) => {
  let status = 200;
  let error = null;

  try {
    await productCreator(res.locals.shopify.session);
  } catch (e) {
    console.log(`Failed to process products/create: ${e.message}`);
    status = 500;
    error = e.message;
  }
  res.status(status).send({ success: status === 200, error });
});

app.use(shopify.cspHeaders());
app.use(serveStatic(STATIC_PATH, { index: false }));

app.use("/*", shopify.ensureInstalledOnShop(), async (_req, res, _next) => {
  return res
    .status(200)
    .set("Content-Type", "text/html")
    .send(
      readFileSync(join(STATIC_PATH, "index.html"))
        .toString()
        .replace("%VITE_SHOPIFY_API_KEY%", process.env.SHOPIFY_API_KEY || "")
    );
});







app.get("/api/products", async (_req, res) => {
  const client = new shopify.api.clients.Graphql({
    session: res.locals.shopify.session,
  });

  try {
    const allProducts = [];
    let hasNextPage = true;
    let cursor = null; // For pagination

    while (hasNextPage) {
      // Properly format the query and pass variables
      const productData = await client.query({
        data: `
          query getAllProducts($cursor: String) {
            products(first: 10, after: $cursor) {
              edges {
                node {
                  id
                  title
                  descriptionHtml
                  variants(first: 10) {
                    edges {
                      node {
                        id
                        title
                        price
                      }
                    }
                  }
                }
              }
              pageInfo {
                hasNextPage
                endCursor
              }
            }
          }
        `,
        variables: { cursor },
      });

      const products = productData.body.data.products;
      allProducts.push(...products.edges.map(edge => edge.node));

      // Update pagination variables
      hasNextPage = products.pageInfo.hasNextPage;
      cursor = products.pageInfo.endCursor;
    }

    res.status(200).send(allProducts);
  } catch (error) {
    console.error("Error fetching all products:", error);
    res.status(500).send({ error: "Failed to fetch all products" });
  }
});








app.get('/api/create', async (req, res) => {
  try {
    const response = await axios.post(
      `https://${shopifyStore}.myshopify.com/admin/api/2024-10/script_tags.json`,
      {
        script_tag: {
          event: 'onload',
          src: scriptUrl,
        },
      },
      {
        headers: {
          'X-Shopify-Access-Token': accessToken,
          'Content-Type': 'application/json',
        },
      }
    );

    console.log('Script tag created:', response.data);
    res.status(200).json({ message: 'Script tag created successfully', data: response.data });
  } catch (error) {
    console.error('Error creating script tag:', error);
    res.status(500).json({ error: 'Failed to create script tag' });
  }
});
















// Health check route
app.get('/', (req, res) => {
  res.send('Shopify Script Tag Service is running');
});



app.get('/get-script-tags', async (req, res) => {
  try {
    const response = await axios.get(
      `https://${shopifyStore}.myshopify.com/admin/api/2024-10/script_tags.json`,
      {
        headers: {
          'X-Shopify-Access-Token': accessToken,
          'Content-Type': 'application/json',
        },
      }
    );

    // Check if the script tag exists in the response
    const scriptTagExists = response.data.script_tags.some(
      (tag) => tag.src === scriptUrl
    );

    res.status(200).json({
      message: 'Retrieved script tags successfully',
      data: response.data.script_tags,
      scriptTagExists: scriptTagExists,
    });
  } catch (error) {
    console.error('Error retrieving script tags:', error);
    res.status(500).json({ error: 'Failed to retrieve script tags' });
  }
});





app.delete('/del-script/:id', async (req, res) => {
  try {
    const id = req.params.id;

    // Send a DELETE request to the Shopify API
    const response = await axios.delete(
      `https://${shopifyStore}.myshopify.com/admin/api/2024-10/script_tags/${id}.json`,
      {
        headers: {
          'X-Shopify-Access-Token': accessToken,
          'Content-Type': 'application/json',
        },
      }
    );

    // Check if the deletion was successful
    if (response.status === 200) {
      return res.status(200).json({
        message: 'Script tag deleted successfully',
      });
    } else {
      return res.status(response.status).json({ message: 'Failed to delete script tag' });
    }
  } catch (error) {
    console.error('Error deleting script tag:', error);
    return res.status(500).json({ error: 'Failed to delete script tag' });
  }
});

















app.get('/admin/api/products/:handle', async (req, res) => {
  const { handle } = req.params;

  try {
    const response = await fetch(`https://${SHOPIFY_STORE_NAME}/admin/api/2024-04/products.json?handle=${handle}`, {
      method: 'GET',
      headers: {
        'X-Shopify-Access-Token': SHOPIFY_ACCESS_TOKEN,
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();
    if (data.products.length > 0) {
      res.json(data.products[0]); // Return the first product
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});












app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});



