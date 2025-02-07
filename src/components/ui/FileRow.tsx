import { FileIcon, Folder as FolderIcon, Trash2Icon } from "lucide-react";
import Link from "next/link";
import { type files_table, type folders_table } from "~/server/db/schema";
import { Button } from "./button";
import { deleteFile, deleteFolder } from "~/server/actions";

export function FolderRow({
  folder,
}: {
  folder: typeof folders_table.$inferSelect;
}) {
  return (
    <li className="hover:bg-gray-750 border-b border-gray-700 px-6 py-4 hover:bg-gray-900 hover:shadow-xl hover:shadow-cyan-500">
      <div className="grid grid-cols-[repeat(13,minmax(0,1fr))] items-center gap-4">
        <div className="col-span-6 flex items-center">
          <Link
            href={"/folder/" + folder.id}
            className="flex items-center text-gray-100 hover:text-blue-400"
          >
            <FolderIcon className="mr-3" size={20} />
            {folder.name}
          </Link>
        </div>
        <div className="col-span-3 text-gray-400">Folder</div>
        <div className="col-span-3 text-gray-400">--</div>
        <Button
          variant="destructive"
          size="sm"
          className="col-span-1 w-min"
          aria-label="Delete file"
          title="Delete File"
          onClick={() => deleteFolder(folder.id)}
        >
          <Trash2Icon />
        </Button>
      </div>
    </li>
  );
}

export function FileRow({ file }: { file: typeof files_table.$inferSelect }) {
  return (
    <li className="hover:bg-gray-750 border-b border-gray-700 px-6 py-4 hover:bg-gray-900 hover:shadow-xl hover:shadow-cyan-500">
      <div className="grid grid-cols-[repeat(13,minmax(0,1fr))] items-center gap-4">
        <div className="col-span-6 flex items-center">
          <a
            href={file.url}
            target="_blank"
            className="flex items-center text-gray-100 hover:text-blue-400"
          >
            <FileIcon className="mr-3" size={20} />
            {file.name}
          </a>
        </div>
        <div className="col-span-3 text-gray-400">File</div>
        <div className="col-span-3 text-gray-400">{file.size}</div>
        <Button
          variant="destructive"
          size="sm"
          className="col-span-1 w-min"
          aria-label="Delete file"
          title="Delete File"
          onClick={() => deleteFile(file.id)}
        >
          <Trash2Icon />
        </Button>
      </div>
    </li>
  );
}
