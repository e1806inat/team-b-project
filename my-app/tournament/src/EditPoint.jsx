import "./Editpoint.css";
import {useState,useEffect} from "react";
import Outputpoint from "./Outputpoint";

const EditPoint = ({ children }) => {
  let height = 400;
  let width = 200;
  let array = [
    [1, 0],
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
  console.log(list);
  const [xPosition, setX] = useState(-width);

  // const update = (index, newData) => {
  //   setList(
  //     list.map((point, i) => (i === index ? newData: point))
  //   );
  // }
  // const tem = list.find((value, index2)=>{
  //   value.find((value2,index3)=>{
  //     console.log(value2);
  //   })
  //   // console.log(index2);
  // });

  const listup = (index,point)=>{
    console.log(index);
    // const tem1 = index[0];
    // const tem2 = index[1];
    // const newList = [...list];
    // const tem = newList.find((value, index2)=> index2 === index);
    // const tem = newList.find((value, index2)=>{

    //   console.log(index2,value);
    // });
    // const tem = newList.find((value, index2)=>{
    //   value.find((value2,index3)=>index3 === {
    //     console.log(value2);
    //   })
    // });
    // setList(newList);
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
        <Outputpoint listup={()=>listup()} array={array} />
      </table>
    </div>
  );
};

export default EditPoint;
