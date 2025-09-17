import { useEffect, useRef } from "react";

function usePlaySom<T>(item: T[]) {
  const ultimoNumero = useRef(item.length);

  useEffect(() => {
    if (item.length > ultimoNumero.current) {
      const audio = new Audio("/sinocrazy.mp3");
      audio.play().catch(console.error);
    }
    ultimoNumero.current = item.length;
  }, [item]);
}
export default usePlaySom;
