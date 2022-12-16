const Outputpoint = (props) => {
  // let cnt = 0;
  // let array2 = []
  // for(var i; i<9; i++){
  //   array2[i]=[array[0][i],array[1][i]];
  // }

  return (
    <>
      {props.array.map((phase, index) => {
        return (
          <tr>
            <td>{index + 1}</td>
            {phase.map((value, index2) => {
              // console.log(index,index2);
              return (
                <td>
                <input type='text' 
                // name={[index,index2]} 
                style={{ width: '50px' }} 
                defaultValue={value} 
                onChange={(point) => props.listup([index,index2], point.target.value)}
                >
                </input>
                </td>
              )
            })}
          </tr>
        );
      })}
    </>
  );
};

export default Outputpoint;
