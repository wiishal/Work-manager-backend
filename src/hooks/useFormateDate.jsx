import { useState, useEffect } from "react";

export function useFormatDate() {
  const [date, setDate] = useState("")

  useEffect(() => {
    const today = new Date();
    
    const formattedDate = today.toISOString().split("T")[0];

    setDate(formattedDate);
  }, []);

  return { date };
}
