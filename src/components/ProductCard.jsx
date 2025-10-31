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
          alt={product.title}
          loading="lazy"
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
        <div style={{ fontWeight: 700 }}>
          ${Number(product.price).toFixed(2)}
        </div>
        <Button onClick={() => onAdd?.(product)}>Add to cart</Button>
      </div>
    </div>
  );
}

export default memo(ProductCard);
