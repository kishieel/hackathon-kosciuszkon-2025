import { CoinsContext } from "@/app/contexts/CoinsContext";
import * as SQLite from 'expo-sqlite';
import React, { PropsWithChildren, useEffect, useState } from "react";

const db = await SQLite.openDatabaseAsync('eco');

export const CoinsProvider = ({ children }: PropsWithChildren<true>) => {
  const [coins, setCoins] = useState(0);

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        await db.execAsync(`create table if not exists coins (id integer primary key autoincrement, name text, value integer, date text)`);
        const coins = await db.getFirstAsync(`select sum(value) as total from coins`);
        console.log("Fetched coins:", coins);
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