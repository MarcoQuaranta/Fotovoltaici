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
        {/* Wrapper: sticky glows live here, fixed while scrolling through both dark sections */}
        <div className="relative overflow-clip">
          {/* Sticky glow layer */}
          <div className="sticky top-0 h-0 z-10 pointer-events-none">
            <div className="absolute -top-[60px] -left-[100px] w-[500px] h-[500px] rounded-full bg-[#B3FE85]/[0.11] blur-[100px]" />
            <div className="absolute top-[30vh] -right-[80px] w-[450px] h-[450px] rounded-full bg-[#B3FE85]/[0.08] blur-[90px]" />
            <div className="absolute top-[15vh] left-[40%] w-[550px] h-[550px] rounded-full bg-[#B3FE85]/[0.06] blur-[120px]" />
            <div className="absolute top-[50vh] -left-[60px] w-[400px] h-[400px] rounded-full bg-[#B3FE85]/[0.10] blur-[100px]" />
          </div>

          <TrustBar />
          <section id="soluzioni">
            <Benefits />
          </section>
        </div>
        <Packages />
        <Testimonials />
        <LeadForm />
      </main>
      <Footer />
    </>
  );
}
