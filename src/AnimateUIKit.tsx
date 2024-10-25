// src/AnimateUIKit.tsx
import React, { useEffect, useRef } from "react";
import axios from "axios";
import lottie, { AnimationItem } from "lottie-web";

// Define the props type for the component
interface AnimateUIKitProps {
  name: string;
  autoplay?: boolean;
  loop?: boolean;
  apiUrl?: string; // Allow the user to pass an API URL as a prop
}

const AnimateUIKit: React.FC<AnimateUIKitProps> = ({
  name,
  autoplay = true,
  loop = true,
  apiUrl, // Optional API URL passed by the user
}) => {
  const animationContainerRef = useRef<HTMLDivElement>(null);
  const animationInstanceRef = useRef<AnimationItem | null>(null);

  // Fallback to environment variable or a default API URL
  const baseUrl =
    apiUrl || process.env.REACT_APP_API_URL || "https://public-api.example.com";

  useEffect(() => {
    const fetchAnimation = async () => {
      try {
        // Fetch the animation JSON from the provided or default API base URL
        const response = await axios.get(`${baseUrl}/library/${name}`);
        const animationData = response.data;

        // Render the animation using lottie-web
        animationInstanceRef.current = lottie.loadAnimation({
          container: animationContainerRef.current!,
          renderer: "svg",
          loop: loop,
          autoplay: autoplay,
          animationData: animationData,
        });
      } catch (error) {
        console.error("Error fetching the animation data:", error);
      }
    };

    fetchAnimation();

    return () => {
      if (animationInstanceRef.current) {
        animationInstanceRef.current.destroy();
      }
    };
  }, [name, autoplay, loop, baseUrl]);

  return (
    <div
      ref={animationContainerRef}
      style={{ width: "100%", height: "100%" }}
    />
  );
};

export default AnimateUIKit;
