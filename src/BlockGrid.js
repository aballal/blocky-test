import Block from './Block';
import { find } from 'lodash';

class BlockGrid {
  constructor(width = 5, height = 5) {
    this.width = width;
    this.height = height;
    this.grid = [];

    for (let x = 0; x < this.width; x++) {
      const col = [];
      for (let y = 0; y < this.height; y++) {
        col.push(new Block(x, y));
      }

      this.grid.push(col);
    }
  }

  getBlock(x, y) {
    if (x < this.width && y < this.height) {
      return this.grid[x][y];
    }
  }

  getColumn(x, y) {
    return this.grid[x];
  }

  getSameColouredNeighbours(block) {
    const sameColouredNeighbours = [];

    if (block) {
      const above = block.y >= this.height - 1 ? undefined : this.getBlock(block.x, block.y + 1); 
      const below = block.y > 0 ? this.getBlock(block.x, block.y - 1) : undefined;
      const left = block.x > 0 ? this.getBlock(block.x - 1, block.y) : undefined;
      const right = block.x >= this.width - 1 ? undefined : this.getBlock(block.x + 1, block.y); 

      [above, below, left, right].forEach(neighbour => {
        if (neighbour && block.colour === neighbour.colour) {
          sameColouredNeighbours.push(neighbour);
        }
      });
    }
    return sameColouredNeighbours;
  }

  render(el = document.getElementById('gridEl')) {
    for (let x = 0; x < this.width; x++) {
      const id = 'col_' + x;
      const colEl = document.createElement('div');
      colEl.id = id;
      colEl.className = 'col';
      el.appendChild(colEl);

      for (let y = this.height - 1; y >= 0; y--) {
        const block = this.grid[x][y];
        const id = `block_${x}x${y}`;
        const blockEl = document.createElement('div');

        blockEl.id = id;
        blockEl.className = 'block';
        blockEl.style.background = block.colour;
        blockEl.addEventListener('click', evt => this.blockClicked(evt, block));
        colEl.appendChild(blockEl);
      }
    }
  }

  updateColumns() {
    for(let x = 0; x < this.width; x++) {
      const column = this.getColumn(x);
      const columnColours = column.map(block => block.getColour());

      const nonGreys = columnColours.filter(colour => colour !== 'grey');
      const greys = columnColours.filter(colour => colour === 'grey');
      const newColumnColours =  nonGreys.concat(greys);

      for(let y = 0; y < this.height; y++) {
        const block = this.getBlock(x,y);
        block.colour = newColumnColours[y];
        document.getElementById(`block_${block.x}x${block.y}`).style.background = newColumnColours[y];
      }
    }
  }

  blockClicked(e, clickedBlock) {
    console.log(e, clickedBlock);
    const sameColouredNeighbours = this.getSameColouredNeighbours(clickedBlock);

    for(let i = 0; i < sameColouredNeighbours.length; i++) {
      console.log(JSON.stringify(sameColouredNeighbours));
      const neighbour = sameColouredNeighbours[i];
      const moreSameColouredNeighbours = this.getSameColouredNeighbours(neighbour);
      moreSameColouredNeighbours.forEach(neighboursNeighbour => {
        if (find(sameColouredNeighbours, neighboursNeighbour) === undefined) {
          sameColouredNeighbours.push(neighboursNeighbour);
        }
      });
    }

    [clickedBlock].concat(sameColouredNeighbours).forEach(neighbour => {
      neighbour.colour = 'grey';
    });

    this.updateColumns();
  }
}

export default BlockGrid;
