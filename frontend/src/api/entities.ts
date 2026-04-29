import axios from 'axios';
import { API_URLS } from '../constants/constants';
import type { Article, AuthorStat, Credentials, Entity, Token, AccessToken, Message } from '../constants/types';
import {
  MessageSchema,
  TokenSchema,
  RefreshTokenSchema,
  DeletedArticlesSchema,
  DeletedEntitiesSchema,
  EntitySchema,
  EntitiesSchema,
  AuthorStatSchema,
  ArticleSchema,
  ArticlesSchema,
} from '../constants/schema';

const apiClient = axios.create();

function normalizeEntityNames(entities: Array<string | Entity>): string[] {
  return entities.map((entity) => (typeof entity === 'string' ? entity : entity.name));
}

apiClient.interceptors.request.use((config) => {
  const token = sessionStorage.getItem('access_token');

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
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

    const { access_token } = await authApi.refresh();

    sessionStorage.setItem('access_token', access_token);
    originalRequest.headers.Authorization = `Bearer ${access_token}`;
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
  register: async (credentials: Credentials): Promise<Token> => {
    const { data } = await apiClient.post(API_URLS.REGISTER, credentials);
    const result = TokenSchema.parse(data);
    return result;
  },
  login: async (credentials: Credentials): Promise<Token> => {
    const { data } = await apiClient.post(API_URLS.LOGIN, credentials);
    const result = TokenSchema.parse(data);
    return result;
  },
  refresh: async (): Promise<AccessToken> => {
    const refreshToken = sessionStorage.getItem('refresh_token');

    if (!refreshToken) {
      throw new Error('Missing refresh token');
    }

    const { data } = await axios.post(
      API_URLS.REFRESH,
      {},
      {
        headers: {
          Authorization: `Bearer ${refreshToken}`,
        },
      },
    );

    const response = RefreshTokenSchema.parse(data);
    return response;
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
