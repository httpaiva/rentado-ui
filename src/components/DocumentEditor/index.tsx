import React, { useState } from "react";
import { createEditor, Descendant } from "slate";
import { Slate, withReact } from "slate-react";
import { EditableContainer, EditorContainer, StyledEditable } from "./styles";
import { EditorType } from "./types";
import { Toolbar } from "./components/Toolbar";
import { renderLeaf } from "./utils/renderLeaf";
import { Button } from "../ui/button";
import { renderElement } from "./utils/renderElement";

type CustomElement = { type: "paragraph"; children: CustomText[] };
type CustomText = { text: string };

declare module "slate" {
  interface CustomTypes {
    Editor: EditorType;
    Element: CustomElement;
    Text: CustomText;
  }
}

const initialValue: Descendant[] = [
  {
    type: "paragraph",
    children: [{ text: "A line of text in a paragraph." }],
  },
];

export const DocumentEditor = () => {
  const [editor] = useState(() => withReact(createEditor()));

  const getEditorValue = () => {
    const value = editor.children; // Obtém o conteúdo do editor
    console.log(JSON.stringify(value)); // Exibe o valor no console (ou faça algo com ele)
  };

  return (
    <EditorContainer>
      <Slate editor={editor} initialValue={initialValue as any}>
        <Toolbar />
        <EditableContainer>
          <StyledEditable
            placeholder="Start typing your document..."
            autoFocus
            //@ts-expect-error
            renderLeaf={renderLeaf}
            renderElement={renderElement}
          />
        </EditableContainer>
        <div className="w-full flex justify-center align-center mt-2">
          <Button onClick={getEditorValue}>Salvar</Button>
        </div>
      </Slate>
    </EditorContainer>
  );
};
