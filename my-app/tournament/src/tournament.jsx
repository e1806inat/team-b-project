import React from 'react';

const Tournament = ({value}) =>{
  return(
    <div>
      <button>{value.name}</button>
    </div>
  );
}

export default Tournament;