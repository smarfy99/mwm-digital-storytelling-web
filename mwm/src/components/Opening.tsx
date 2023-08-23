const Opening = () => {
  return (
    <>
      <div className="relative w-screen h-screen bg-white">
        <video autoPlay preload="auto" src="/opening.mp4" className="absolute top-0 left-0 object-cover" />
        <source src="/opening.mp4" type="video/mp4" />
      </div>
    </>
  );
};

export default Opening;
