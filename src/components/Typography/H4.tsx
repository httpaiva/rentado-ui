type H4Props = {
    children: React.ReactElement,
    color?: string;
}

export const H4 = ({ children, color = "text-zinc-950" }: H4Props): React.ReactElement => {
  return (
    <h4 className={`scroll-m-20 text-xl font-semibold tracking-tight ${color}`}>
     {children}
    </h4>
  );
};
