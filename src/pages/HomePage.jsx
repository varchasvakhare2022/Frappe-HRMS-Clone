import Hero from '../components/Hero'
import VideoSection from '../components/VideoSection'
import TrustedBySection from '../components/TrustedBySection'
import BenefitsSection from '../components/BenefitsSection'
import FeaturesSection from '../components/FeaturesSection'
import StorySection from '../components/StorySection'
import UserReviewsSection from '../components/UserReviewsSection'
import FAQSection from '../components/FAQSection'
import CTASection from '../components/CTASection'

function HomePage() {
  return (
    <>
      <div className="max-w-3xl mx-auto px-4">
        <Hero />
      </div>
      
      {/* Video Section - Wider than content */}
      <VideoSection />
      
      <div className="max-w-3xl mx-auto px-4">
        <TrustedBySection />
        <BenefitsSection />
        <FeaturesSection />
        <StorySection />
        <UserReviewsSection />
        <FAQSection />
        <CTASection />
      </div>
    </>
  )
}

export default HomePage

