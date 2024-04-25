import {
  decrement,
  increment,
  incrementByAmount,
  selectCount,
} from '../../features/counter/counterSlice';
import { useAppDispatch, useAppSelector } from '../../store';

export function useCounter() {
  const counterValue = useAppSelector(selectCount);
  const dispatch = useAppDispatch();
  const handleIncrement = () => dispatch(increment());
  const handleDecrement = () => dispatch(decrement());

  const handleIncrementByAmount = (amount: number) =>
    dispatch(incrementByAmount(amount));

  return {
    counterValue,
    handleIncrement,
    handleDecrement,
    handleIncrementByAmount,
  };
}
