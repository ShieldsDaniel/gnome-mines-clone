type AdjacentCells = {
  top: number;
  topRight: number;
  right: number;
  bottomRight: number;
  bottom: number;
  bottomLeft: number;
  left: number;
  topLeft: number;
};

const leftEdgeIndexes = (numberOfColumns: number, numberOfRows: number): number[] => {
  const indexes: number[] = [];
  for (let i = 0; i < numberOfRows; i++) {
    indexes.push(i * numberOfColumns)
  }
  return indexes;
};

const rightEdgeIndexes = (numberOfColumns: number, numberOfRows: number): number[] => {
  const indexes: number[] = [];
  for (let i = 1; i <= numberOfRows; i++) {
    indexes.push(i * numberOfColumns - 1);
  }
  return indexes;
};

const removeTop = (adjacentCells: AdjacentCells): AdjacentCells => {
  adjacentCells.topLeft = -1;
  adjacentCells.top = -1;
  adjacentCells.topRight = -1;
  return adjacentCells;
};

const removeRight = (adjacentCells: AdjacentCells): AdjacentCells => {
  adjacentCells.topRight = -1;
  adjacentCells.right = -1;
  adjacentCells.bottomRight = -1;
  return adjacentCells;
};

const removeBottom = (adjacentCells: AdjacentCells): AdjacentCells => {
  adjacentCells.bottomRight = -1;
  adjacentCells.bottom = -1;
  adjacentCells.bottomLeft = -1;
  return adjacentCells;
};

const removeLeft = (adjacentCells: AdjacentCells): AdjacentCells => {
  adjacentCells.bottomLeft = -1;
  adjacentCells.left = -1;
  adjacentCells.topLeft = -1;
  return adjacentCells;
};

const checkForCorner = (
  positionBeingChecked: number,
  numberOfColumns: number,
  numberOfRows: number,
  adjacentCells: AdjacentCells
): AdjacentCells => {
  const lastIndex = (numberOfColumns * numberOfRows) - 1;
  if (positionBeingChecked === 0) {
    adjacentCells = removeTop(adjacentCells);
    adjacentCells = removeLeft(adjacentCells);
  } else if (positionBeingChecked === lastIndex) {
    adjacentCells = removeRight(adjacentCells);
    adjacentCells = removeBottom(adjacentCells);
  } else if (positionBeingChecked === numberOfColumns - 1) {
    adjacentCells = removeTop(adjacentCells);
    adjacentCells = removeRight(adjacentCells);
  } else if (positionBeingChecked === lastIndex - numberOfColumns + 1) {
    adjacentCells = removeBottom(adjacentCells);
    adjacentCells = removeLeft(adjacentCells);
  }
  return adjacentCells;
};

const checkForEdge = (
  positionBeingChecked: number,
  numberOfColumns: number,
  numberOfRows: number,
  adjacentCells: AdjacentCells
): AdjacentCells => {
  if (positionBeingChecked < numberOfColumns) {
    adjacentCells = removeTop(adjacentCells);
  } else if (positionBeingChecked >= (numberOfColumns * numberOfRows) - numberOfRows) {
    adjacentCells = removeBottom(adjacentCells);
  } else if (leftEdgeIndexes(numberOfColumns, numberOfRows).includes(positionBeingChecked)) {
    adjacentCells = removeLeft(adjacentCells);
  } else if (rightEdgeIndexes(numberOfColumns, numberOfRows).includes(positionBeingChecked)) {
    adjacentCells = removeRight(adjacentCells);
  }
  return adjacentCells;
};

export const getAdjacentCellIndexList = (
  numberOfColumns: number,
  numberOfRows: number,
  positionBeingChecked: number
): number[] => {
  const top = positionBeingChecked - numberOfColumns;
  const bottom = positionBeingChecked + numberOfColumns;
  let adjacentCells: AdjacentCells = {
    top: top,
    topRight: top + 1,
    right: positionBeingChecked + 1,
    bottomRight: bottom + 1,
    bottom: bottom,
    bottomLeft: bottom - 1,
    left: positionBeingChecked - 1,
    topLeft: top - 1,
  };
  adjacentCells = checkForCorner(positionBeingChecked, numberOfColumns, numberOfRows, adjacentCells);
  adjacentCells = checkForEdge(positionBeingChecked, numberOfColumns, numberOfRows, adjacentCells);
  return Object.values(adjacentCells).filter(c => c >= 0).sort((a, b) => a - b);
};
