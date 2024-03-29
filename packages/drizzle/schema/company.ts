import { relations } from 'drizzle-orm'
import { json, pgTable, text, uniqueIndex, uuid } from 'drizzle-orm/pg-core'

import { tag, upload, uploadBatch, user } from '.'

export const company = pgTable(
  'companies',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    name: text('name').notNull(),
    domain: text('domain').notNull(),
    externalId: text('external_id'),
    externalApiKey: json('external_api_key').$type<{
      ciphertext: string
      iv: string
    }>(),
  },
  (table) => {
    return {
      domainKey: uniqueIndex().on(table.domain),
    }
  },
)

export const companyRelations = relations(company, ({ many }) => ({
  uploads: many(upload),
  members: many(user),
  uploadBatches: many(uploadBatch),
  tags: many(tag),
}))
