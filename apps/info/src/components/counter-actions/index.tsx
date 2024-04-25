import { useCounter } from '@mfe-tutorial/data';
import { Button } from '@mfe-tutorial/ui';
import React from 'react';

export default function CounterActions() {
  const {
    counterValue,
    handleDecrement,
    handleIncrement,
    handleIncrementByAmount,
  } = useCounter();

  return (
    <div>
      <h1>Counter: {counterValue}</h1>
      <Button onClick={handleIncrement}>Increment</Button>
      <Button onClick={handleDecrement}>Decrement</Button>
      <Button onClick={() => handleIncrementByAmount(5)}>Increment by 5</Button>
    </div>
  );
}
