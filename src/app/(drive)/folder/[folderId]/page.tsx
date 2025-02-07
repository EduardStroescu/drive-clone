import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import DriveContents from "~/components/DriveContents";
import { Button } from "~/components/ui/button";

import { MUTATIONS, QUERIES } from "~/server/db/queries";

export default async function Page(props: {
  params: Promise<{ folderId: string }>;
}) {
  const { folderId } = await props.params;

  const parsedFolderId = parseInt(folderId);
  if (isNaN(parsedFolderId)) {
    return <div>Invalid folder ID</div>;
  }

  const [files, folders, parents] = await Promise.all([
    QUERIES.getFiles(parsedFolderId),
    QUERIES.getFolders(parsedFolderId),
    QUERIES.getAllParentsForFolder(parsedFolderId),
  ]);

  const rootFolder = parents.find((folder) => folder.name === "root");

  if (!rootFolder) {
    return (
      <form
        action={async () => {
          "use server";
          const session = await auth();

          if (!session.userId) {
            return redirect("/sign-in");
          }

          const rootFolderId = await MUTATIONS.onboardUser(session.userId);

          return redirect(`/f/${rootFolderId}`);
        }}
      >
        <Button>Initialize new Drive</Button>
      </form>
    );
  }

  return (
    <DriveContents
      files={files}
      folders={folders}
      parents={parents}
      currentFolderId={parsedFolderId}
      rootFolder={rootFolder}
    />
  );
}
