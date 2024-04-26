import { useEffect, useState } from 'react';
import './App.css';
import { people } from './data/data';
import { Human } from './data/data.interface';

interface ILocalStoreGet {
  count: number;
}

function App() {
  const [ count, setCount ] = useState(0);

  useEffect(() => {
    const localStoreGet: ILocalStoreGet = sessionStorage.getItem('localState');
    const parsedState = JSON.parse(localStoreGet);
    if(parsedState !== null) setCount(parsedState);
  },[])

  useEffect(() => {
    if(count !== 0 && count !== null) sessionStorage.setItem('localState', JSON.stringify(count));
  }, [count])

  const debounce = (func: (...args: unknown[]) => void, delay: number) => {
    let timerId: number;
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
    return data.map((item) => {
      return `${item.name}`
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
