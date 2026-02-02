import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {   
    const params = await req.json();        

    const res = await fetch("http://localhost:5001/" + params.url, {
      method: params.method,
      headers: {
        "Content-Type": "application/json",
        "token-id": "supersecrettoken"
      },
      body: params.body ? JSON.stringify(params.body) : null
    });

    if (!res.ok) {
      return NextResponse.json({ statusText: res.statusText }, { status: res.status });
    }

    const result = {
      status: res.status,
      statusText: res.statusText,
      data: await res.json()
    }
    
    return NextResponse.json(result);
  } catch (err) {
    return NextResponse.json({ error: "Erreur interne du serveur" }, { status: 500 });
  }
}

