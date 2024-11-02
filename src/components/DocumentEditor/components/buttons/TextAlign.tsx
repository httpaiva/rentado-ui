import React from 'react';
import { Transforms, Element } from 'slate';
import { ToolbarButton } from '../../styles';
import { EditorType } from '../../types';
import { AlignLeft, AlignCenter, AlignRight, AlignJustify } from 'lucide-react';

export const TextAlign = ({ editor }: { editor: EditorType }) => {
  const setAlignment = (alignment: string) => {
    // Aplica a propriedade de alinhamento ao nó selecionado
    Transforms.setNodes(
      editor,
      { align: alignment }, // Define a propriedade de alinhamento
      { match: n => Element.isElement(n) } // Aplica apenas em nós de elementos
    );
  };

  return (
    <div>
      <ToolbarButton onClick={() => setAlignment('left')}>
        <AlignLeft />
      </ToolbarButton>
      <ToolbarButton onClick={() => setAlignment('center')}>
        <AlignCenter />
      </ToolbarButton>
      <ToolbarButton onClick={() => setAlignment('right')}>
        <AlignRight />
      </ToolbarButton>
      <ToolbarButton onClick={() => setAlignment('justify')}>
        <AlignJustify />
      </ToolbarButton>
    </div>
  );
};