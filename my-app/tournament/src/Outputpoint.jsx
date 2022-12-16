const Outputpoint = ({listup, array}) => {
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
          {phase.map((value,index2) => {
          return (
          <td><input type='text' name={index} style={{width:'50px'}} defaultValue={value} onChange={(point)=>listup(this.name,point.target.value)}></input></td>
        )
        })}
        </tr>
      );
      })}
    </>
  );
};
list = [0,'A高校',0,'C高校','高校']
export default Outputpoint;
