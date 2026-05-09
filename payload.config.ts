import { sqliteD1Adapter } from "@payloadcms/db-d1-sqlite";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import path from "path";
import { buildConfig } from "payload";
import { fileURLToPath } from "url";

import { Users } from "./collections/Users.ts";
import { Media } from "./collections/Media.ts";
import { Articles } from "./collections/Articles.ts";
import { Tenants } from "./collections/Tenants.ts";
import { multiTenantPlugin } from "@payloadcms/plugin-multi-tenant";
import { s3Storage } from "@payloadcms/storage-s3";
import { migrations } from "./migrations/index.ts";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default (async () => {
  let binding: D1Database;
  try {
    const { env } = await getCloudflareContext({ async: true });
    binding = env.DB;
  } catch {
    binding = {} as D1Database;
  }

  return buildConfig({
    admin: {
      user: Users.slug,
      importMap: { baseDir: path.resolve(dirname) },
    },
    collections: [Users, Media, Articles, Tenants],
    editor: lexicalEditor(),
    secret: process.env.PAYLOAD_SECRET || "",
    typescript: { outputFile: path.resolve(dirname, "payload-types.ts") },
    db: sqliteD1Adapter({
      binding,
      push: true,
      prodMigrations: migrations,
    }),
    plugins: [
      multiTenantPlugin({
        tenantCollection: "tenants",
        collections: { articles: {}, media: {} },
        userHasAccessToAllTenants: () => true,
      }),
      s3Storage({
        collections: { media: { prefix: "media" } },
        bucket: process.env.R2_BUCKET || "",
        config: {
          credentials: {
            accessKeyId: process.env.R2_ACCESS_KEY_ID || "",
            secretAccessKey: process.env.R2_SECRET_ACCESS_KEY || "",
          },
          endpoint: process.env.R2_ENDPOINT || "",
          region: "auto",
          forcePathStyle: true,
        },
      }),
    ],
  });
})();
