import { Hero } from "@/components/templates/Home/HeroSection"
import { Impact } from "@/components/templates/Home/ImpactSection"
import { Media } from "@/components/templates/Home/MediaSection"
import { ProofPoints } from "@/components/templates/Home/ProofSection"
import { Story } from "@/components/templates/Home/StorySection"
import { FeaturedVentures } from "@/components/templates/Home/VenturesSection"

export default function Page() {
  return (
    <main className="">
      <Hero />
      <Story />
      <ProofPoints />
      <FeaturedVentures />
      <Impact />
      <Media />
    </main>
  )
}
