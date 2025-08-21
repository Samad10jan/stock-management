import HeroSection from "@/components/homepage/hero-section";
import TabsHome from "@/components/homepage/tabs-homepage";

export default function Home() {
  return (
    <div className="w-full">
      <main className="flex flex-col gap-8">
       
        <section className="w-full">
          <HeroSection />
        </section>

       
        <section>
          <TabsHome />
        </section>
      </main>
    </div>
  );
}
