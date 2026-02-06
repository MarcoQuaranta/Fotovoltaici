import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: "Termini e Condizioni - Nexevo",
  description: "Termini e condizioni di utilizzo del sito e dei servizi Nexevo.",
};

export default function TerminiPage() {
  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col">
      <nav className="flex w-full items-center justify-between bg-white px-6 border-b border-gray-200 md:px-8 py-4">
        <Link href="/" className="inline-block">
          <Image
            src="/images/logo.png"
            alt="Nexevo"
            width={120}
            height={35}
            className="h-8 w-auto [filter:brightness(0)_saturate(100%)_invert(15%)_sepia(50%)_saturate(1000%)_hue-rotate(180deg)_brightness(90%)_contrast(95%)]"
          />
        </Link>
        <Link href="/" className="text-primary hover:underline text-sm">
          Torna alla home
        </Link>
      </nav>

      <main className="flex-1 py-8 md:py-12 px-4 md:px-8">
        <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-sm p-6 md:p-10">
          <h1 className="text-3xl font-bold text-dark mb-8">Termini e Condizioni</h1>

          <div className="prose prose-gray max-w-none space-y-6 text-gray-600">
            <p className="text-sm text-gray-500">Ultimo aggiornamento: Febbraio 2026</p>

            <section>
              <h2 className="text-xl font-semibold text-dark mt-8 mb-4">1. Premesse</h2>
              <p>
                I presenti Termini e Condizioni regolano l&apos;utilizzo del sito web nexevo.it e dei servizi offerti da
                Nexevo S.r.l. (di seguito &quot;Nexevo&quot; o &quot;Società&quot;), con sede legale in Via dell&apos;Energia 1, 20100 Milano (MI).
              </p>
              <p className="mt-3">
                L&apos;utilizzo del sito e dei servizi implica l&apos;accettazione integrale dei presenti Termini.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-dark mt-8 mb-4">2. Servizi Offerti</h2>
              <p>Nexevo offre i seguenti servizi:</p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li>Consulenza per impianti fotovoltaici residenziali e commerciali</li>
                <li>Preventivi personalizzati gratuiti</li>
                <li>Progettazione e installazione di impianti fotovoltaici</li>
                <li>Fornitura e installazione di batterie di accumulo</li>
                <li>Installazione di colonnine di ricarica per veicoli elettrici</li>
                <li>Assistenza post-vendita e manutenzione</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-dark mt-8 mb-4">3. Preventivi e Prezzi</h2>
              <p>
                I preventivi forniti tramite il sito hanno carattere indicativo e non vincolante.
                Il prezzo definitivo sarà stabilito a seguito di sopralluogo tecnico e valutazione delle specifiche esigenze del cliente.
              </p>
              <p className="mt-3">
                I prezzi indicati sul sito sono da intendersi IVA inclusa, salvo diversa indicazione.
                Nexevo si riserva il diritto di modificare i prezzi in qualsiasi momento senza preavviso.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-dark mt-8 mb-4">4. Procedura di Acquisto</h2>
              <p>La procedura di acquisto si articola nelle seguenti fasi:</p>
              <ol className="list-decimal pl-6 space-y-2 mt-3">
                <li>Richiesta preventivo tramite il sito o contatto telefonico</li>
                <li>Sopralluogo tecnico gratuito presso l&apos;immobile del cliente</li>
                <li>Presentazione del preventivo definitivo</li>
                <li>Accettazione del preventivo e firma del contratto</li>
                <li>Versamento dell&apos;acconto (se previsto)</li>
                <li>Installazione dell&apos;impianto</li>
                <li>Collaudo e attivazione</li>
                <li>Saldo finale</li>
              </ol>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-dark mt-8 mb-4">5. Garanzie</h2>
              <p>Nexevo garantisce:</p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li><strong>Pannelli solari:</strong> garanzia prodotto fino a 25 anni, garanzia di rendimento lineare</li>
                <li><strong>Inverter:</strong> garanzia prodotto fino a 10 anni (estendibile)</li>
                <li><strong>Batterie di accumulo:</strong> garanzia prodotto fino a 10 anni</li>
                <li><strong>Installazione:</strong> garanzia di 2 anni su difetti di installazione</li>
              </ul>
              <p className="mt-3">
                Le garanzie sono soggette alle condizioni specificate nei contratti di vendita e nelle documentazioni tecniche dei produttori.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-dark mt-8 mb-4">6. Diritto di Recesso</h2>
              <p>
                Ai sensi del Codice del Consumo, il cliente consumatore ha diritto di recedere dal contratto entro 14 giorni
                dalla firma, senza dover fornire alcuna motivazione, inviando comunicazione scritta a Nexevo.
              </p>
              <p className="mt-3">
                Il diritto di recesso è escluso per i contratti di fornitura di beni confezionati su misura o
                chiaramente personalizzati.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-dark mt-8 mb-4">7. Responsabilità</h2>
              <p>
                Nexevo non è responsabile per danni indiretti, incidentali o consequenziali derivanti dall&apos;utilizzo
                del sito o dei servizi offerti.
              </p>
              <p className="mt-3">
                Le informazioni presenti sul sito sono fornite a scopo informativo e non costituiscono
                consulenza professionale vincolante.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-dark mt-8 mb-4">8. Proprietà Intellettuale</h2>
              <p>
                Tutti i contenuti del sito (testi, immagini, loghi, grafiche) sono di proprietà di Nexevo o dei
                rispettivi titolari e sono protetti dalle leggi sul diritto d&apos;autore e sulla proprietà intellettuale.
              </p>
              <p className="mt-3">
                È vietata la riproduzione, distribuzione o utilizzo dei contenuti senza autorizzazione scritta.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-dark mt-8 mb-4">9. Modifiche ai Termini</h2>
              <p>
                Nexevo si riserva il diritto di modificare i presenti Termini in qualsiasi momento.
                Le modifiche saranno efficaci dalla data di pubblicazione sul sito.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-dark mt-8 mb-4">10. Legge Applicabile e Foro Competente</h2>
              <p>
                I presenti Termini sono regolati dalla legge italiana. Per qualsiasi controversia sarà competente
                il Foro di Milano, salvo il foro del consumatore ove applicabile.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-dark mt-8 mb-4">11. Contatti</h2>
              <p>Per informazioni sui presenti Termini:</p>
              <ul className="list-none mt-3 space-y-1">
                <li>Email: <a href="mailto:info@nexevo.it" className="text-primary hover:underline">info@nexevo.it</a></li>
                <li>Telefono: 800 123 456</li>
                <li>Indirizzo: Via dell&apos;Energia 1, 20100 Milano (MI)</li>
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
            2026 Nexevo
          </p>
        </div>
      </footer>
    </div>
  );
}
