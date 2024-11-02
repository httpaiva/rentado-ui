import React from "react";
import { Editor } from "slate";
import { EditorType } from "../../types";
import { ToolbarButton } from "../../styles";

export const Underline = ({ editor }: { editor: EditorType }) => {
  const toggleUnderline = () => {
    //@ts-expect-error
    const isActive = Editor.marks(editor)?.underline;
    if (isActive) {
      Editor.removeMark(editor, "underline");
    } else {
      Editor.addMark(editor, "underline", true);
    }
  };

  return <ToolbarButton onClick={toggleUnderline}>U</ToolbarButton>;
};
