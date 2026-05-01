import * as z from 'zod';

export const MessageSchema = z.object({
  msg: z.string(),
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
  title: z.string().min(1, ' '),
  author: z.string().min(1, ' '),
  url: z.url(' '),
  year: z
    .int('Year must be an integer')
    .min(0, 'Year must be greater than or equal to 0')
    .max(new Date().getFullYear(), 'Year must be less than or equal to the current year'),
  summary: z.string(),
  consulted: z.boolean(),
  read_later: z.boolean(),
  liked: z.boolean(),
  tags: z.array(z.string()),
  date_creation: z.string(),
  date_modification: z.string(),
});

export const ArticlesSchema = z.array(ArticleSchema);

const makeDeletedSchema = <T extends z.ZodTypeAny>(itemSchema: T) =>
  z.object({
    deleted: z.array(itemSchema),
    count: z.int(),
  });

export const DeletedArticlesSchema = makeDeletedSchema(ArticleSchema);
export const DeletedEntitiesSchema = makeDeletedSchema(EntitySchema);
