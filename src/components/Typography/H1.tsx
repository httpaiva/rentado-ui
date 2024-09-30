type H1Props = {
  children: React.ReactNode;
  color?: string;
};

export const H1 = ({ children, color = "text-zinc-950" }: H1Props) => {
  return (
    <h1
      className={`scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl ${color}`}
    >
      {children}
    </h1>
  );
};
