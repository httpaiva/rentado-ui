import React, { useState } from "react";
import { createEditor, Descendant } from "slate";
import { Slate, withReact } from "slate-react";
import { EditableContainer, EditorContainer, StyledEditable } from "./styles";
import { EditorType } from "./types";
import { Toolbar } from "./components/Toolbar";
import { renderLeaf } from "./utils/renderLeaf";
import { renderElement } from "./utils/renderElement";

type CustomElement = { type: "paragraph"; children: CustomText[] };
type CustomText = { text: string };
type DocumentEditorProps = {
  value?: Descendant[];
  onChange?: (value: Descendant[]) => void;
};

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
    children: [{ text: "Digite seu texto aqui..." }],
  },
];

export const DocumentEditor = ({ value, onChange }: DocumentEditorProps) => {
  const [editor] = useState(() => withReact(createEditor()));

  return (
    <EditorContainer>
      <Slate
        editor={editor}
        initialValue={value || initialValue}
        onChange={(newValue) => {
          onChange?.(newValue);
        }}
      >
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
      </Slate>
    </EditorContainer>
  );
};
