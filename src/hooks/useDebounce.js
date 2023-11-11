import {useEffect} from "react";
import {useState} from "react";

export const useDebounce = (delay = 500, value) => {
  const [debouncedVlaue, setdebouncedVlaue] = useState(value);
  useEffect(() => {
    const id = setTimeout(() => {
      setdebouncedVlaue(value);
    }, delay);
    return () => {
      clearTimeout(id);
    };
  }, [value]);
  return debouncedVlaue;
};
