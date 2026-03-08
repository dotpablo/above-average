import { NextResponse } from "next/server";

const BUTTONDOWN_API_KEY = process.env.BUTTONDOWN_API_KEY;

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json(
        { error: "Email invalido" },
        { status: 400 }
      );
    }

    if (!BUTTONDOWN_API_KEY) {
      return NextResponse.json(
        { error: "API key no configurada" },
        { status: 500 }
      );
    }

    const res = await fetch("https://api.buttondown.com/v1/subscribers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${BUTTONDOWN_API_KEY}`,
      },
      body: JSON.stringify({ email_address: email }),
    });

    if (res.status === 201) {
      return NextResponse.json({ ok: true });
    }

    // 409 = already subscribed
    if (res.status === 409) {
      return NextResponse.json({ ok: true, already: true });
    }

    // Buttondown may return 400 with details for existing subscribers
    if (res.status === 400) {
      const data = await res.json().catch(() => null);
      const msg = JSON.stringify(data || "");
      if (msg.toLowerCase().includes("already") || msg.toLowerCase().includes("subscriber")) {
        return NextResponse.json({ ok: true, already: true });
      }
    }

    return NextResponse.json(
      { error: "Error al suscribir" },
      { status: res.status }
    );
  } catch {
    return NextResponse.json(
      { error: "Error interno" },
      { status: 500 }
    );
  }
}
