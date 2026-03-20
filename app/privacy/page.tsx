import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: "Privacy Policy - Nexevo",
  description: "Informativa sulla privacy e trattamento dei dati personali di Nexevo.",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col">
      <nav className="flex w-full items-center justify-between bg-white px-6 border-b border-gray-200 md:px-8 py-4">
        <Link href="/" className="inline-block">
          <Image
            src="/images/logo.png"
            alt="Nexevo"
            width={120}
            height={35}
            className="h-8 w-auto [filter:brightness(0)_saturate(100%)_invert(30%)_sepia(50%)_saturate(500%)_hue-rotate(70deg)_brightness(80%)]"
          />
        </Link>
        <Link href="/" className="text-primary hover:underline text-sm">
          Torna alla home
        </Link>
      </nav>

      <main className="flex-1 py-8 md:py-12 px-4 md:px-8">
        <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-sm p-6 md:p-10">
          <h1 className="text-3xl font-bold text-dark mb-8">Privacy Policy</h1>

          <div className="prose prose-gray max-w-none space-y-6 text-gray-600">
            <p className="text-sm text-gray-500">Ultimo aggiornamento: Febbraio 2026</p>

            <section>
              <h2 className="text-xl font-semibold text-dark mt-8 mb-4">1. Titolare del Trattamento</h2>
              <p>
                Il Titolare del trattamento dei dati personali è NEXEVO S.R.L., con sede legale in Via Aniello Falcone 394, 80127 Napoli (NA),
                P.IVA 10924601213, email: privacy@nexevo.it
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-dark mt-8 mb-4">2. Dati Raccolti</h2>
              <p>Raccogliamo le seguenti categorie di dati personali:</p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li><strong>Dati identificativi:</strong> nome, cognome, indirizzo email, numero di telefono</li>
                <li><strong>Dati relativi all&apos;immobile:</strong> indirizzo, tipo di abitazione, superficie del tetto, consumo energetico</li>
                <li><strong>Dati di navigazione:</strong> indirizzo IP, browser utilizzato, pagine visitate, tempo di permanenza</li>
                <li><strong>Dati forniti volontariamente:</strong> informazioni inserite nei moduli di contatto o richiesta preventivo</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-dark mt-8 mb-4">3. Finalità del Trattamento</h2>
              <p>I dati personali sono trattati per le seguenti finalità:</p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li>Rispondere alle richieste di preventivo e fornire consulenza</li>
                <li>Gestire la relazione contrattuale per l&apos;installazione di impianti fotovoltaici</li>
                <li>Inviare comunicazioni commerciali e promozionali (previo consenso)</li>
                <li>Adempiere agli obblighi di legge e regolamentari</li>
                <li>Migliorare i nostri servizi e l&apos;esperienza utente sul sito</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-dark mt-8 mb-4">4. Base Giuridica</h2>
              <p>Il trattamento dei dati si basa su:</p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li>Esecuzione di un contratto o misure precontrattuali (Art. 6.1.b GDPR)</li>
                <li>Consenso dell&apos;interessato per finalità di marketing (Art. 6.1.a GDPR)</li>
                <li>Legittimo interesse del Titolare per migliorare i servizi (Art. 6.1.f GDPR)</li>
                <li>Adempimento di obblighi legali (Art. 6.1.c GDPR)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-dark mt-8 mb-4">5. Conservazione dei Dati</h2>
              <p>
                I dati personali saranno conservati per il tempo necessario al conseguimento delle finalità per cui sono stati raccolti:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li>Dati contrattuali: 10 anni dalla cessazione del rapporto</li>
                <li>Dati di marketing: fino alla revoca del consenso</li>
                <li>Dati di navigazione: 24 mesi</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-dark mt-8 mb-4">6. Condivisione dei Dati</h2>
              <p>I dati potranno essere comunicati a:</p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li>Installatori partner per l&apos;esecuzione dei lavori</li>
                <li>Fornitori di servizi IT e hosting</li>
                <li>Consulenti fiscali e legali</li>
                <li>Autorità pubbliche, se richiesto dalla legge</li>
              </ul>
              <p className="mt-3">I dati non saranno trasferiti fuori dall&apos;Unione Europea.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-dark mt-8 mb-4">7. Diritti dell&apos;Interessato</h2>
              <p>In qualità di interessato, hai diritto di:</p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li>Accedere ai tuoi dati personali</li>
                <li>Richiedere la rettifica o la cancellazione</li>
                <li>Limitare il trattamento</li>
                <li>Opporti al trattamento</li>
                <li>Richiedere la portabilità dei dati</li>
                <li>Revocare il consenso in qualsiasi momento</li>
                <li>Proporre reclamo al Garante per la Protezione dei Dati Personali</li>
              </ul>
              <p className="mt-3">
                Per esercitare i tuoi diritti, scrivi a: <a href="mailto:privacy@nexevo.it" className="text-primary hover:underline">privacy@nexevo.it</a>
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-dark mt-8 mb-4">8. Cookie</h2>
              <p>
                Il sito utilizza cookie tecnici e, previo consenso, cookie di profilazione.
                Per maggiori informazioni, consulta la nostra <Link href="/cookie" className="text-primary hover:underline">Cookie Policy</Link>.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-dark mt-8 mb-4">9. Modifiche alla Privacy Policy</h2>
              <p>
                Ci riserviamo il diritto di modificare questa informativa in qualsiasi momento.
                Le modifiche saranno pubblicate su questa pagina con indicazione della data di aggiornamento.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-dark mt-8 mb-4">10. Contatti</h2>
              <p>
                Per qualsiasi domanda relativa al trattamento dei tuoi dati personali, puoi contattarci a:
              </p>
              <ul className="list-none mt-3 space-y-1">
                <li>Email: <a href="mailto:privacy@nexevo.it" className="text-primary hover:underline">privacy@nexevo.it</a></li>
                <li>Telefono: 800 123 456</li>
                <li>Indirizzo: Via Aniello Falcone 394, 80127 Napoli (NA)</li>
              </ul>
            </section>
          </div>
        </div>
      </main>

      <footer className="bg-dark text-gray-400 py-6">
        <div className="max-w-3xl mx-auto px-4 text-center text-sm">
          <p>
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link>
            <span className="mx-2">-</span>
            <Link href="/termini" className="hover:text-white transition-colors">Termini</Link>
            <span className="mx-2">-</span>
            <Link href="/cookie" className="hover:text-white transition-colors">Cookie</Link>
            <span className="mx-2">-</span>
            2026 NEXEVO S.R.L. — P.IVA 10924601213
          </p>
        </div>
      </footer>
    </div>
  );
}
