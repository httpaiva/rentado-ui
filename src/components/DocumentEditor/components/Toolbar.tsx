import React from "react";
import { Bold } from "./buttons/Bold";
import { Italic } from "./buttons/Italic";
import { Underline } from "./buttons/Underline";
import { EditorType } from "../types";
import { ToolbarContainer } from "../styles";

export const Toolbar = ({ editor }: { editor: EditorType }) => {
  return (
    <ToolbarContainer>
      <Bold editor={editor} />
      <Italic editor={editor} />
      <Underline editor={editor} />
    </ToolbarContainer>
  );
};
