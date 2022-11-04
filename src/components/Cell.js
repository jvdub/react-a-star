import './Cell.css';

const Cell = (props) => {
  return (<div className={props.classes}>{props.id}</div>);
};

export default Cell;
