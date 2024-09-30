type PProps = {
  children: React.ReactNode;
  color?: string;
};

export const P = ({ children, color = "text-zinc-950" }: PProps) => {
  return (
    <p className={`leading-7 [&:not(:first-child)]:mt-6 ${color}`}>
      {children}
    </p>
  );
};
