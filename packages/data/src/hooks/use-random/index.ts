export type UseRandomProps = {
  multiplier: number;
};

export function useRandom({ multiplier }: UseRandomProps) {
  return {
    randomizedValue: Math.random() * multiplier,
  };
}
