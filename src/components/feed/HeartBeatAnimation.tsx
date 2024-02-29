import React, { useEffect, useRef } from "react";
import lottie, { AnimationItem } from "lottie-web";

interface LottieAnimationProps {
  animationData: any; // Import your Lottie JSON animation as an object
  width?: number;
  height?: number;
}

const HeartBeatAnimation: React.FC<LottieAnimationProps> = ({
  animationData,
  width = 200,
  height = 200,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const animationInstance = useRef<AnimationItem | null>(null);

  useEffect(() => {
    if (containerRef.current) {
      animationInstance.current = lottie.loadAnimation({
        container: containerRef.current,
        animationData: animationData,
        renderer: "svg", // You can change the renderer as needed (canvas or svg)
        loop: true, // Set to true if you want the animation to loop
        autoplay: true, // Set to true if you want the animation to start playing automatically
        rendererSettings: {
          // Set the stroke color to white
          progressiveLoad: true,
          preserveAspectRatio: "xMidYMid meet",
        },
      });
    }

    return () => {
      if (animationInstance.current) {
        animationInstance.current.destroy();
      }
    };
  }, [animationData]);

  return <div ref={containerRef} style={{ width, height }} />;
};

export default HeartBeatAnimation;
