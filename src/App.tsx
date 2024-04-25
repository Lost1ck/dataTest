import { useState } from 'react';
import './App.css';
import { people } from './data/data';
import { Human } from './data/data.interface';

function App() {
  const [ count, setCount ] = useState(0);

  const handleClick = () => {
    setTimeout(() => {
      console.log(count);
    }, 3000)
  }

  const peopleCount = (data: Human[]) => {
    return data.map((item, index) => {
      return `${item.name} and ${index}`
    })
  }


  return (
      <>
      <ul>
      {peopleCount(people).map((item, index) => {
        return <li key={index}>{item}</li>;
      })}
    </ul>
      <button onClick={() => {handleClick(); setCount((prev) => prev + 1)}}>
          {count}
      </button>
      </>
  );
}

export default App;
