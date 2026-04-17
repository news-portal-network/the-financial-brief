import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import path from "path";
import { buildConfig } from "payload";
import { fileURLToPath } from "url";
import sharp from "sharp";

import { Users } from "./collections/Users";
import { Media } from "./collections/Media";
import { Articles } from "./collections/Articles";
import { Tenants } from "./collections/Tenants";
import { multiTenantPlugin } from "@payloadcms/plugin-multi-tenant";
import { s3Storage } from "@payloadcms/storage-s3";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
    admin: {
          user: Users.slug,
          importMap: {
                  baseDir: path.resolve(dirname),
          },
    },
    collections: [Users, Media, Articles, Tenants],
    editor: lexicalEditor(),
    secret: process.env.PAYLOAD_SECRET || "",
    typescript: {
          outputFile: path.resolve(dirname, "payload-types.ts"),
    },
    db: postgresAdapter({
          push: true,
          pool: {
                  connectionString: process.env.DATABASE_URI || "",
          },
    }),
    sharp,
    plugins: [
        multiTenantPlugin({
            tenantCollection: 'tenants',
            collections: {
                articles: {},
                media: {},
            },
            userHasAccessToAllTenants: () => true,
        }),
        s3Storage({
            collections: {
                media: {
                    prefix: 'media',
                },
            },
            bucket: process.env.R2_BUCKET || '',
            config: {
                credentials: {
                    accessKeyId: process.env.R2_ACCESS_KEY_ID || '',
                    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY || '',
                },
                endpoint: process.env.R2_ENDPOINT || '',
                region: 'auto',
                forcePathStyle: true,
            },
        }),
    ],
});
