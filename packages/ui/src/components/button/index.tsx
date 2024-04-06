import { ComponentProps } from 'react';

export type BaseButtonProps = ComponentProps<'button'>;

export default function Button({ className, ...props }: BaseButtonProps) {
  return (
    <button
      className={`px-4 py-4 bg-red-500 rounded-lg ${className}`}
      {...props}
    />
  );
}
