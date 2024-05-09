// Libraries
import { useDispatch } from "react-redux";
import { Article } from "../Tools/Types";
import { proxy, requestTypes } from "../Tools/Proxy";
import { ADD_ARTICLE, SET_NOTIFICATION } from "../../redux/actionsCreators";

function useCreateArticle() {
  const dispatch = useDispatch();

  async function create(article: Article) {
    const { error, message, data } = await proxy(
      requestTypes.ADD_ARTICLE,
      article
    );
    if (!error) {
      dispatch(ADD_ARTICLE(data));
    }
    dispatch(SET_NOTIFICATION(message, error ? "error" : "success"));
  }

  return create;
}

export default useCreateArticle;
