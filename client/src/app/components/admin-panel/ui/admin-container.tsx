import React from "react";

function AdminContainer({
  children,
  title,
  rightComponent,
  footer,
  showCount = null,
}: {
  children: React.ReactNode;
  title: string;
  rightComponent?: React.ReactNode;
  footer?: React.ReactNode;
  showCount?: number | null;
}) {
  return (
    <div className="md:border border-slate rounded-2xl overflow-hidden w-full h-full flex flex-col">
      <div className="flex w-full justify-between border-slate p-3 md:p-5 border-b items-center gap-3">
        <h3 className="md:text-xl font-bold text-text_primary">
          {title}
          {showCount && (
            <>
              : <span className="text-[#A3D154]">25</span>
            </>
          )}
        </h3>
        {rightComponent}
      </div>
      <div className=" flex-1 flex  flex-col justify-between">
        <div>{children}</div>
        {footer && <div className=" border-t border-slate p-5 ">{footer}</div>}
      </div>
    </div>
  );
}
export default AdminContainer;
