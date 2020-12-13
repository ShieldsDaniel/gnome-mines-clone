import { getAdjacentCellIndexList as subject } from "./getAdjacentCellIndexList";

describe("The getAdjacentCellIndexList module", () => {

  it("Should retrieve the correct 8 adjacent cell indexes for any cell not on the edge of the board", () => {
    const numberOfColumns = [5, 10];
    const numberOfRows = [5, 8];
    const positionsBeingChecked = [
      [6, 12],
      [22, 36],
    ];
    const expectedResults = [
      [
        [0, 1, 2, 5, 7, 10, 11, 12],
        [6, 7, 8, 11, 13, 16, 17, 18],
      ],
      [
        [11, 12, 13, 21, 23, 31, 32, 33],
        [25, 26, 27, 35, 37, 45, 46, 47],
      ],
    ];
    for (let i = 0; i < positionsBeingChecked.length; i++) {
      for (let j = 0; j < positionsBeingChecked[i].length; j++) {
        const result = subject(numberOfColumns[i], numberOfRows[i], positionsBeingChecked[i][j]);
        expect(result).toStrictEqual(expectedResults[i][j])
      }
    }
  });

  it("Should retrieve the correct 5 adjacent cell indexes for an edge cell", () => {
    const numberOfColumns = [5, 10];
    const numberOfRows = [5, 8];
    const positionsBeingChecked = [
      [1, 5, 15, 23],
      [3, 30, 59, 74],
    ];
    const expectedResults = [
      [
        [0, 2, 5, 6, 7],
        [0, 1, 6, 10, 11],
        [10, 11, 16, 20, 21],
        [17, 18, 19, 22, 24],
      ],
      [
        [2, 4, 12, 13, 14],
        [20, 21, 31, 40, 41],
        [48, 49, 58, 68, 69],
        [63, 64, 65, 73, 75],
      ],
    ];
    for (let i = 0; i < positionsBeingChecked.length; i++) {
      for (let j = 0; j < positionsBeingChecked[i].length; j++) {
        const result = subject(numberOfColumns[i], numberOfRows[i], positionsBeingChecked[i][j]);
        expect(result).toStrictEqual(expectedResults[i][j])
      }
    }
  });

  it("Should retrieve the correct 3 adjacent cell indexes for a corner cell", () => {
    const numberOfColumns = [5, 10];
    const numberOfRows = [5, 8];
    const positionsBeingChecked = [
      [0, 4, 20, 24],
      [0, 9, 70, 79],
    ];
    const expectedResults = [
      [
        [1, 5, 6],
        [3, 8, 9],
        [15, 16, 21],
        [18, 19, 23],
      ],
      [
        [1, 10, 11],
        [8, 18, 19],
        [60, 61, 71],
        [68, 69, 78],
      ],
    ];
    for (let i = 0; i < positionsBeingChecked.length; i++) {
      for (let j = 0; j < positionsBeingChecked[i].length; j++) {
        const result = subject(numberOfColumns[i], numberOfRows[i], positionsBeingChecked[i][j]);
        expect(result).toEqual(expectedResults[i][j])
      }
    }
  });
});
