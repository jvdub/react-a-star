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
    // (the following variable is initialized in a higher scope to an emtpy object)
    visited[currentPosition] = true; // Mark the current node as visited
    const node = maze[currentPosition]; // Get a reference to the node
    const neighbors = [...node.potentialEdges]; // Copy all potential edges (all neighbors)
  
    while (neighbors.length > 0) { // While there are neighbors remaining to visit
      const nextPosition = RandomEdge(neighbors); // Choose a neighbor to visit at random
  
      if (!(nextPosition in visited)) { // If we haven't visited the chosen neighbor
        const adjacentNode = maze[nextPosition]; // Get a reference to that node
        node.edges.push(nextPosition); // Add a connection to the chosen node from the current node
        adjacentNode.edges.push(currentPosition); // Add a connection to the current node from the chosen node
        generateMazePath(maze, nextPosition); // Move to the chosen node and repeat the process
      }
    }
  
    return maze; // When all nodes are visited, return the updated objects
    // Because JS is pass by reference for non-primitive types, the updates we make to the nodes
    // in the code above are automatically reflected in the maze object itself.
  };
  
  const generateMaze = (height, width) => {
    let maze = {}; // Initialize an empty object to build the maze in
  
    // Loop over the entire height and width
    for (let y = 0; y < width; y++) {
      for (let x = 0; x < height; x++) {
        // Create an object with a unique key in the maze object and store things of interest.
        // Mostly care about edges and potential edges, but can store othes things as needed.
        maze[_Position(x, y)] = {id: `${x}.${y}`, position: [x, y], weight: 0, edges: [], potentialEdges: []};
      }
    }
  
    // Loop over the whole maze again to get potential edges
    for (let y = 0; y < width; y++) {
      for (let x = 0; x < height; x++) {
        // Helper for the current node
        let p = _Position(x, y);
  
        for (let x2 = -1; x2 <= 1; x2++) {
          for (let y2 = -1; y2 <= 1; y2++) {
            // A little math to make sure we're only moving left, right, up, or down
            if ((x2 === 0 && y2 === 0) || (Math.abs(x2) + Math.abs(y2) !== 1)) {
              continue;
            }
  
            // Helper for the potential neighbor
            let p2 = _Position(x + x2, y + y2);
  
            // If it is a node in the maze...
            if (p2 in maze) {
              // It's a valid potential edge and ew can add it
              maze[p].potentialEdges.push(p2);
            }
          }
        }
      }
    }
  
    // We'll get to this in a moment. This method generates the path in the maze.
    maze = generateMazePath(maze, _Position(0, 0));
  
    return maze; // Return the generated maze
  };

  return generateMaze(height, width);
};

export default useMaze;
