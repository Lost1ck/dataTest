import { useEffect, useState } from 'react';
import './App.css';
import { people } from './data/data';
import { Human } from './data/data.interface';

interface ILocalStoreGet {
  count: number | null;
}

function App() {
  const [ count, setCount ] = useState(0);

  useEffect(() => {
    const localStoreGet: ILocalStoreGet = localStorage.getItem('localState');
    const parsedState = JSON.parse(localStoreGet);
    setCount(parsedState);
    console.log('get: ' + parsedState)
  },[])

  useEffect(() => {
    if(count !== 0) localStorage.setItem('localState', JSON.stringify(count));
  }, [count])

  const debounce = (func: Function, delay: number) => {
    let timerId: NodeJS.Timeout;
    return function (...args: any[]) {
      clearTimeout(timerId);
      timerId = setTimeout(() => func.apply(this, args), delay);
    }
  };

  const handleClick = debounce(() => {
    console.log('yes');
  }, 3000)

  const handleClickWithCount = () => {
    handleClick();
    setCount((prev) => prev + 1);
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
      <button onClick={handleClickWithCount}>
          {count}
      </button>
      </>
  );
}

export default App;
