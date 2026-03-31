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

const VALID_POTENZE = ["3 kW", "6 kW", "9 kW"];
const VALID_PREZZI = [7100, 7900, 10050, 11050, 11700, 12700, 13650];

export async function GET(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: "Non autorizzato" }, { status: 401 });
  }

  try {
    await ensureDb();
    const deleted = req.nextUrl.searchParams.get("deleted") === "true";
    const result = await pool.query(
      "SELECT * FROM lead_preventivo WHERE deleted = $1 ORDER BY created_at DESC",
      [deleted]
    );
    return NextResponse.json(result.rows);
  } catch (error) {
    console.error("Errore lettura lead preventivo:", error);
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

    const { nome, telefono, email, potenza, batteria, colonna_ricarica, prezzo, indirizzo } = await req.json();

    if (!nome || !telefono || !potenza || prezzo === undefined) {
      return NextResponse.json({ error: "Campi obbligatori mancanti" }, { status: 400 });
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

    if (!VALID_POTENZE.includes(potenza)) {
      return NextResponse.json({ error: "Potenza non valida" }, { status: 400 });
    }

    if (!VALID_PREZZI.includes(Number(prezzo))) {
      return NextResponse.json({ error: "Prezzo non valido" }, { status: 400 });
    }

    await pool.query(
      "INSERT INTO lead_preventivo (nome, telefono, email, potenza, batteria, colonna_ricarica, prezzo, indirizzo) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)",
      [sanitizedNome, sanitizedTelefono, sanitizedEmail, potenza, batteria || false, colonna_ricarica || false, Number(prezzo), indirizzo ? String(indirizzo).trim().slice(0, 500) : null]
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Errore salvataggio lead preventivo:", error);
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
    await pool.query("UPDATE lead_preventivo SET deleted = $1 WHERE id = $2", [deleted, id]);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Errore aggiornamento lead preventivo:", error);
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
    await pool.query("DELETE FROM lead_preventivo WHERE id = $1 AND deleted = true", [id]);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Errore eliminazione lead preventivo:", error);
    return NextResponse.json({ error: "Errore interno" }, { status: 500 });
  }
}
