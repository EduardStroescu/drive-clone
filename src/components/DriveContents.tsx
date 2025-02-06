"use client";

import { Upload, ChevronRight } from "lucide-react";
import { Button } from "~/components/ui/button";
import { FolderRow, FileRow } from "~/components/ui/FileRow";
import { type files_table, type folders_table } from "~/server/db/schema";
import Link from "next/link";

export default function DriveContents({
  files,
  folders,
  parents,
  currentFolderId,
}: {
  files: (typeof files_table.$inferSelect)[];
  folders: (typeof folders_table.$inferSelect)[];
  parents: (typeof folders_table.$inferSelect)[];
  currentFolderId: number;
}) {
  // const breadcrumbs = useMemo(() => {
  //   const breadcrumbs = [];
  //   let currentId: number | null = currentFolder;

  //   while (currentId !== 1) {
  //     const folder = folders.find((folder) => folder.id === currentId);
  //     if (folder) {
  //       breadcrumbs.unshift(folder);
  //       currentId = folder.parent ?? 1;
  //     } else {
  //       break;
  //     }
  //   }

  //   return breadcrumbs;
  // }, [currentFolder, folders]);

  const breadcrumbs = parents;

  const handleUpload = () => {
    alert("Upload functionality would be implemented here");
  };

  return (
    <div className="mx-auto max-w-6xl">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center">
          <Link
            href={"/folder/1"}
            className="mr-2 text-gray-300 hover:text-white"
          >
            My Drive
          </Link>
          {breadcrumbs.map((folder) => (
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
        <Button
          onClick={handleUpload}
          className="bg-blue-600 text-white hover:bg-blue-700"
        >
          <Upload className="mr-2" size={20} />
          Upload
        </Button>
      </div>
      <div className="rounded-lg bg-gray-800 shadow-xl">
        <div className="border-b border-gray-700 px-6 py-4">
          <div className="grid grid-cols-12 gap-4 text-sm font-medium text-gray-400">
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
    </div>
  );
}
