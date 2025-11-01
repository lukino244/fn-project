import { useMemo } from "react";
import { Link } from "react-router-dom";
import Button from "../components/ui/Button.jsx";
import { useBasket } from "../context/BasketContext.jsx";
import CartItem from "../components/CartItem.jsx";

export default function Cart() {
  const { items, subtotal, updateQuantity, removeItem, clear } = useBasket();

  const list = useMemo(() => Object.values(items), [items]);

  if (list.length === 0) {
    return (
      <div className="cart-empty-container">
        <div className="cart-empty-content">
          <h2 style={{ marginBottom: 8 }}>Your cart is empty</h2>
          <div className="cart-empty-message">
            Browse products and add items to your basket.
          </div>
          <Link to="/">
            <Button>Continue shopping</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-layout">
      <section className="cart-section">
        <header className="cart-header">
          <div>Item</div>
          <div>Details</div>
          <div>Quantity</div>
          <div className="cart-header-total">Total</div>
        </header>
        <div>
          {list.map(({ product, quantity }) => (
            <CartItem
              key={product.id}
              product={product}
              quantity={quantity}
              updateQuantity={updateQuantity}
              removeItem={removeItem}
            />
          ))}
        </div>
        <footer className="cart-footer">
          <Link to="/" className="cart-footer-link">
            ← Continue shopping
          </Link>
          <button onClick={clear} className="cart-footer-clear-btn">
            Clear cart
          </button>
        </footer>
      </section>

      <aside className="order-summary">
        <h3 style={{ marginTop: 0, marginBottom: 12 }}>Order summary</h3>
        <div className="summary-row">
          <div>Subtotal</div>
          <div className="summary-value">${subtotal.toFixed(2)}</div>
        </div>
        <div className="summary-row summary-dim">
          <div>Shipping</div>
          <div>Calculated at checkout</div>
        </div>
        <div className="summary-row summary-total">
          <div>Total</div>
          <div>${subtotal.toFixed(2)}</div>
        </div>
        <div className="summary-checkout">
          <Link to="/checkout">
            <Button style={{ width: "100%" }}>Proceed to checkout</Button>
          </Link>
        </div>
      </aside>
    </div>
  );
}