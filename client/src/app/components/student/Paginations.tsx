import React from "react";
import {
  Pagination,
  PaginationGap,
  PaginationList,
  PaginationNext,
  PaginationPage,
  PaginationPrevious,
} from "../admin-panel/ui/pagination";

function Paginations() {
  return (
    <Pagination>
      <PaginationPrevious
        className=" border border-slate w-fit text-black pt-3 pb-2 rounded-xl"
        href="?page=2"
      />
      <PaginationList>
        <PaginationPage href="?page=1">1</PaginationPage>
        <PaginationPage href="?page=2">2</PaginationPage>
        <PaginationPage href="?page=3" current>
          3
        </PaginationPage>
        <PaginationGap />
        <PaginationPage href="?page=8">8</PaginationPage>
        <PaginationPage href="?page=9">9</PaginationPage>
        <PaginationPage href="?page=9">10</PaginationPage>
      </PaginationList>
      <PaginationNext
        className=" border border-slate w-fit text-black rounded-xl"
        href="?page=4"
      />
    </Pagination>
  );
}

export default Paginations;
