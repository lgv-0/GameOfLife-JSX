import React, { useState, useEffect } from 'react';
import Grid from './Comp/Grid';
import CellState from './Classes/CellState';

function App()
{
  let [Size, setSize] = useState(300);
  let [Items, setItems] = useState([]);

  useEffect(()=>
  {
    //First run, generate default by size
    let Temp = [];
    for (let i = 0; i < Size; i++)
      for (let z = 0; z < Size; z++)
        Temp.push(new CellState(z, i, 0));
    setItems(Temp);
  }, []);

  return (
    <div>
      <Grid items={Items} size={Size} />
    </div>
  );
}

export default App;
