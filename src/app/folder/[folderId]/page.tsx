import { eq } from "drizzle-orm";

import DriveContents from "~/components/DriveContents";

import { db } from "~/server/db";
import { files_table, folders_table } from "~/server/db/schema";

export default async function Page(props: {
  params: Promise<{ folderId: string }>;
}) {
  const { folderId } = await props.params;

  const parsedFolderId = parseInt(folderId);
  if (isNaN(parsedFolderId)) {
    return <div>Invalid folder ID</div>;
  }

  const filesQuery = await db
    .select()
    .from(files_table)
    .where(eq(files_table.parent, parsedFolderId));
  const foldersQuery = await db
    .select()
    .from(folders_table)
    .where(eq(folders_table.parent, parsedFolderId));

  const [files, folders] = await Promise.all([filesQuery, foldersQuery]);

  return <DriveContents files={files} folders={folders} />;
}
