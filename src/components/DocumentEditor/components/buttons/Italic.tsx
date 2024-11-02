import React from 'react';
import { Editor } from 'slate';
import { EditorType } from '../../types';
import { ToolbarButton } from '../../styles';

export const Italic = ({ editor }: {editor: EditorType}) => {
  const toggleItalic = () => {
    //@ts-expect-error
    const isActive = Editor.marks(editor)?.italic;
    if (isActive) {
      Editor.removeMark(editor, 'italic');
    } else {
      Editor.addMark(editor, 'italic', true);
    }
  };

  return <ToolbarButton onClick={toggleItalic}>I</ToolbarButton>;
};