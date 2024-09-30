type H2Props = {
    children: React.ReactElement,
    color?: string,
}

export const H2 = ({ children, color = "text-zinc-950" }: H2Props): React.ReactElement => {
  return (
    <h2 className={`scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0 ${color}`}>
     {children}
    </h2>
  );
};
