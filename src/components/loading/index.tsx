import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import "./styles.css";

export function Loading() {
  return (
    <div className="loading">
      <div>
        <DotLottieReact src="./assets/animations/loading.lottie" loop autoplay />
      </div>{" "}
    </div>
  );
}
