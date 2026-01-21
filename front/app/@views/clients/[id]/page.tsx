"use client";
import { useParams } from "next/navigation";

export default function Client() {
  const urlParams = useParams();
  const { id } = urlParams;

  return (
    <div style={{ height: "2000px" }}>
      <h1>Client {id}</h1>     
    </div>
  );
}
