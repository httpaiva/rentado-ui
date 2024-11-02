import React from "react";
import { Bold } from "./buttons/Bold";
import { Italic } from "./buttons/Italic";
import { Underline } from "./buttons/Underline";
import { ToolbarContainer } from "../styles";
import { H1 } from "./buttons/H1";
import { useSlate } from "slate-react";
import { H2 } from "./buttons/H2";
import { TextAlign } from "./buttons/TextAlign";
import { InsertDynamicField } from "./buttons/DynamicContent";

export const Toolbar = () => {
  const editor = useSlate();
  return (
    <ToolbarContainer>
      <InsertDynamicField editor={editor} />
      <Bold editor={editor} />
      <Italic editor={editor} />
      <Underline editor={editor} />
      <H1 editor={editor} />
      <H2 editor={editor} />
      <TextAlign editor={editor} />
    </ToolbarContainer>
  );
};
