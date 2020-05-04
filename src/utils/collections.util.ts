import { Collection } from '../collection/collection.entity';

export const getPiecesIdsFromCollection = (
  collection: Collection,
): string[] => {
  let pieces: string[] = [];

  pieces = collection.pieces.map(piece => piece.id);

  collection.collections?.forEach(recursiveCollection => {
    getPiecesIdsFromCollection(recursiveCollection)?.forEach(recursivePiece => {
      pieces.push(recursivePiece);
    });
  });

  return pieces;
};
