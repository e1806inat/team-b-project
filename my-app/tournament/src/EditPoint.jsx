import "./Editpoint.css";
import {useState,useEffect} from "react";
import Outputpoint from "./Outputpoint";

const EditPoint = ({ children }) => {
  let height = 400;
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
  ];
  const [list, setList] = useState(array);
  const [xPosition, setX] = useState(-width);

  // const update = (index, newData) => {
  //   setList(
  //     list.map((point, i) => (i === index ? newData: point))
  //   );
  // }
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
    <div
      className="side-bar"
      style={{
        transform: `translatex(${xPosition}px)`,
        width: width,
        minHeight: height,
      }}
    >
      <button
        onClick={() => toggleMenu()}
        className="toggle-menu"
        style={{
          transform: `translate(${width}px, 20vh)`,
        }}
      ></button>
      <table border="1">
        <tr>
          <td>回</td>
          <td>先行</td>
          <td>後攻</td>
        </tr>
        <Outputpoint setList={()=>setList} array={array} />
      </table>
    </div>
  );
};

export default EditPoint;
