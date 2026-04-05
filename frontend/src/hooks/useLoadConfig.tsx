// Libraries
import { useEffect } from "react";
import { useDispatch } from "react-redux";
// Configuration Files
import { Article } from "../constants/types";
import { proxy, requestTypes } from "../components/api/Proxy";
import { useNotification } from "../redux/selectors";
import { SET_ARTICLES, SET_NOTIFICATION } from "../redux/actionsCreators";

function useLoadConfig() {
  const dispatch = useDispatch();
  const notification = useNotification();

  useEffect(() => {
    async function fetchData() {
      const { error, message, data } = await proxy(requestTypes.FETCH_ARTICLES);
      if (!error) {
        const articles = data as Article[];
        dispatch(SET_ARTICLES(articles));
        return;
      }
      dispatch(SET_NOTIFICATION(message, "error"));
    }

    fetchData().catch((err) => console.error(err));
  }, [dispatch, notification]);
}

export default useLoadConfig;
