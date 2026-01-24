import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {   
    const url = new URL(req.url);
    const page = parseInt(url.searchParams.get("page") || "1");
    const pageSize = parseInt(url.searchParams.get("pageSize") || "100");

    const params = new URLSearchParams({
      page: page.toString(),
      pageSize: pageSize.toString(),
    });

    const res = await fetch("http://localhost:5001/clients?" + params.toString(), {
      headers: {
        "token-id": "supersecrettoken"
      }
    });

    if (!res.ok) {
      return NextResponse.json({ error: "Erreur API" }, { status: 500 });
    }

    const data = await res.json();
    
    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json({ error: "Impossible de récupérer les clients" }, { status: 500 });
  }
}
