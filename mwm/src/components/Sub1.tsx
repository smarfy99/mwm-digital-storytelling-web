const Sub1 = () => {
  return (
    <>
      <div className="relative w-screen h-screen bg-black">
        <video
          autoPlay
          loop
          src="/sub.mp4"
          className="absolute top-0 left-0 object-cover"
        />
        <source src="/sub.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </div>
    </>
  );
};

export default Sub1;
