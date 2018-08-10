import BlockGrid from './BlockGrid';
import Block from './Block';

describe('BlockGrid', () => {
  const blockGrid = new BlockGrid(10, 10); 

  it('fills a multidimensional array of Blocks as its grid, according to the given width and height', () => {
    const grid = blockGrid.grid;
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
    const block = blockGrid.getBlock(5,2);
    expect(block.x).toBe(5);
    expect(block.y).toBe(2);
  });

  it('gets a column given x', () => {
    const column = blockGrid.getColumn(5);
    expect(column.length).toBe(10);
    column.forEach(block => {
      expect(block.x).toBe(5);
    });
  });
});
