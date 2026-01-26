"use client";

export default function Home() {
  return (
    <div style={style}>
      <h1>Welcome to the Dashboard</h1>
      <p>This is the main dashboard page.</p>
    </div>
  );
}

const style: React.CSSProperties = {
  display: "flex",
  flexGrow: 1,
  height: "100%"
};

