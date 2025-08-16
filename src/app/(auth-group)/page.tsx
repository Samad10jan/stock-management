"use client"
import AdminDashBoard from "@/components/admin-components/admin-dashbord";
import { UserContext } from "@/components/contexts/user-context";
import PieChartHero from "@/components/hero-section-pie-chart";

import { Heading } from "@radix-ui/themes";
import { useContext } from "react";

export default function Home() {
  // const { user } = useContext(UserContext)
  //className="typewriter text-3xl font-bold" 
  return (
    <div>
      <main>
        <div className="min-h-80 flex ">
          <div className="bg-indigo-800 grow drop-shadow-indigo-800 drop-shadow-xl/30 rounded ">
            <Heading >Hero Section</Heading>

          </div>

          <div className="min-w-2xl">

            <PieChartHero />
          </div>

        </div>

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

