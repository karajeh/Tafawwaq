import clsx from "clsx";
import type React from "react";
import { Button } from "./button";

export function Pagination({
  "aria-label": ariaLabel = "Page navigation",
  className,
  ...props
}: React.ComponentPropsWithoutRef<"nav">) {
  return (
    <nav
      aria-label={ariaLabel}
      {...props}
      className={clsx(className, "flex gap-x-2")}
    />
  );
}

export function PaginationPrevious({
  href = null,
  className,
  children = "Previous",
}: React.PropsWithChildren<{ href?: string | null; className?: string }>) {
  return (
    <span className={clsx("grow basis-0")}>
      <span className={clsx(className)}>
        <Button
          {...(href === null ? { disabled: true } : { href })}
          plain
          aria-label="Previous page"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12.8327 6.99984H1.16602M1.16602 6.99984L6.99935 12.8332M1.16602 6.99984L6.99935 1.1665"
              stroke="#344054"
              stroke-width="1.66667"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          {children}
        </Button>
      </span>
    </span>
  );
}

export function PaginationNext({
  href = null,
  className,
  children = "Next",
}: React.PropsWithChildren<{ href?: string | null; className?: string }>) {
  return (
    <span className={clsx("flex grow basis-0 justify-end")}>
      <span className={clsx(className)}>
        <Button
          {...(href === null ? { disabled: true } : { href })}
          plain
          aria-label="Next page"
        >
          {children}
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1.16602 6.99984H12.8327M12.8327 6.99984L6.99935 1.1665M12.8327 6.99984L6.99935 12.8332"
              stroke="#344054"
              stroke-width="1.66667"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Button>
      </span>
    </span>
  );
}

export function PaginationList({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"span">) {
  return (
    <span
      {...props}
      className={clsx(className, "hidden items-baseline gap-x-2 sm:flex")}
    />
  );
}

export function PaginationPage({
  href,
  className,
  current = false,
  children,
}: React.PropsWithChildren<{
  href: string;
  className?: string;
  current?: boolean;
}>) {
  return (
    <Button
      href={href}
      plain
      aria-label={`Page ${children}`}
      aria-current={current ? "page" : undefined}
      className={clsx(
        className,
        "min-w-[2.25rem] before:absolute before:-inset-px before:rounded-lg",
        current && "before:bg-zinc-950/5 dark:before:bg-white/10"
      )}
    >
      <span className="-mx-0.5">{children}</span>
    </Button>
  );
}

export function PaginationGap({
  className,
  children = <>&hellip;</>,
  ...props
}: React.ComponentPropsWithoutRef<"span">) {
  return (
    <span
      aria-hidden="true"
      {...props}
      className={clsx(
        className,
        "w-[2.25rem] select-none text-center text-sm/6 font-semibold text-zinc-950 dark:text-white"
      )}
    >
      {children}
    </span>
  );
}
