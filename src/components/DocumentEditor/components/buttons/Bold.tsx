import React from 'react';
import { Editor } from 'slate';
import { ToolbarButton } from '../../styles';
import { EditorType } from '../../types';

export const Bold = ({ editor } : { editor: EditorType}) => {
  const toggleBold = () => {
    //@ts-expect-error
    const isActive = Editor.marks(editor)?.bold;
    if (isActive) {
      Editor.removeMark(editor, 'bold');
    } else {
      Editor.addMark(editor, 'bold', true);
    }
  };

  return <ToolbarButton onClick={toggleBold}>B</ToolbarButton>;
};