import React from "react";
import { Transforms } from "slate";
import { ToolbarButton } from "../../styles";
import { EditorType } from "../../types";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { dynamicFieldsMap } from "@/constants/dynamicFieldsMap";

type Field = {
  name: string;
  value: string;
};

export const InsertDynamicField = ({ editor }: { editor: EditorType }) => {
  const insertField = (field: Field) => {
    const fieldNode = {
      type: "dynamicField",
      name: field.name,
      value: field.value,
      fieldName: field.name,
      children: [{ text: `{{${field.value}}}` }],
    };
    //@ts-expect-error
    Transforms.insertNodes(editor, fieldNode);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <ToolbarButton>Inserir Campo Dinâmico</ToolbarButton>
      </PopoverTrigger>
      <PopoverContent>
        <div style={{ padding: "10px" }}>
          {dynamicFieldsMap.map((field) => (
            <ToolbarButton
              key={field.value}
              onClick={() => insertField(field)}
              style={{ display: "block", margin: "5px 0" }}
            >
              {field.name}
            </ToolbarButton>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};