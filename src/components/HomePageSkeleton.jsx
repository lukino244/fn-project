const skeletonStyle = {
  background: "#f0f0f0",
  borderRadius: "8px",
  animation: "pulse 1.5s infinite ease-in-out",
};

export default function HomePageSkeleton() {
  return (
    <div>
      <div
        style={{ ...skeletonStyle, height: "190px", marginBottom: "24px" }}
      />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 12,
          marginBottom: 16,
        }}
      >
        <div style={{ ...skeletonStyle, height: "80px" }} />
        <div style={{ ...skeletonStyle, height: "80px" }} />
        <div style={{ ...skeletonStyle, height: "80px" }} />
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 16,
        }}
      >
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} style={{ ...skeletonStyle, height: "280px" }} />
        ))}
      </div>
    </div>
  );
}
