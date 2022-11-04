import './Cell.css';

const Cell = (props) => {
  return (<div className={props.classes}>{props.children}</div>);
};

export default Cell;
