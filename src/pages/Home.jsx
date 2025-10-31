import { useCallback, useEffect, useMemo, useState } from "react";
import ProductCard from "../components/ProductCard.jsx";
import Pagination from "../components/ui/Pagination.jsx";
import Hero from "../components/Hero.jsx";
import PromoStrip from "../components/PromoStrip.jsx";
import { useBasket } from "../context/BasketContext.jsx";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [categories, setCategories] = useState(["all"]);
  const [category, setCategory] = useState("all");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("relevance");
  const { addItem } = useBasket();
  const handleAdd = useCallback((product) => addItem(product, 1), [addItem]);

  useEffect(() => {
    let cancelled = false;
    async function loadData() {
      try {
        setLoading(true);
        setError("");

        const [productsRes, categoriesRes] = await Promise.all([
          fetch("https://fakestoreapi.com/products"),
          fetch("https://fakestoreapi.com/products/categories"),
        ]);

        if (!productsRes.ok) throw new Error("Failed to fetch products");
        if (!categoriesRes.ok) throw new Error("Failed to fetch categories");

        const productsData = await productsRes.json();
        const categoriesData = await categoriesRes.json();

        if (!cancelled) {
          setProducts(productsData);
          setCategories(["all", ...categoriesData]);
        }
      } catch (e) {
        if (!cancelled) setError(e.message || "Error loading data");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    loadData();

    return () => {
      cancelled = true;
    };
  }, []);

  const [page, setPage] = useState(1);
  const pageSize = 8;

  const filtered = useMemo(() => {
    return products
      .filter((p) => category === "all" || p.category === category)
      .filter((p) => p.title.toLowerCase().includes(query.toLowerCase()))
      .sort((a, b) => {
        if (sort === "price-asc") return a.price - b.price;
        if (sort === "price-desc") return b.price - a.price;
        if (sort === "title") return a.title.localeCompare(b.title);
        return 0;
      });
  }, [products, category, query, sort]);

  const paged = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [filtered, page, pageSize]);

  if (loading) return <div>Loading products…</div>;
  if (error) return <div style={{ color: "tomato" }}>{error}</div>;

  return (
    <>
      <Hero />
      <PromoStrip />
      <div
        style={{ display: "flex", gap: 12, marginBottom: 12, flexWrap: "wrap" }}
      >
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search products"
          style={{
            padding: 10,
            borderRadius: 8,
            border: "1px solid #ddd",
            flex: "1 1 260px",
          }}
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          style={{ padding: 10, borderRadius: 8, border: "1px solid #ddd" }}
        >
          {categories.map((c) => (
            <option key={c} value={c}>
              {c[0].toUpperCase() + c.slice(1)}
            </option>
          ))}
        </select>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          style={{ padding: 10, borderRadius: 8, border: "1px solid #ddd" }}
        >
          <option value="relevance">Sort: Relevance</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="title">Title A–Z</option>
        </select>
      </div>
      <div
        id="products"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: 16,
        }}
      >
        {paged.map((p) => (
          <ProductCard key={p.id} product={p} onAdd={handleAdd} />
        ))}
      </div>
      <Pagination
        page={page}
        setPage={setPage}
        totalItems={filtered.length}
        pageSize={pageSize}
      />
    </>
  );
}
