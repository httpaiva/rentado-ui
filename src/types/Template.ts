import { Descendant } from "slate";

export type Template = {
    id?: string;
    title: string;
    content: Descendant[];
  };
  