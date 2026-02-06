import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: "Cookie Policy - Nexevo",
  description: "Informativa sull'utilizzo dei cookie sul sito Nexevo.",
};

export default function CookiePage() {
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
          <h1 className="text-3xl font-bold text-dark mb-8">Cookie Policy</h1>

          <div className="prose prose-gray max-w-none space-y-6 text-gray-600">
            <p className="text-sm text-gray-500">Ultimo aggiornamento: Febbraio 2026</p>

            <section>
              <h2 className="text-xl font-semibold text-dark mt-8 mb-4">1. Cosa sono i Cookie</h2>
              <p>
                I cookie sono piccoli file di testo che i siti web salvano sul tuo dispositivo (computer, tablet, smartphone)
                durante la navigazione. Servono a migliorare l&apos;esperienza di navigazione, ricordare le tue preferenze e
                raccogliere informazioni statistiche anonime.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-dark mt-8 mb-4">2. Tipologie di Cookie Utilizzati</h2>

              <h3 className="text-lg font-medium text-dark mt-6 mb-3">2.1 Cookie Tecnici (Necessari)</h3>
              <p>
                Sono essenziali per il corretto funzionamento del sito. Non richiedono il consenso dell&apos;utente.
              </p>
              <div className="bg-gray-50 rounded-lg p-4 mt-3">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2">Nome</th>
                      <th className="text-left py-2">Finalità</th>
                      <th className="text-left py-2">Durata</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="py-2">session_id</td>
                      <td className="py-2">Gestione sessione utente</td>
                      <td className="py-2">Sessione</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2">cookie_consent</td>
                      <td className="py-2">Memorizza preferenze cookie</td>
                      <td className="py-2">12 mesi</td>
                    </tr>
                    <tr>
                      <td className="py-2">csrf_token</td>
                      <td className="py-2">Sicurezza form</td>
                      <td className="py-2">Sessione</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h3 className="text-lg font-medium text-dark mt-6 mb-3">2.2 Cookie Analitici</h3>
              <p>
                Ci permettono di raccogliere dati statistici anonimi sulla navigazione per migliorare il sito.
              </p>
              <div className="bg-gray-50 rounded-lg p-4 mt-3">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2">Nome</th>
                      <th className="text-left py-2">Fornitore</th>
                      <th className="text-left py-2">Finalità</th>
                      <th className="text-left py-2">Durata</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="py-2">_ga</td>
                      <td className="py-2">Google Analytics</td>
                      <td className="py-2">Statistiche visite</td>
                      <td className="py-2">24 mesi</td>
                    </tr>
                    <tr>
                      <td className="py-2">_gid</td>
                      <td className="py-2">Google Analytics</td>
                      <td className="py-2">Identificazione utenti</td>
                      <td className="py-2">24 ore</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h3 className="text-lg font-medium text-dark mt-6 mb-3">2.3 Cookie di Marketing</h3>
              <p>
                Utilizzati per mostrare annunci pertinenti e misurare l&apos;efficacia delle campagne pubblicitarie.
              </p>
              <div className="bg-gray-50 rounded-lg p-4 mt-3">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2">Nome</th>
                      <th className="text-left py-2">Fornitore</th>
                      <th className="text-left py-2">Finalità</th>
                      <th className="text-left py-2">Durata</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="py-2">_fbp</td>
                      <td className="py-2">Facebook</td>
                      <td className="py-2">Remarketing</td>
                      <td className="py-2">3 mesi</td>
                    </tr>
                    <tr>
                      <td className="py-2">_gcl_au</td>
                      <td className="py-2">Google Ads</td>
                      <td className="py-2">Conversioni</td>
                      <td className="py-2">3 mesi</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-dark mt-8 mb-4">3. Gestione dei Cookie</h2>
              <p>
                Al primo accesso al sito, ti viene mostrato un banner per la gestione dei cookie.
                Puoi accettare tutti i cookie, rifiutare quelli non necessari o personalizzare le tue preferenze.
              </p>
              <p className="mt-3">
                Puoi modificare le tue preferenze in qualsiasi momento cliccando sul link &quot;Gestisci Cookie&quot;
                presente nel footer del sito.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-dark mt-8 mb-4">4. Disabilitazione tramite Browser</h2>
              <p>
                Puoi disabilitare i cookie anche attraverso le impostazioni del tuo browser:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li>
                  <strong>Chrome:</strong> Impostazioni → Privacy e sicurezza → Cookie e altri dati dei siti
                </li>
                <li>
                  <strong>Firefox:</strong> Opzioni → Privacy e sicurezza → Cookie e dati dei siti web
                </li>
                <li>
                  <strong>Safari:</strong> Preferenze → Privacy → Gestisci dati siti web
                </li>
                <li>
                  <strong>Edge:</strong> Impostazioni → Cookie e autorizzazioni sito → Cookie e dati del sito
                </li>
              </ul>
              <p className="mt-3 text-sm bg-yellow-50 p-3 rounded-lg">
                <strong>Nota:</strong> Disabilitare i cookie potrebbe compromettere il corretto funzionamento di alcune funzionalità del sito.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-dark mt-8 mb-4">5. Cookie di Terze Parti</h2>
              <p>
                Il sito utilizza servizi di terze parti che potrebbero installare propri cookie.
                Per maggiori informazioni, consulta le rispettive privacy policy:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li>
                  <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                    Google Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="https://www.facebook.com/privacy/explanation" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                    Facebook Privacy Policy
                  </a>
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-dark mt-8 mb-4">6. Aggiornamenti</h2>
              <p>
                La presente Cookie Policy può essere aggiornata periodicamente. Ti invitiamo a consultare
                regolarmente questa pagina per essere informato su eventuali modifiche.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-dark mt-8 mb-4">7. Contatti</h2>
              <p>Per domande sulla Cookie Policy:</p>
              <ul className="list-none mt-3 space-y-1">
                <li>Email: <a href="mailto:privacy@nexevo.it" className="text-primary hover:underline">privacy@nexevo.it</a></li>
                <li>Telefono: 800 123 456</li>
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
