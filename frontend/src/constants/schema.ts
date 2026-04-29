import * as z from 'zod';

export const MessageSchema = z.object({
  msg: z.string(),
});

export const TokenSchema = z.object({
  access_token: z.string(),
  refresh_token: z.string(),
});

export const RefreshTokenSchema = z.object({
  access_token: z.string(),
});

export const EntitySchema = z.object({
  id: z.int(),
  name: z.string(),
});

export const EntitiesSchema = z.array(EntitySchema);

export const AuthorStatSchema = z.array(
  z.object({
    author: z.string(),
    count: z.int(),
  }),
);

export const ArticleSchema = z.object({
  id: z.int(),
  title: z.string(),
  author: z.string(),
  url: z.string(),
  year: z.int(),
  summary: z.string(),
  read: z.boolean(),
  read_again: z.boolean(),
  favorite: z.boolean(),
  tags: z.array(z.string()),
  date_creation: z.string(),
  date_modification: z.string(),
});

export const ArticlesSchema = z.array(ArticleSchema);

export const makeDeletedSchema = <T extends z.ZodTypeAny>(itemSchema: T) =>
  z.object({
    deleted: z.array(itemSchema),
    count: z.int(),
  });

export const DeletedArticlesSchema = makeDeletedSchema(ArticleSchema);
export const DeletedEntitiesSchema = makeDeletedSchema(EntitySchema);
