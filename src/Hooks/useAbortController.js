import { useRef } from "react";

export function useAbortController() {
  const ref = useRef();

  const updateController = () => {
    if (ref.current) {
      ref.current.abort();
    }
    ref.current = new AbortController();
    return ref.current;
  };

  return { updateController };
}
