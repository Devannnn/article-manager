// Libraries
import { useSelector } from "react-redux";
import { RootState } from "./store";
import { Article, Notification, Tag } from "../components/Tools/Types";

export const useNotification = (): Notification =>
  useSelector((state: RootState) => state.notification);

export const useArticles = (): Article[] =>
  useSelector((state: RootState) => state.articles);

export const useTags = (): Tag[] =>
  useSelector((state: RootState) => state.tags);
