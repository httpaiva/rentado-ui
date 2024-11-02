import React from "react";
import { Transforms, Editor, Element } from "slate";
import { ToolbarButton } from "../../styles";
import { EditorType } from "../../types";

export const H1 = ({ editor }: { editor: EditorType }) => {
  const toggleH1 = () => {
    // Verifica se o texto selecionado é um H1
    const [match] = Editor.nodes(editor, {
        match: n => n.type === 'heading1',
      })

    // Altera os nós com as novas propriedades usando Transforms.setNodes
    Transforms.setNodes(
      editor,
      { type: match ? "paragraph" : "heading1" },
      { match: (n) => Element.isElement(n) && Editor.isBlock(editor, n) },
    );
  };

  return <ToolbarButton onClick={toggleH1}>H1</ToolbarButton>;
};
