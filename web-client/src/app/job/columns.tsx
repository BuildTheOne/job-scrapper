"use client";

import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { Job } from "./types";

export const columns: ColumnDef<Job>[] = [
  {
    accessorKey: "title",
    header: "Pekerjaan",
  },
  {
    accessorKey: "company",
    header: "Perusahaan",
  },
  {
    accessorKey: "location",
    header: "Lokasi",
  },

  {
    accessorKey: "url",
    accessorFn: (job) => job.url,
    header: "URL",
    cell: ({ cell }) => {
      return <Link href={cell.getValue() ?? '#'}>Link</Link>
    }
  },
  {
    accessorKey: "source",
    header: "Sumber",
  },
];
