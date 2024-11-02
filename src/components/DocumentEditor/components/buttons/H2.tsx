import React from "react";
import { Transforms, Editor, Element } from "slate";
import { ToolbarButton } from "../../styles";
import { EditorType } from "../../types";

export const H2 = ({ editor }: { editor: EditorType }) => {
  const toggleH2 = () => {
    const [match] = Editor.nodes(editor, {
        match: n => n.type === 'heading2',
      })

    Transforms.setNodes(
      editor,
      { type: match ? "paragraph" : "heading2" },
      { match: (n) => Element.isElement(n) && Editor.isBlock(editor, n) },
    );
  };

  return <ToolbarButton onClick={toggleH2}>H2</ToolbarButton>;
};
