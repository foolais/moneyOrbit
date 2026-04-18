const Title = ({ className }: { className?: string }) => {
  return (
    <h1
      className={`text-accent stroke-text text-2xl font-extrabold tracking-widest ${className}`}
    >
      Money Orbit
    </h1>
  );
};

export default Title;
