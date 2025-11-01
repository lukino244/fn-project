import { memo } from "react";
import { Link } from "react-router-dom";
import Button from "./ui/Button.jsx";

function ProductCard({ product, onAdd }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        border: "1px solid #e5e5e5",
        borderRadius: 8,
        padding: 12,
        gap: 8,
        height: "100%",
      }}
    >
      <Link
        to={`/product/${product.id}`}
        style={{ textDecoration: "none", color: "inherit", display: "block" }}
      >
        <img
          src={product.image}
          alt=""
          loading="lazy"
          decoding="async"
          style={{
            height: 160,
            objectFit: "contain",
            width: "100%",
            aspectRatio: "1 / 1",
          }}
        />
        <div
          style={{
            fontWeight: 600,
            marginTop: 8,
            minHeight: 44,
            lineHeight: 1.2,
          }}
        >
          {product.title}
        </div>
      </Link>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: "auto",
        }}
      >
        <div style={{ fontWeight: 800 }}>${product.price.toFixed(2)}</div>
        <Button
          onClick={() => onAdd(product)}
          style={{ fontSize: 13, padding: "0.4em 0.8em" }}
        >
          Add to cart
        </Button>
      </div>
    </div>
  );
}

export default memo(ProductCard);