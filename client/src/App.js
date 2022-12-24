import React, { useState, useEffect} from 'react';

const App = () => {
  const [data, setData] = useState([{}])

  useEffect(() => {
    fetch("/hello").then(
      res => res.json()
    ).then(
      data => {
        setData(data)
        console.log(data)
      }
    )
  }, [])

  return (
    <div>
      <p>{data.hello}</p>
    </div>
  );
};

export default App;
