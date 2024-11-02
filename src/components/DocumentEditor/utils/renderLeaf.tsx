import React from 'react';

interface Leaf {
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
}

export const renderLeaf = ({ attributes, children, leaf }: { attributes: any; children: any; leaf: Leaf }) => {
  switch (true) {
    case leaf.bold:
      children = <strong>{children}</strong>;
      break;
    case leaf.italic:
      children = <em>{children}</em>;
      break;
    case leaf.underline:
      children = <u>{children}</u>;
      break;
    default:
      break;
  }

  return <span {...attributes}>{children}</span>;
};