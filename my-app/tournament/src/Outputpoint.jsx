const Outputpoint = ({listup,array}) => {
  
  return (
    <>
      {array.map((phase, index) => {
        return (
          <tr>
            <td>{index + 1}</td>
            {phase.map((value, index2) => {
              return (
                <td>
                <input type='number' 
                min={0}
                name={[index,index2]} 
                style={{width:'50px'}} 
                defaultValue={value} 
                onChange={(point) => listup(point.target.name, point.target.value)}
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
