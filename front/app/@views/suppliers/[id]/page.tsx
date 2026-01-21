"use client";
import { useParams } from "next/navigation";

export default function Page() {
  const params = useParams();
  const { id } = params;

  return (
    <div style={{ height: "2000px" }}>
      <h1>Supplier {id}</h1>     
    </div>
  );
}
