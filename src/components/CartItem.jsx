import { Link } from "react-router-dom";
import { useMemo } from "react";

export default function CartItem({
  product,
  quantity,
  updateQuantity,
  removeItem,
}) {
  const lineTotal = useMemo(
    () => (product.price * quantity).toFixed(2),
    [product.price, quantity]
  );

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "100px 1fr auto auto",
        gap: 16,
        alignItems: "center",
        borderBottom: "1px solid #eee",
        padding: "16px 0",
      }}
    >
      <Link to={`/product/${product.id}`}>
        <img
          src={product.image}
          alt={product.title}
          style={{
            width: "100%",
            aspectRatio: "1/1",
            objectFit: "contain",
            borderRadius: 8,
            border: "1px solid #f0f0f0",
          }}
        />
      </Link>

      <div>
        <Link
          to={`/product/${product.id}`}
          style={{ textDecoration: "none", color: "inherit", fontWeight: 600 }}
        >
          {product.title}
        </Link>
        <div style={{ fontSize: 14, color: "#555" }}>
          ${product.price.toFixed(2)}
        </div>
        <button
          onClick={() => removeItem(product.id)}
          style={{
            background: "none",
            border: "none",
            padding: "4px 0 0 0",
            color: "tomato",
            fontSize: 12,
            cursor: "pointer",
          }}
        >
          Remove
        </button>
      </div>

      <input
        type="number"
        min="1"
        value={quantity}
        onChange={(e) => updateQuantity(product.id, Number(e.target.value))}
        aria-label="Quantity"
        style={{
          width: 60,
          padding: "4px 8px",
          borderRadius: 6,
          border: "1px solid #ddd",
          textAlign: "center",
        }}
      />

      <div style={{ fontWeight: 600, justifySelf: "end" }}>${lineTotal}</div>
    </div>
  );
}