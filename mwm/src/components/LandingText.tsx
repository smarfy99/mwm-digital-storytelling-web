import { useRef, useEffect } from "react";

const LandingText = () => {
  const canvas = useRef<HTMLCanvasElement>(null);
  let ctx = null;

  useEffect(() => {
    // dynamically assign the width and height to canvas
    const canvasEle = canvas.current!;
    canvasEle.width = canvasEle.clientWidth;
    canvasEle.height = canvasEle.clientHeight;

    // get context of the canvas
    ctx = canvasEle.getContext("2d");
  }, []);
  return (
    <div className="absolute">
      <h3>OZI</h3>
      <canvas ref={canvas} />
    </div>
  );
};

export default LandingText;
