"use client";

import { ChevronRight } from "lucide-react";
import { FolderRow, FileRow } from "~/components/ui/FileRow";
import { type files_table, type folders_table } from "~/server/db/schema";
import Link from "next/link";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { UploadButton } from "./ui/UploadThing";
import { useRouter } from "next/navigation";

export default function DriveContents({
  files,
  folders,
  parents,
  currentFolderId,
  rootFolder,
}: {
  files: (typeof files_table.$inferSelect)[];
  folders: (typeof folders_table.$inferSelect)[];
  parents: (typeof folders_table.$inferSelect)[];
  currentFolderId: number;
  rootFolder: typeof folders_table.$inferSelect;
}) {
  const navigate = useRouter();

  return (
    <div className="mx-auto max-w-6xl">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center">
          <Link
            href={"/folder/" + rootFolder.id}
            className="mr-2 text-gray-300 hover:text-white"
          >
            My Drive
          </Link>
          {parents.map((folder) => (
            <div key={folder.id} className="flex items-center">
              <ChevronRight className="mx-2 text-gray-500" size={16} />
              <Link
                href={"/folder/" + folder.id}
                className="text-gray-300 hover:text-white"
              >
                {folder.name}
              </Link>
            </div>
          ))}
        </div>
        <div>
          <SignedOut>
            <SignInButton />
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
        {/* <Button
          onClick={handleUpload}
          className="bg-blue-600 text-white hover:bg-blue-700"
        >
          <Upload className="mr-2" size={20} />
          Upload
        </Button> */}
      </div>
      <div className="rounded-lg bg-gray-800 shadow-xl">
        <div className="border-b border-gray-700 px-6 py-4">
          <div className="grid grid-cols-[repeat(13,minmax(0,1fr))] gap-4 text-sm font-medium text-gray-400">
            <div className="col-span-6">Name</div>
            <div className="col-span-3">Type</div>
            <div className="col-span-3">Size</div>
          </div>
        </div>
        <ul>
          {folders.map((folder: typeof folders_table.$inferSelect) => (
            <FolderRow key={folder.id} folder={folder} />
          ))}
          {files.map((file) => (
            <FileRow key={file.id} file={file} />
          ))}
        </ul>
      </div>
      <UploadButton
        endpoint="driveUploader"
        onClientUploadComplete={() => {
          navigate.refresh();
        }}
        className="my-8"
        input={{ folderId: currentFolderId }}
      />
    </div>
  );
}
