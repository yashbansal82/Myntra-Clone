import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { itemsActions } from "../store/itemsSlice";
import { fetchStatusActions } from "../store/fetchStatusSlice";

const FetchItems = () => {
  const fetchStatus = useSelector((store) => store.fetchStatus);
  const dispatch = useDispatch();

  useEffect(() => {
    if (fetchStatus.fetchDone) return;

    const controller = new AbortController();
    const signal = controller.signal;

    dispatch(fetchStatusActions.markFetchingStarted());
    // fetch(import.meta.env.VITE_BACKEND_URI, { signal })
    //   .then((res) => res.json())
    //   .then(({ items }) => {
    //     dispatch(fetchStatusActions.markFetchDone());
    //     dispatch(fetchStatusActions.markFetchingFinished());
    //     dispatch(itemsActions.addInitialItems(items[0]));
    //   });
    fetch(import.meta.env.VITE_BACKEND_URI, { signal })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch");
        }
        return res.json();
      })
      .then(({ items }) => {
        dispatch(fetchStatusActions.markFetchDone());
        dispatch(fetchStatusActions.markFetchingFinished());
        dispatch(itemsActions.addInitialItems(items[0]));
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        // Handle the error appropriately (e.g., display a message to the user)
      });

    // return () => {
    //   controller.abort();
    // };
  }, [fetchStatus]);

  return <></>;
};

export default FetchItems;
