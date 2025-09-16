import MainSilder from "@/components/Silder-Comp/Main-silder";
import Catsilder from "@/components/Silder-Comp/Catsilder";
import ProductGridSystem from "@/components/Product-Comp/Productgridsystem";
import { getProducts } from "@/app/actions/product.action";



export default async function Home() {
  const response = await getProducts();
  const products = response?.data;

  return (
    <>
      <MainSilder />
      <Catsilder />
      <div className="container mx-auto my-12">
        <h1 className="text-3xl font-bold text-center text-red-600 relative">
          Our Products
          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-16 h-0.5 bg-red-500" />
        </h1>
        <p className="text-center text-gray-500 mt-6">
          Check out our latest products and discover the{" "}
          <span className="text-red-600 font-semibold">best quality</span>
          products
        </p>
      </div>
      <ProductGridSystem products={products} />
    </>
  );
}
