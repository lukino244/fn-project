import { useCallback, useEffect, useMemo, useState } from "react";
import ProductCard from "../components/ProductCard.jsx";
import Pagination from "../components/ui/Pagination.jsx";
import Hero from "../components/Hero.jsx";
import PromoStrip from "../components/PromoStrip.jsx";
import { useBasket } from "../context/BasketContext.jsx";
import HomePageSkeleton from "../components/HomePageSkeleton.jsx";

const errorStyle = { color: "tomato" };
const controlsContainerStyle = {
  display: "flex",
  gap: 12,
  marginBottom: 12,
  flexWrap: "wrap",
};
const searchInputStyle = {
  padding: 10,
  borderRadius: 8,
  border: "1px solid #ddd",
  flex: "1 1 260px",
  boxSizing: "border-box",
};
const selectStyle = {
  padding: 10,
  borderRadius: 8,
  border: "1px solid #ddd",
  boxSizing: "border-box",
};
const productsGridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
  gap: 16,
};

const PAGE_SIZE = 8;

export default function Home() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("relevance");
  const [page, setPage] = useState(1);
  const { addItem } = useBasket();

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        setLoading(true);
        setError("");
        const [resProducts, resCategories] = await Promise.all([
          fetch("https://fakestoreapi.com/products"),
          fetch("https://fakestoreapi.com/products/categories"),
        ]);
        if (!resProducts.ok || !resCategories.ok) {
          throw new Error("Failed to fetch data");
        }
        const dataProducts = await resProducts.json();
        const dataCategories = await resCategories.json();
        if (!cancelled) {
          setProducts(dataProducts);
          setCategories(["all", ...dataCategories]);
        }
      } catch (e) {
        if (!cancelled) setError(e.message || "Error loading data");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, []);

  const handleAdd = useCallback(
    (product) => {
      addItem(product);
    },
    [addItem]
  );

  const handleQueryChange = useCallback((e) => {
    setPage(1);
    setQuery(e.target.value);
  }, []);

  const handleCategoryChange = useCallback((e) => {
    setPage(1);
    setCategory(e.target.value);
  }, []);

  const handleSortChange = useCallback((e) => {
    setPage(1);
    setSort(e.target.value);
  }, []);

  const filtered = useMemo(() => {
    let list = products;

    if (category !== "all") {
      list = list.filter((p) => p.category === category);
    }

    if (query) {
      list = list.filter((p) =>
        p.title.toLowerCase().includes(query.toLowerCase())
      );
    }

    if (sort === "price-asc") {
      list = [...list].sort((a, b) => a.price - b.price);
    } else if (sort === "price-desc") {
      list = [...list].sort((a, b) => b.price - a.price);
    } else if (sort === "title") {
      list = [...list].sort((a, b) => a.title.localeCompare(b.title));
    }

    return list;
  }, [products, category, query, sort]);

  const paged = useMemo(
    () => filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE),
    [filtered, page]
  );

  if (loading) return <HomePageSkeleton />;
  if (error) return <div style={errorStyle}>{error}</div>;

  return (
    <>
      <Hero />
      <PromoStrip />
      <div style={controlsContainerStyle}>
        <input
          value={query}
          onChange={handleQueryChange}
          placeholder="Search products"
          style={searchInputStyle}
        />
        <select
          value={category}
          onChange={handleCategoryChange}
          style={selectStyle}
          aria-label="Filter by category"
        >
          {categories.map((c) => (
            <option key={c} value={c}>
              {c[0].toUpperCase() + c.slice(1)}
            </option>
          ))}
        </select>
        <select
          value={sort}
          onChange={handleSortChange}
          style={selectStyle}
          aria-label="Sort by"
        >
          <option value="relevance">Sort: Relevance</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="title">Title A–Z</option>
        </select>
      </div>
      <div id="products" style={productsGridStyle}>
        {paged.map((p) => (
          <ProductCard key={p.id} product={p} onAdd={handleAdd} />
        ))}
      </div>
      <Pagination
        page={page}
        setPage={setPage}
        totalItems={filtered.length}
        pageSize={PAGE_SIZE}
      />
    </>
  );
}