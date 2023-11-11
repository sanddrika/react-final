import {useCallback} from "react";
import {useState} from "react";
import {axiosInstance} from "../helper";

export const useFetchData = () => {
  const [state, setState] = useState({
    loading: false,
    error: null,
    data: null,
  });

  const getData = useCallback(async (url) => {
    try {
      setState((prev) => ({...prev, loading: true}));
      const {data} = await axiosInstance.get(url);
      setState((prev) => ({...prev, data, loading: false}));
    } catch (error) {
      setState((prev) => ({...prev, loading: false, error}));
    }
  }, []);

  return {
    ...state,
    setState,
    getData,
  };
};
