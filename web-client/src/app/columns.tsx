"use client";

import { ColumnDef } from "@tanstack/react-table";
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
    header: "URL",
  },
  {
    accessorKey: "source",
    header: "Sumber",
  },
];
