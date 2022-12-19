import "./Editpoint.css";
import { useState, useEffect } from "react";
import Outputpoint from "./Outputpoint";

const EditPoint = ({ children }) => {
  let width = 200;
  let array = [
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0]
  ];
  const [list, setList] = useState(array);
  const [xPosition, setX] = useState(width);

  const listup = (index, point) => {
    const tem = index.split(',');
    list[tem[0]][tem[1]] = parseInt(point);
    setList(list);
  }

  const toggleMenu = () => {
    if (xPosition < 0) {
      setX(0);
    } else {
      setX(-width);
    }
  };

  useEffect(() => {
    setX(0);
  }, []);

  return (
    <>
      <button
        onClick={() => toggleMenu()}
        className="toggle-menu"
      ></button>
      <div
        className="side-bar"
        style={{
          transform: `translatex(${xPosition}px)`,
          width: width,
          right:-width
        }}
      >
        <table border="1">
          <tr>
            <td>回</td>
            <td>先行</td>
            <td>後攻</td>
          </tr>
          <Outputpoint listup={listup} array={array} />
        </table>
        <button
        // onClick={()=>()}
        className="ch-points"
        >変更</button>
      </div>
    </>
  );
};

export default EditPoint;
