import { CoinsContext } from "@/app/contexts/CoinsContext";
import { useContext } from "react";

export const useCoins = () => {
  return useContext(CoinsContext);
}