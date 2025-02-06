import GoogleDriveClone from "~/components/Drive-Contents";
import { db } from "~/server/db";
import { files_table, folders_table } from "~/server/db/schema";

export default async function Page() {
  const foldersQuery = await db.select().from(folders_table);
  const filesQuery = await db.select().from(files_table);

  const [folders, files] = await Promise.all([foldersQuery, filesQuery]);

  return <GoogleDriveClone files={files} folders={folders} />;
}
