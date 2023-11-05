import LottieProvider from "@/provider/LottieProvider";
import { lottieJSON } from "@/public/lottieJSON";
import Hero from "./_components/Hero";
import Navbar from "./_components/Navbar";
export default function Home() {
  return (
    <>
      <Navbar />
      <main className="page-padding">
        <Hero />
        <LottieProvider
          src={lottieJSON.landingLottie}
          className="hidden sm:block sm:w-[350px] lg:w-[400px] "
        />
      </main>
    </>
  );
}
