"use client";
import { Player } from "@lottiefiles/react-lottie-player";

interface LottieProviderProp {
  src: object;
  autoplay?: boolean;
  loop?: boolean;
  className: string;
}

const LottieProvider = ({
  src,
  autoplay = true,
  loop = true,
  className,
}: LottieProviderProp) => {
  return (
    <Player src={src} autoplay={autoplay} loop={loop} className={className} />
  );
};

export default LottieProvider;
