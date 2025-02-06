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

  async function getAllParents(folderId: number) {
    const parents = [];
    let currentId: number | null = folderId;
    while (currentId !== null) {
      const folder = await db
        .selectDistinct()
        .from(folders_table)
        .where(eq(folders_table.id, currentId));

      if (!folder[0]) {
        throw new Error("Parent folder not found");
      }
      parents.unshift(folder[0]);
      currentId = folder[0]?.parent;
    }
    return parents;
  }

  const filesQuery = await db
    .select()
    .from(files_table)
    .where(eq(files_table.parent, parsedFolderId));

  const foldersQuery = await db
    .select()
    .from(folders_table)
    .where(eq(folders_table.parent, parsedFolderId));

  const parentsQuery = getAllParents(parsedFolderId);

  const [files, folders, parents] = await Promise.all([
    filesQuery,
    foldersQuery,
    parentsQuery,
  ]);

  return <DriveContents files={files} folders={folders} parents={parents} />;
}
