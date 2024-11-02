export const renderElement = (props: any) => {
  const { element } = props;
  const style = { textAlign: element.align || "left" };
  switch (props.element.type) {
    case "heading1":
      return (
        <h1 style={style} {...props.attributes}>
          {props.children}
        </h1>
      );
    case "heading2":
      return (
        <h2 style={style} {...props.attributes}>
          {props.children}
        </h2>
      );
    case "dynamicField":
      return (
        <span
          style={{
            backgroundColor: "#e0e7ff",
            borderRadius: "4px",
            padding: "2px 4px",
            color: "#333",
          }}
        >
          {element.fieldName}
        </span>
      );
    case "paragraph":
      return (
        <p style={style} {...props.attributes}>
          {props.children}
        </p>
      );
    default:
      return (
        <p style={style} {...props.attributes}>
          {props.children}
        </p>
      );
  }
};
