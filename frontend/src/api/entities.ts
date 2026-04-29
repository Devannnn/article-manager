import axios from 'axios';
import { API_URLS } from '../constants/constants';
import type { Article, AuthorStat, Credentials, Message } from '../constants/types';
import {
  MessageSchema,
  DeletedArticlesSchema,
  DeletedEntitiesSchema,
  EntitySchema,
  EntitiesSchema,
  AuthorStatSchema,
  ArticleSchema,
  ArticlesSchema,
} from '../constants/schema';
import { getCookie, normalizeEntityNames } from '../helpers/helpers';

const apiClient = axios.create();

apiClient.defaults.withCredentials = true;

apiClient.interceptors.request.use((config) => {
  const csrf_access_token = getCookie('csrf_access_token');
  if (csrf_access_token) {
    config.headers['X-CSRF-TOKEN'] = csrf_access_token;
  }

  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status !== 401 || originalRequest._retry) {
      return Promise.reject(error);
    }
    originalRequest._retry = true;
    await authApi.refresh();
    return apiClient(originalRequest);
  },
);

export const healthApi = {
  status: async (): Promise<Message> => {
    const { data } = await axios.get(API_URLS.HEALTH);
    const result = MessageSchema.parse(data);
    return result;
  },
};

export const authApi = {
  register: async (credentials: Credentials): Promise<Message> => {
    const { data } = await apiClient.post(API_URLS.REGISTER, credentials);
    const result = MessageSchema.parse(data);
    return result;
  },
  login: async (credentials: Credentials): Promise<Message> => {
    const { data } = await apiClient.post(API_URLS.LOGIN, credentials);
    const result = MessageSchema.parse(data);
    return result;
  },
  refresh: async (): Promise<Message> => {
    const csrf_refresh_token = getCookie('csrf_refresh_token');

    if (!csrf_refresh_token) {
      throw new Error('Missing refresh CSRF cookie');
    }

    const axiosClient = axios.create();
    axiosClient.defaults.withCredentials = true;
    const { data } = await axiosClient.post(
      API_URLS.REFRESH,
      {},
      {
        headers: {
          'X-CSRF-TOKEN': csrf_refresh_token,
        },
      },
    );
    const result = MessageSchema.parse(data);
    return result;
  },
  logout: async (): Promise<Message> => {
    const { data } = await apiClient.post(API_URLS.LOGOUT);
    const result = MessageSchema.parse(data);
    return result;
  },
};

export const articlesApi = {
  list: async (): Promise<Article[]> => {
    const { data } = await apiClient.get(API_URLS.ARTICLES);
    const response = ArticlesSchema.parse(data);
    return response;
  },
  create: async (article: Article): Promise<Article> => {
    const { data } = await apiClient.post(API_URLS.ARTICLES, article);
    const response = ArticleSchema.parse(data);
    return response;
  },
  update: async (article: Article): Promise<Article> => {
    const { data } = await apiClient.put(API_URLS.ARTICLES, article);
    const response = ArticleSchema.parse(data);
    return response;
  },
  remove: async (ids: number[]): Promise<number> => {
    const { data } = await apiClient.delete(API_URLS.ARTICLES, {
      data: { ids },
    });
    const response = DeletedArticlesSchema.parse(data);
    return response.count;
  },
};

export const authorsApi = {
  list: async (): Promise<string[]> => {
    const { data } = await apiClient.get(API_URLS.AUTHORS);
    const response = EntitiesSchema.parse(data);
    return normalizeEntityNames(response);
  },
  list_top: async (): Promise<AuthorStat[]> => {
    const { data } = await apiClient.get(API_URLS.TOP_AUTHORS);
    const response = AuthorStatSchema.parse(data);
    return response;
  },
  create: async (author: string): Promise<string> => {
    const { data } = await apiClient.post(API_URLS.AUTHORS, author);
    const response = EntitySchema.parse(data);
    return response.name;
  },
  update: async (author: string): Promise<string> => {
    const { data } = await apiClient.put(API_URLS.AUTHORS, author);
    const response = EntitySchema.parse(data);
    return response.name;
  },
  remove: async (ids: number[]): Promise<number> => {
    const { data } = await apiClient.delete(API_URLS.AUTHORS, {
      data: { ids },
    });
    const response = DeletedEntitiesSchema.parse(data);
    return response.count;
  },
};

export const tagsApi = {
  list: async (): Promise<string[]> => {
    const { data } = await apiClient.get(API_URLS.TAGS);
    const response = EntitiesSchema.parse(data);
    return normalizeEntityNames(response);
  },
  create: async (tag: string): Promise<string> => {
    const { data } = await apiClient.post(API_URLS.TAGS, tag);
    const response = EntitySchema.parse(data);
    return response.name;
  },
  update: async (tag: string): Promise<string> => {
    const { data } = await apiClient.put(API_URLS.TAGS, tag);
    const response = EntitySchema.parse(data);
    return response.name;
  },
  remove: async (ids: number[]): Promise<number> => {
    const { data } = await apiClient.delete(API_URLS.TAGS, {
      data: { ids },
    });
    const response = DeletedEntitiesSchema.parse(data);
    return response.count;
  },
};
