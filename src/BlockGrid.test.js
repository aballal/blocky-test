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

  it('gets a block given x and y', () => {
    const blockGrid = new BlockGrid(10, 10);
    const block = blockGrid.getBlock(5,2);
    expect(block.x).toBe(5);
    expect(block.y).toBe(2);
  });

  it('gets a column given x', () => {
    const blockGrid = new BlockGrid(10, 10);
    const column = blockGrid.getColumn(5);
    expect(column.length).toBe(10);
    column.forEach(block => {
      expect(block.x).toBe(5);
    });
  });

  it('finds all neighbouring same coloured blocks', () => {
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
    const block = blockGrid.getBlock(3,1);
    blockGrid.getSameColouredNeighbours(block);
    
    jest.clearAllMocks();
  });
});
