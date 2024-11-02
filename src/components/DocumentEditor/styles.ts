import { Editable } from "slate-react";
import styled from "styled-components";

// Styled Components
export const EditorContainer = styled.div`
  padding: 20px;
  max-width: 900px;
  margin: 20px auto;
  border-radius: 8px;
  background-color: #f3f4f6;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
`;

export const ToolbarContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-bottom: 10px;
  border-bottom: 1px solid #ddd;
  padding-bottom: 8px;
`;

export const ToolbarButton = styled.button`
  margin-right: 8px;
  padding: 6px 12px;
  border: none;
  background-color: #e0e7ff;
  color: #333;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;

  &:hover {
    background-color: #c7d2fe;
  }
`;

export const EditableContainer = styled.div`
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 20px;
  background-color: #fff;
`;

export const StyledEditable = styled(Editable)`
  min-height: 1123px; /* Altura semelhante a uma página A4 em pixels */
  max-width: 794px; /* Largura semelhante a uma página A4 */
  padding: 40px; /* Margens internas para o conteúdo */
  margin: 0 auto; /* Centraliza a página horizontalmente */
  background-color: #ffffff; /* Fundo branco, como uma folha de papel */
  border: 1px solid #ddd; /* Borda fina para simular a borda da página */
  border-radius: 4px; /* Bordas levemente arredondadas */
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1); /* Sombra para dar um efeito de elevação */
  font-size: 16px; /* Tamanho de fonte legível */
  line-height: 1.5; /* Espaçamento entre linhas */
  outline: none; /* Remove a borda azul padrão ao focar */
  overflow: hidden; /* Evita rolagem indesejada dentro do elemento */
`;
