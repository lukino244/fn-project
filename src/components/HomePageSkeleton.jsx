const skeletonStyle = {
  background: "#f0f0f0",
  borderRadius: "8px",
  animation: "pulse 1.5s infinite ease-in-out",
};

const productCardSkeleton = {
  ...skeletonStyle,
  display: "flex",
  flexDirection: "column",
  gap: 8,
};

const cardImageSkeleton = {
  ...skeletonStyle,
  height: 160,
  width: "100%",
  aspectRatio: "1 / 1",
  borderRadius: "8px 8px 0 0",
};

const cardTextSkeleton = {
  ...skeletonStyle,
  height: "20px",
  width: "80%",
  margin: "8px 0 0 12px",
};

const cardPriceSkeleton = {
  ...skeletonStyle,
  height: "24px",
  width: "40%",
  margin: "8px 0 12px 12px",
};

function SkeletonProductCard() {
  return (
    <div style={productCardSkeleton}>
      <div style={cardImageSkeleton} />
      <div style={cardTextSkeleton} />
      <div style={cardPriceSkeleton} />
    </div>
  );
}

export default function HomePageSkeleton() {
  const promoStripStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: 12,
    marginBottom: 16,
  };

  const productsGridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: 16,
  };

  return (
    <div>
      <div
        style={{ ...skeletonStyle, height: "190px", marginBottom: "24px" }}
      />

      <div style={promoStripStyle}>
        <div style={{ ...skeletonStyle, height: "80px" }} />
        <div style={{ ...skeletonStyle, height: "80px" }} />
        <div style={{ ...skeletonStyle, height: "80px" }} />
      </div>

      <div style={productsGridStyle}>
        {Array.from({ length: 8 }).map((_, i) => (
          <SkeletonProductCard key={i} />
        ))}
      </div>
    </div>
  );
}