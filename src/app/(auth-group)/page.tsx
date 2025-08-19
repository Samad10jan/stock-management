
import AddProductsButton from "@/components/admin-components/add-products-btn";
import AdminDashBoard from "@/components/admin-components/admin-dashbord";
import HeroSection from "@/components/homepage/hero-section";
import ProductList from "@/components/homepage/products list";


export default function Home() {

  return (
    <div>
      <main>
        <HeroSection />

        <div>
          <div className="flex min-w-[390px]">
            <div className=" flex flex-col mb-4">
              <div className="self-center">

                <AddProductsButton />
              </div>
              <ProductList />

            </div>
            <AdminDashBoard />
          </div>



        </div>

      </main>
    </div>
  );
}

