import React, { useState, useEffect, useCallback } from "react";
import {
  Card,
  DataTable,
  Pagination,
  Filters,
  Spinner,
  Toast,
} from "@shopify/polaris";
import axios from "axios";

const ProductTable = () => {
  const [products, setProducts] = useState([]);
  const [pageInfo, setPageInfo] = useState({ next: null, previous: null });
  const [loading, setLoading] = useState(false);
  const [statusFilter, setStatusFilter] = useState("active");
  const [error, setError] = useState(null);
  const fetchProducts = async (pageInfoParam = null) => {
    setLoading(true);
    setError(null); // Reset error state before fetching
    const status = statusFilter !== "all" ? `&status=${statusFilter}` : "";
    const url = `/api/getProductsData?limit=10`
    try {
      const response = await axios.get(url);

      setProducts(response.data.products);
      setPageInfo({
        next: response.data.next_page_info || null,
        previous: response.data.previous_page_info || null,
      });
    } catch (error) {
      console.error("Error fetching products:", error);
      setError("Failed to load products. Please try again.");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, [statusFilter]);

  const handleStatusFilterChange = useCallback(
    (value) => setStatusFilter(value),
    []
  );

  const handleNextPage = () => {
    const nextPageInfo = pageInfo.next;
    console.log("nextPages");
    if (nextPageInfo) {
      fetchProducts(nextPageInfo);
    }
  };

  const handlePreviousPage = () => {
    const prevPageInfo = pageInfo.previous;
    if (prevPageInfo) {
      fetchProducts(prevPageInfo);
    }
  };

  return (
    <Card>
      <Filters
        queryValue={statusFilter}
        onQueryChange={handleStatusFilterChange}
        onClearAll={() => setStatusFilter("all")}
        filters={[
          {
            key: "status",
            label: "Product status",
            filter: (
              <select
                onChange={(e) => handleStatusFilterChange(e.target.value)}
                value={statusFilter}
              >
                <option value="all">All</option>
                <option value="active">Active</option>
                <option value="draft">Draft</option>
                <option value="archived">Archived</option>
              </select>
            ),
          },
        ]}
      />
      {loading ? (
        <Spinner accessibilityLabel="Loading products" size="large" />
      ) : error ? (
        <Toast content={error} onDismiss={() => setError(null)} />
      ) : (
        <DataTable
          columnContentTypes={["text", "text", "text", "text"]}
          headings={["Product", "Status", "Inventory", "Sales Channels"]}
          rows={products.map((product) => [
            product.title,
            product.status,
            product.inventory_quantity
              ? `${product.inventory_quantity} in stock`
              : "Inventory not tracked",
            product.sales_channels_count,
          ])}
        />
      )}
      <Pagination
        hasPrevious={!!pageInfo.previous}
        hasNext={!!pageInfo.next}
        onPrevious={handlePreviousPage}
        onNext={handleNextPage}
      />
    </Card>
  );
};

export default ProductTable;
