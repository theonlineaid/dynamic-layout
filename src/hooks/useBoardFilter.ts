import { useState, useMemo } from "react";
import { MarketData } from "../context/MarketContext";

const availableBoards = [
  "Main Board",
  "Alternative Trading Board",
  "Small Cap Board",
];

export const useBoardFilter = (initialData: MarketData[]) => {
  const [selectedBoard, setSelectedBoard] = useState<string>("");

  const filteredData = useMemo(() => {
    if (!selectedBoard) {
      return initialData; // No filter applied, return all data
    }
    return initialData.filter(item => item.board === selectedBoard);
  }, [initialData, selectedBoard]);

  return {
    filteredData,
    availableBoards,
    selectedBoard,
    setSelectedBoard,
  };
};