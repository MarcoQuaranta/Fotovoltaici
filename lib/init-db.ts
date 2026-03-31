import pool from "./db";

export async function initDatabase() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS lead_info (
      id SERIAL PRIMARY KEY,
      nome VARCHAR(255) NOT NULL,
      telefono VARCHAR(50) NOT NULL,
      email VARCHAR(255),
      created_at TIMESTAMP DEFAULT NOW(),
      deleted BOOLEAN DEFAULT FALSE
    );

    CREATE TABLE IF NOT EXISTS lead_preventivo (
      id SERIAL PRIMARY KEY,
      nome VARCHAR(255) NOT NULL,
      telefono VARCHAR(50) NOT NULL,
      email VARCHAR(255),
      potenza VARCHAR(10) NOT NULL,
      batteria BOOLEAN DEFAULT FALSE,
      colonna_ricarica BOOLEAN DEFAULT FALSE,
      prezzo INTEGER NOT NULL,
      indirizzo TEXT,
      created_at TIMESTAMP DEFAULT NOW(),
      deleted BOOLEAN DEFAULT FALSE
    );

    DO $$ BEGIN
      IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='lead_info' AND column_name='deleted') THEN
        ALTER TABLE lead_info ADD COLUMN deleted BOOLEAN DEFAULT FALSE;
      END IF;
      IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='lead_preventivo' AND column_name='deleted') THEN
        ALTER TABLE lead_preventivo ADD COLUMN deleted BOOLEAN DEFAULT FALSE;
      END IF;
    END $$;
  `);
}
