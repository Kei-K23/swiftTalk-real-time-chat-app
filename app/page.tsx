import LottieProvider from "@/provider/LottieProvider";
import { lottieJSON } from "@/public/lottieJSON";
import Hero from "./_components/Hero";
export default function Home() {
  return (
    <main className="page-padding">
      <Hero />
      <LottieProvider
        src={lottieJSON.landingLottie}
        className="w-[200px] sm:w-[350px] lg:w-[400px] xl:w-[450px]"
      />
    </main>
  );
}
