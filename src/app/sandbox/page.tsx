import { eq } from "drizzle-orm";
import { mockFiles, mockFolders } from "~/lib/mock-data";
import { db } from "~/server/db";
import { files_table, folders_table } from "~/server/db/schema";

export default async function SandboxPage() {
  //   const user = await auth();

  //   if (!user.userId) throw new Error("User not found");

  //   const folders = await db
  //     .select()
  //     .from(folders_table)
  //     .where(eq(folders_table.ownerId, user.userId));

  //   console.log(folders);

  //   const formAction = async () => {
  //     "use server";

  //     const user = await auth();
  //     if (!user.userId) throw new Error("User not found");

  //     const rootFolder = await db
  //       .insert(folders_table)
  //       .values({
  //         name: "root",
  //         ownerId: user.userId,
  //         parent: null,
  //       })
  //       .$returningId();

  //     const insertableFolders = mockFolders.map((folder) => ({
  //       name: folder.name,
  //       ownerId: user.userId,
  //       parent: rootFolder[0]!.id,
  //     }));

  //     await db.insert(folders_table).values(insertableFolders);
  //   };

  const formAction = async () => {
    "use server";

    const foldersInsert = mockFolders.map((folder, idx) => ({
      id: idx + 1,
      name: folder.name,
      ownerId: "1",
      parent: idx !== 0 ? 1 : null,
    }));
    const foldersResult = await db.insert(folders_table).values(foldersInsert);
    console.log(foldersResult);

    const filesInsert = mockFiles.map((file, idx) => ({
      id: idx + 1,
      name: file.name,
      ownerId: "1",
      size: 50000,
      parent: (idx % 3) + 1,
      url: file.url,
    }));

    const filesResult = await db.insert(files_table).values(filesInsert);
    console.log(filesResult);
  };

  return (
    <div>
      <form action={formAction}>
        <button type="submit">Create File</button>
      </form>
    </div>
  );
}
