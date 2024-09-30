type H3Props = {
    children: React.ReactElement,
    color?: string;
}

export const H3 = ({ children, color = "text-zinc-950" }: H3Props): React.ReactElement => {
  return (
    <h3 className={`scroll-m-20 text-2xl font-semibold tracking-tight ${color}`}>
     {children}
    </h3>
  );
};
