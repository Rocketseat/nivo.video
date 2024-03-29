import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

export const env = createEnv({
  server: {
    NODE_ENV: z
      .enum(['development', 'production', 'test'])
      .default('development'),
    DATABASE_URL: z.string().min(1),
    DIRECT_DATABASE_URL: z.string().min(1),
    CLOUDFLARE_ACCOUNT_ID: z.string().min(1),
    CLOUDFLARE_ACCESS_KEY: z.string().min(1),
    CLOUDFLARE_SECRET_KEY: z.string().min(1),
    CLOUDFLARE_UPLOAD_BUCKET_ID: z.string().min(1),
    CLOUDFLARE_UPLOAD_BUCKET_NAME: z.string().min(1),
    CLOUDFLARE_STORAGE_BUCKET_NAME: z.string().min(1),
    OPENAI_API_KEY: z.string().min(1),
    AUTH_SECRET: z.string().min(1),
    GOOGLE_CLIENT_ID: z.string().min(1),
    GOOGLE_CLIENT_SECRET: z.string().min(1),
    QSTASH_TOKEN: z.string(),
    QSTASH_INTERNAL_TOPIC: z.string(),
    QSTASH_WEBHOOKS_TOPIC: z.string(),
    QSTASH_CURRENT_SIGNING_KEY: z.string(),
    QSTASH_NEXT_SIGNING_KEY: z.string(),
    QSTASH_PUBLISH_MESSAGES: z
      .string()
      .transform((value) => value === 'true')
      .default('true'),
    QSTASH_VALIDATE_SIGNATURE: z
      .string()
      .transform((value) => value === 'true')
      .default('true'),
    AES_ENCRYPTION_KEY: z.string(),
  },
  client: {
    NEXT_PUBLIC_VERCEL_URL: z.string().url().min(1),
  },
  shared: {
    VERCEL_ENV: z
      .enum(['production', 'preview', 'development'])
      .default('development'),
  },
  runtimeEnv: {
    NEXT_PUBLIC_VERCEL_URL: process.env.NEXT_PUBLIC_VERCEL_URL,
    VERCEL_ENV: process.env.VERCEL_ENV,
    NODE_ENV: process.env.NODE_ENV,
    DATABASE_URL: process.env.DATABASE_URL,
    DIRECT_DATABASE_URL: process.env.DATABASE_URL,
    CLOUDFLARE_ACCOUNT_ID: process.env.CLOUDFLARE_ACCOUNT_ID,
    CLOUDFLARE_ACCESS_KEY: process.env.CLOUDFLARE_ACCESS_KEY,
    CLOUDFLARE_SECRET_KEY: process.env.CLOUDFLARE_SECRET_KEY,
    CLOUDFLARE_UPLOAD_BUCKET_ID: process.env.CLOUDFLARE_UPLOAD_BUCKET_ID,
    CLOUDFLARE_UPLOAD_BUCKET_NAME: process.env.CLOUDFLARE_UPLOAD_BUCKET_NAME,
    CLOUDFLARE_STORAGE_BUCKET_NAME: process.env.CLOUDFLARE_STORAGE_BUCKET_NAME,
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,
    AUTH_SECRET: process.env.AUTH_SECRET,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    QSTASH_TOKEN: process.env.QSTASH_TOKEN,
    QSTASH_INTERNAL_TOPIC: process.env.QSTASH_INTERNAL_TOPIC,
    QSTASH_WEBHOOKS_TOPIC: process.env.QSTASH_WEBHOOKS_TOPIC,
    QSTASH_CURRENT_SIGNING_KEY: process.env.QSTASH_CURRENT_SIGNING_KEY,
    QSTASH_NEXT_SIGNING_KEY: process.env.QSTASH_NEXT_SIGNING_KEY,
    QSTASH_PUBLISH_MESSAGES: process.env.QSTASH_PUBLISH_MESSAGES,
    QSTASH_VALIDATE_SIGNATURE: process.env.QSTASH_VALIDATE_SIGNATURE,
    AES_ENCRYPTION_KEY: process.env.AES_ENCRYPTION_KEY,
  },
  emptyStringAsUndefined: true,
})
