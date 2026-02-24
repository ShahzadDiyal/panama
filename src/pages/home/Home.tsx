import BookConsultation from "../../components/home/Bookconsultation";
import FaqSection from "../../components/home/Faqsection";
import HeroSection from "../../components/home/HeroSection";
import ReviewsSection from "../../components/home/Reviewssection";
import ServicesSection from "../../components/home/Servicessection";
import StatsSection from "../../components/home/Statssection";
import HowItWorks from "../../components/home/Howitworks"

export default function Home() {
  return (
    <div className="bg-slate-950">
      <HeroSection />
      <StatsSection />
      <ServicesSection />
      <HowItWorks />
      <ReviewsSection />
      <FaqSection />
      <BookConsultation />
    </div>
  )
}