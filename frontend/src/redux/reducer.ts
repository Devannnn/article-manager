// Libraries
import actionsTypes from "./actionsTypes";
import { Notification, Article, Tag } from "../constants/types";

type State = {
  notification: Notification;
  articles: Article[];
  tags: Tag[];
  isDarkMode: boolean;
};

const initialState: State = {
  notification: {
    open: false,
    message: "",
    severity: "info",
  },
  articles: [],
  tags: [],
  isDarkMode: false,
};

export default function reducer(state = initialState, action: any) {
  switch (action.type) {
    case actionsTypes.SET_NOTIFICATION:
      return {
        ...state,
        notification: action.payload.newNotification,
      };
    case actionsTypes.SET_TAGS:
      return {
        ...state,
        tags: action.payload.newTags,
      };
    case actionsTypes.SET_ARTICLES:
      return {
        ...state,
        articles: action.payload.newArticles,
      };
    case actionsTypes.ADD_ARTICLE:
      return {
        ...state,
        articles: [...state.articles, action.payload.newArticle],
      };
    case actionsTypes.EDIT_ARTICLE:
      return {
        ...state,
        articles: state.articles.map((article) =>
          article.id === action.payload.id ? action.payload.article : article
        ),
      };
    case actionsTypes.DELETE_ARTICLE:
      return {
        ...state,
        articles: state.articles.filter(
          (article) => article.id !== action.payload.id
        ),
      };
    case actionsTypes.SET_DARK_MODE:
      return {
        ...state,
        isDarkMode: action.payload.isDarkMode,
      };
    default:
      return state;
  }
}
