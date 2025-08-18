// "use client"
import AdminDashBoard from "@/components/admin-components/admin-dashbord";
import HeroSection from "@/components/homepage/hero-section";


export default function Home() {
  // const { user } = useContext(UserContext)
  //className="typewriter text-3xl font-bold" 
  return (
    <div>
      <main>
        <HeroSection/>

        <div>
          <AdminDashBoard />

          {/* {
            user?.role == "admin" && <AdminDashBoard />
          } */}

        </div>

      </main>
    </div>
  );
}

