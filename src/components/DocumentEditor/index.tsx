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
  isReadOnly?: boolean;
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

export const DocumentEditor = ({
  value,
  onChange,
  isReadOnly = false,
}: DocumentEditorProps) => {
  const [editor] = useState(() => withReact(createEditor()));

  const { isInline } = editor;

  editor.isInline = (element) => {
    // @ts-expect-error
    return element.type === "dynamicField" ? true : isInline(element);
  };

  return (
    <EditorContainer>
      <Slate
        editor={editor}
        initialValue={value || initialValue}
        onChange={(newValue) => {
          onChange?.(newValue);
        }}
      >
        {!isReadOnly && <Toolbar />}
        <EditableContainer>
          <StyledEditable
            placeholder="Start typing your document..."
            //@ts-expect-error
            renderLeaf={renderLeaf}
            renderElement={renderElement}
            readOnly={isReadOnly}
          />
        </EditableContainer>
      </Slate>
    </EditorContainer>
  );
};
