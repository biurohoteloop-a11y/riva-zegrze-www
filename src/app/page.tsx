import Hero from "@/components/sections/Hero";
import HomeMarquee from "@/components/sections/HomeMarquee";
import HomeInwestycja from "@/components/sections/HomeInwestycja";
import HomeApartamenty from "@/components/sections/HomeApartamenty";
import HomeAtuty from "@/components/sections/HomeAtuty"; 
import HomePlan from "@/components/sections/HomePlan";
import HomeShowcase from "@/components/sections/HomeShowcase";
import HomeBlog from "@/components/sections/HomeBlog"; 
import HomeCTA from "@/components/sections/HomeCTA"; // <--- Zostawiamy nowe CTA

export default function Home() {
  return (
    <main className="bg-white">
      <Hero />
      <HomeMarquee />
      <HomeInwestycja />
      <HomeApartamenty />
      <HomeAtuty />       
      <HomePlan /> 
      <HomeShowcase /> 
      <HomeBlog /> 
      <HomeCTA /> {/* <--- Kończymy na CTA, Footer ładuje się sam z layout.tsx */}
    </main>
  );
}