const Outputpoint = ({ array }) => {
  // let cnt = 0;
  // let array2 = []
  // for(var i; i<9; i++){
  //   array2[i]=[array[0][i],array[1][i]];
  // }

  return(
    <>
      {array.map((phase,index) => {
      return (
        <tr>
          <td>{index+1}</td>
          {phase.map((value) => {
          return (
          <td><input type='text' style={{width:'50px'}} defaultValue={value}></input></td>
        )
        })}
        </tr>
      );
      })}
    </>
  );
};

export default Outputpoint;
