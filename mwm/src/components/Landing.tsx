const Landing = () => {
  return (
    <>
      <div className="relative w-screen h-screen bg-white">
        <video autoPlay loop muted preload="auto" src="/landing.mp4" className="absolute top-0 left-0 object-cover" />
        <source src="/landing.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </div>
    </>
  );
};

export default Landing;
