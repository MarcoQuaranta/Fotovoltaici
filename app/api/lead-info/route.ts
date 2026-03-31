import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db";
import { initDatabase } from "@/lib/init-db";
import { isRateLimited } from "@/lib/rate-limit";

let dbInitialized = false;

async function ensureDb() {
  if (!dbInitialized) {
    await initDatabase();
    dbInitialized = true;
  }
}

function isAuthorized(req: NextRequest) {
  return req.headers.get("authorization") === `Bearer ${process.env.DASHBOARD_PASSWORD}`;
}

export async function GET(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: "Non autorizzato" }, { status: 401 });
  }

  try {
    await ensureDb();
    const deleted = req.nextUrl.searchParams.get("deleted") === "true";
    const result = await pool.query(
      "SELECT * FROM lead_info WHERE deleted = $1 ORDER BY created_at DESC",
      [deleted]
    );
    return NextResponse.json(result.rows);
  } catch (error) {
    console.error("Errore lettura lead info:", error);
    return NextResponse.json({ error: "Errore interno" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "unknown";
    if (isRateLimited(ip)) {
      return NextResponse.json({ error: "Troppe richieste, riprova tra poco" }, { status: 429 });
    }

    await ensureDb();

    const { nome, telefono, email } = await req.json();

    if (!nome || !telefono) {
      return NextResponse.json({ error: "Nome e telefono sono obbligatori" }, { status: 400 });
    }

    const sanitizedNome = nome.trim().slice(0, 255);
    const sanitizedTelefono = telefono.trim().slice(0, 50);
    const sanitizedEmail = email ? email.trim().slice(0, 255) : null;

    const digits = sanitizedTelefono.replace(/\D/g, "");
    if (digits.length < 7 || !/^\+?\d+$/.test(sanitizedTelefono)) {
      return NextResponse.json({ error: "Numero di telefono non valido" }, { status: 400 });
    }

    if (sanitizedEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(sanitizedEmail)) {
      return NextResponse.json({ error: "Email non valida" }, { status: 400 });
    }

    await pool.query(
      "INSERT INTO lead_info (nome, telefono, email) VALUES ($1, $2, $3)",
      [sanitizedNome, sanitizedTelefono, sanitizedEmail]
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Errore salvataggio lead info:", error);
    return NextResponse.json({ error: "Errore interno" }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: "Non autorizzato" }, { status: 401 });
  }

  try {
    await ensureDb();
    const { id, deleted } = await req.json();
    if (!id || typeof deleted !== "boolean") {
      return NextResponse.json({ error: "Parametri non validi" }, { status: 400 });
    }
    await pool.query("UPDATE lead_info SET deleted = $1 WHERE id = $2", [deleted, id]);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Errore aggiornamento lead info:", error);
    return NextResponse.json({ error: "Errore interno" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: "Non autorizzato" }, { status: 401 });
  }

  try {
    await ensureDb();
    const { id } = await req.json();
    if (!id) {
      return NextResponse.json({ error: "ID mancante" }, { status: 400 });
    }
    await pool.query("DELETE FROM lead_info WHERE id = $1 AND deleted = true", [id]);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Errore eliminazione lead info:", error);
    return NextResponse.json({ error: "Errore interno" }, { status: 500 });
  }
}
