export function Empty() {
  return (
    <div
      style={{
        textAlign: "center",
        position: "absolute",
        left: "0",
        right: "0",
        top: "50%",
        transform: "translateY(-50%)",
      }}
    >
      <strong style={{ fontSize: "20px", lineHeight: "26px" }}>Welcome</strong>

      <p
        style={{
          fontSize: "16px",
          lineHeight: "22px",
          color: "#8c8c8c",
          margin: "0",
        }}
      >
        Go to <strong>Me</strong> tab to get started
      </p>
    </div>
  );
}
