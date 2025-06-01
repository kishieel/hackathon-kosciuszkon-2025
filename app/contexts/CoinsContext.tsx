import { createContext } from "react";

export type ICoinsContext = {
  coins: number;
  addCoins: (args: { name: string; value: number }) => Promise<void>;
}

export const CoinsContext = createContext<ICoinsContext>({
  coins: 0,
  addCoins: () => Promise.resolve(),
});