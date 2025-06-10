"use client";

import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./table";
import clsx from "clsx";
import Arrow from "public/images/arrow.png";
import Image from "next/image";
import { Button } from "./button";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface FormatData {
  title: string;
  key: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  component: React.ComponentType<any>;
  showSort?: boolean;
  onclick?: () => void;
  propName?: string;
}

interface DataItem {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
  slug?: string;
}

interface AdminTableProps {
  format: FormatData[];
  data: DataItem[];
}

function AdminTable({ format, data }: AdminTableProps) {

  console.log("data and data", format, data)
  const pathname = usePathname();

  return (
    <div>
      <Table className="px-5 [--gutter:theme(spacing.6)] lg:[--gutter:theme(spacing.10)]">
        <TableHead>
          <TableRow>
            {format.map((formatData) => (
              <TableHeader key={formatData.title}>
                <div
                  className={clsx(
                    "flex items-center w-full",
                    formatData.showSort
                      ? "justify-between"
                      : "justify-center text-center"
                  )}
                >
                  <p className="font-medium text-[#0A090B]">
                    {formatData.title}
                  </p>
                  {formatData.showSort && formatData.onclick && (
                    <button
                      onClick={formatData.onclick}
                      aria-label={`Sort by ${formatData.title}`}
                    >
                      <Image
                        src={Arrow}
                        alt="Sort arrow"
                        className="hover:opacity-75"
                      />
                    </button>
                  )}
                </div>
              </TableHeader>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((dataItem, index) => (
            <TableRow
              key={index}
              href={dataItem.slug}
              title={`Row data #${index}`}
            >
              {format.map((formatData) => {
                const Component = formatData.component;
                const cellData = dataItem[formatData.key];
                return (
                  <TableCell key={formatData.key}>
                    {cellData !== undefined ? (
                      // If cellData exists, check if it's a primitive
                      typeof cellData === "string" ||
                      typeof cellData === "number" ? (
                        formatData.propName ? (
                          <Component {...{ [formatData.propName]: cellData }} />
                        ) : (
                          <Component>{cellData}</Component>
                        )
                      ) : (
                        // For objects, merge cellData and the full dataItem
                        <Component {...cellData} {...dataItem} />
                      )
                    ) : // If cellData is undefined but a propName is provided,
                    // pass the entire dataItem as that prop.
                    formatData.propName ? (
                      <div className="flex items-center gap-3 w-full justify-center">
                        {pathname !== "/admin/user-interaction" && (
                          <Link
                            href={
                              `/admin/tutor-management/${dataItem.id}`
                              // dataItem.requestType === "certificate"
                              //   ? `/admin/certificate-management/${dataItem.id}`
                              //   : `/admin/tutor-management/${dataItem.id}`
                            }
                          >
                            <Button
                              outline
                              className=" text-secondary cursor-pointer border-secondary"
                            >
                              Details
                            </Button>
                          </Link>
                        )}
                        <Component {...{ [formatData.propName]: dataItem }} />
                      </div>
                    ) : (
                      <div className="flex items-center gap-3 w-full justify-center">
                        {pathname !== "/admin/user-interaction" && (
                          <Link
                            href={
                              `/admin/tutor-management/${dataItem.id}`
                              // dataItem.requestType === "certificate"
                              //   ? `/admin/certificate-management/${dataItem.id}`
                              //   : `/admin/tutor-management/${dataItem.id}`
                            }
                          >
                            <Button
                              outline
                              className=" text-secondary cursor-pointer border-secondary"
                            >
                              Details
                            </Button>
                          </Link>
                        )}
                        <Component {...dataItem} />
                      </div>
                    )}
                  </TableCell>
                );
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default AdminTable;
