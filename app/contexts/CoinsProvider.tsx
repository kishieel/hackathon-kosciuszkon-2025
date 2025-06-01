import { CoinsContext } from "@/app/contexts/CoinsContext";
import * as SQLite from "expo-sqlite";
import React, { PropsWithChildren, useEffect, useState } from "react";

export const CoinsProvider = ({ children }: PropsWithChildren<{}>) => {
  const [coins, setCoins] = useState(0);
  const db = SQLite.useSQLiteContext()

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const coins = await db.getFirstAsync<{ total: number }>(`select sum(value) as total from coins`);
        setCoins(coins?.total || 0);
      } catch (error) {
        console.error("Error fetching coins:", error);
      }
    };

    fetchCoins();
  }, []);

  type AddCoinsArgs = {
    name: string;
    value: number;
  };

  const addCoins = async (args: AddCoinsArgs) => {
    const newAmount = coins + args.value;

    try {
      await db.runAsync(`insert into coins (name, value, date) values (?, ?, ?)`, [args.name, args.value, new Date().toISOString()]);
      setCoins(newAmount);
    } catch (error) {
      console.error("Error adding coins:", error);
    }
  }

  return (
    <CoinsContext.Provider value={{ coins, addCoins }}>
      {children}
    </CoinsContext.Provider>
  );
}