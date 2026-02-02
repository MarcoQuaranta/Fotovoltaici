import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TrustBar from "@/components/TrustBar";
import Benefits from "@/components/Benefits";
import Packages from "@/components/Packages";
import Testimonials from "@/components/Testimonials";
import LeadForm from "@/components/LeadForm";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <TrustBar />
        <section id="soluzioni">
          <Benefits />
        </section>
        <Packages />
        <Testimonials />
        <LeadForm />
      </main>
      <Footer />
    </>
  );
}
