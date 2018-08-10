import BlockGrid from './BlockGrid';
import Block from './Block';

describe('BlockGrid', () => { 

  it('fills a multidimensional array of Blocks as its grid, according to the given width and height', () => {
    const grid = new BlockGrid(10, 10).grid;
    expect(grid.length).toBe(10);

    grid.forEach(column => {
      expect(column.length).toBe(10);

      column.forEach(block => {
        expect(block).toBeInstanceOf(Block);
      });
    });
    
    const gridB = new BlockGrid(3, 5).grid;

    expect(gridB.length).toBe(3);

    gridB.forEach(column => {
      expect(column.length).toBe(5);
    });
  });

  it('getBlock gets a block given x and y', () => {
    const blockGrid = new BlockGrid(10, 10);
    const block = blockGrid.getBlock(5,2);
    expect(block.x).toBe(5);
    expect(block.y).toBe(2);
  });

  it('getColumn gets a column given x', () => {
    const blockGrid = new BlockGrid(10, 10);
    const column = blockGrid.getColumn(5);
    expect(column.length).toBe(10);
    column.forEach(block => {
      expect(block.x).toBe(5);
    });
  });

  describe('context: mocked randomness of colours for testability', () => {
    const RED = 0.2;
    const GREEN = 0.4;
    const BLUE = 0.6;
    const YELLOW = 0.8;

    let lastIndex = 0;
    
    const mockMath = Object.create(global.Math);
    mockMath.random = () => {
      const randomValues = [
        GREEN, YELLOW, GREEN, GREEN, BLUE,
        YELLOW, YELLOW, RED, GREEN, GREEN,
        RED, BLUE, BLUE, GREEN, YELLOW,
        RED, BLUE, GREEN, YELLOW, RED,
        BLUE, BLUE, BLUE, RED, GREEN
      ]
      return randomValues[lastIndex++];
    };
    global.Math = mockMath;

    const blockGrid = new BlockGrid(5, 5); 

    afterEach(() => {
      jest.clearAllMocks();
    });

    describe('getSameColouredNeighbours finds neighbouring same coloured blocks', () => {
      it('for an inner block', () => {
        const block = blockGrid.getBlock(3,1);
        const sameColouredNeighbours = blockGrid.getSameColouredNeighbours(block);
        expect(sameColouredNeighbours).toEqual([{ x: 2, y: 1, colour: 'blue' }, { x: 4, y: 1, colour: 'blue' } ]);
      });

      it('for a block in the leftmost column', () => {
        const block = blockGrid.getBlock(0,2);
        const sameColouredNeighbours = blockGrid.getSameColouredNeighbours(block);
        expect(sameColouredNeighbours).toEqual([{ x: 0, y: 3, colour: 'green' }]);
      });

      it('for a block in the rightmost column', () => {
        const block = blockGrid.getBlock(4,2);
        const sameColouredNeighbours = blockGrid.getSameColouredNeighbours(block);
        expect(sameColouredNeighbours).toEqual([{ x: 4, y: 1, colour: 'blue' }]);
      });

      it('for a block in the topmost row', () => {
        const block = blockGrid.getBlock(1,4);
        const sameColouredNeighbours = blockGrid.getSameColouredNeighbours(block);
        expect(sameColouredNeighbours).toEqual([{ x: 1, y: 3, colour: 'green' }]);
      });

      it('for a block in the bottommost row', () => {
        const block = blockGrid.getBlock(4,0);
        const sameColouredNeighbours = blockGrid.getSameColouredNeighbours(block);
        expect(sameColouredNeighbours).toEqual([{ x: 4, y: 1, colour: 'blue' }]);
      });
    });
  });
});
