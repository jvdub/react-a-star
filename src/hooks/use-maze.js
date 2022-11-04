const useMaze = (height, width) => {
  let visited = {};
  
  const _Position = (x, y) => {
    return x + '.' + y;
  };
  
  const RandomEdge = (possibleNodes) => {
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
      const ki = RandomEdge(neighbors);
  
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
        let p = _Position(x, y);
  
        for (let x2 = -1; x2 <= 1; x2++) {
          for (let y2 = -1; y2 <= 1; y2++) {
            if ((x2 === 0 && y2 === 0) || (Math.abs(x2) + Math.abs(y2) !== 1)) {
              continue;
            }
  
            let p2 = _Position(x + x2, y + y2);
  
            if (p2 in maze) {
              maze[p].potentialEdges.push(p2);
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
