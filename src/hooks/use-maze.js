const useMaze = (height, width) => {
  let visited = {};
  
  const _Position = (x, y) => {
    return x + '.' + y;
  };
  
  const RouletteSelect = (possibleNodes) => {
    const roll = Math.random() * possibleNodes.length;
  
    let sum = 0;
  
    for (let i = 0; i < possibleNodes.length; i++) {
      sum += 1.0;
  
      if (roll < sum) {
        const res = possibleNodes[i];
        possibleNodes = possibleNodes.splice(i, 1);
        return res;
      }
    }
  };
  
  const generateMazePath = (maze, currentPosition) => {
    visited[currentPosition] = true;
    const node = maze[currentPosition];
    const neighbors = [...node.potentialEdges];
  
    while (neighbors.length > 0) {
      const ki = RouletteSelect(neighbors);
  
      if (!(ki in visited)) {
        const adjacentNode = maze[ki];
        node.edges.push(ki);
        adjacentNode.edges.push(currentPosition);
        generateMazePath(maze, ki);
      }
    }
  
    return maze;
  };
  
  const generateMaze = (height, width) => {
    let maze = {};
  
    for (let y = 0; y < width; y++) {
      for (let x = 0; x < height; x++) {
        maze[_Position(x, y)] = {id: `${x}.${y}`, position: [x, y], weight: 0, edges: [], potentialEdges: [], bordersNeeded: {}};
      }
    }
  
    for (let y = 0; y < width; y++) {
      for (let x = 0; x < height; x++) {
        let k = _Position(x, y);
  
        for (let xi = -1; xi <= 1; xi++) {
          for (let yi = -1; yi <= 1; yi++) {
            if ((xi === 0 && yi === 0) || (Math.abs(xi) + Math.abs(yi) !== 1)) {
              continue;
            }
  
            let ki = _Position(x + xi, y + yi);
  
            if (ki in maze) {
              maze[k].potentialEdges.push(ki);
            }
          }
        }
      }
    }
  
    maze = generateMazePath(maze, _Position(0, 0));
  
    return maze;
  };

  return generateMaze(height, width);
};

export default useMaze;
