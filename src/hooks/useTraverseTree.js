import { useCallback } from "react";

const useTraverseTree = () => {
  // Função para inserir um nó na estrutura de árvore
  const insertNode = useCallback((tree, folderId, item, isFolder) => {
    if (!tree) return null;

    // Se encontramos a pasta correta, adicionamos o novo item
    if (tree.id === folderId) {
      const newItem = {
        id: Date.now(), // Gera um ID único
        name: item,
        isFolder: isFolder,
        items: isFolder ? [] : null, // Se for pasta, cria um array vazio, se for arquivo, deixa null
      };

      return { ...tree, items: [...tree.items, newItem] };
    }

    // Se a pasta não foi encontrada, percorremos recursivamente os itens filhos
    if (tree.items && tree.items.length > 0) {
      const updatedItems = tree.items.map((child) =>
        insertNode(child, folderId, item, isFolder)
      );

      return { ...tree, items: updatedItems };
    }

    return tree;
  }, []);

  return { insertNode };
};

export default useTraverseTree;
