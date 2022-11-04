import useMaze from '../hooks/use-maze';
import Cell from './Cell';
import './Maze.css';
  
const getBorderClasses = (node) => {
  let left = true;
  let right = true;
  let top = true;
  let bottom = true;

  for (let edgeKey of node.edges) {
    let [edgeX, edgeY] = edgeKey.split('.').map(i => +i);
    
    if (edgeX < node.position[0] && edgeY === node.position[1]) {
      left = false;
    }
    if (edgeX > node.position[0] && edgeY === node.position[1]) {
      right = false;
    }
    if (edgeX === node.position[0] && edgeY < node.position[1]) {
      top = false;
    }
    if (edgeX === node.position[0] && edgeY > node.position[1]) {
      bottom = false;
    }
  }

  let classes = '';
  
  if (left) {
    classes += 'left ';
  }
  if (right) {
    classes += 'right ';
  }
  if (top) {
    classes += 'top ';
  }
  if (bottom) {
    classes += 'bottom';
  }

  return classes.trim();
};

const Maze = (props) => {
  const maze = useMaze(props.height, props.width);
  let elements = [];

  for (let [key, node] of Object.entries(maze)) {
    let classNames = getBorderClasses(node);
    elements.push(<Cell key={key} classes={classNames} id={node.id} />);
  }

  return (
    <div className='container'>
      {elements}
    </div>
  );
};

export default Maze;
