import React from "react";

const getDateForWeek = (dayOffset: number): number => {
  const today = new Date();
  const date = new Date(today.setDate(today.getDate() + dayOffset));
  return date.getDate(); // Return only the day of the month
};

const getFullDayName = (dayOffset: number): string => {
  const today = new Date();
  const date = new Date(today.setDate(today.getDate() + dayOffset));
  return date.toLocaleString("en-US", { weekday: "long" }); // Return the full day name (e.g., Monday)
};

// Calendar Component
const Calendar = () => {
  // const dateRow = [12, 13, 14, 15, 16, 17, 18];

  return (
    // <div className="mx-auto my-2 sm:my-8 p-1 sm:p-4 rounded-lg">
    //   {/* Header */}
    //   <div className="mb-2 sm:mb-6">
    //     <h1 className="text-xs sm:text-xl flex font-semibold items-center gap-1 sm:gap-2 text-gray-800">
    //       <LuCalendar className="text-secondary" /> October 13-18, 2021
    //     </h1>
    //   </div>

    //   {/* Days of week header */}
    //   <div className="grid grid-cols-7 text-center font-semibold text-gray-600 border-b border-stone-300 pb-1 sm:pb-2">
    //     {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
    //       <div key={day} className="py-0.5 sm:py-2 text-[8px] sm:text-base">
    //         {day}
    //       </div>
    //     ))}
    //   </div>

    //   {/* First row of events */}
    //   <div className="grid grid-cols-7 text-[#3F3F4426] text-center border-b border-stone-300 pb-1 sm:pb-2">
    //     <div
    //       key={events[0].id}
    //       className={`p-0.5 sm:p-3 rounded-lg shadow-sm text-gray-800 ${events[0].bg} transition-transform transform hover:scale-105 active:scale-95`}
    //       style={{
    //         gridColumn: `span ${events[0].duration} / span ${events[0].duration}`,
    //         gridRow: "span 1",
    //         gridColumnStart: dayToGridColumn[events[0].start],
    //       }}
    //     >
    //       <div className="flex flex-col sm:flex-row justify-between items-center gap-0.5 sm:gap-2">
    //         <p className="font-semibold text-[8px] sm:text-base truncate w-full">{events[0].title}</p>
    //         <Image src={image1} alt="" className="w-4 h-4 sm:w-8 sm:h-8 rounded-full bg-white" />
    //       </div>
    //       <div className="flex flex-col sm:flex-row justify-between items-center text-[6px] sm:text-sm mt-0.5 sm:mt-1">
    //         <p className="truncate">
    //           {events[0].start}
    //           {events[0].duration > 1 && " - "}
    //           {events[0].duration > 1 &&
    //             gridColumnToDay[
    //               Math.min(
    //                 Number(dayToGridColumn[events[0].start]) + events[0].duration - 1,
    //                 7
    //               )
    //             ]}
    //         </p>
    //         {events[0].time && <p className="truncate">{events[0].time}</p>}
    //       </div>
    //     </div>
    //   </div>

    //   {/* Date numbers row */}
    //   <div className="grid grid-cols-7 text-center font-semibold text-gray-600 border-b border-stone-300 pb-1 sm:pb-2">
    //     {dateRow.map((date, index) => (
    //       <div key={index} className="py-0.5 sm:py-2 text-[8px] sm:text-base">
    //         {date}
    //       </div>
    //     ))}
    //   </div>

    //   {/* Main events grid */}
    //   <div className="relative h-full border-b py-1 sm:py-3 border-stone-300 grid grid-cols-7 gap-0.5 sm:gap-1 mt-1 sm:mt-2">
    //     {events.map((event, index) => {
    //       const colStart = dayToGridColumn[event.start];
    //       if (index == 0 || index == 5) return;
    //       return (
    //         <Link
    //           href="/teacher/lesson-details"
    //           key={event.id}
    //           className={`p-0.5 sm:p-3 rounded-lg shadow-sm text-gray-800 ${event.bg} transition-transform transform hover:scale-105 active:scale-95`}
    //           style={{
    //             gridColumn: `span ${event.duration} / span ${event.duration}`,
    //             gridRow: "span 1",
    //             gridColumnStart: colStart,
    //           }}
    //         >
    //           <div className="flex flex-col sm:flex-row justify-between items-center gap-0.5 sm:gap-2">
    //             <p className="font-semibold text-[8px] sm:text-base truncate w-full">{event.title}</p>
    //             <Image src={image1} alt="" className="w-4 h-4 sm:w-8 sm:h-8 rounded-full bg-white" />
    //           </div>
    //           <div className="flex flex-col sm:flex-row justify-between items-center text-[6px] sm:text-sm mt-0.5 sm:mt-1">
    //             <p className="truncate">
    //               {event.start}
    //               {event.duration > 1 && " - "}
    //               {event.duration > 1 &&
    //                 gridColumnToDay[
    //                   Math.min(
    //                     Number(dayToGridColumn[event.start]) + event.duration - 1,
    //                     7
    //                   )
    //                 ]}
    //             </p>
    //             {event.time && <p className="truncate">{event.time}</p>}
    //           </div>
    //         </Link>
    //       );
    //     })}
    //   </div>

    //   {/* Last row of events */}
    //   <div className="grid grid-cols-7 text-center border-b border-stone-300 pb-1 sm:pb-2">
    //     <div
    //       key={events[5].id}
    //       className={`p-0.5 sm:p-3 rounded-lg shadow-sm text-gray-800 ${events[5].bg} transition-transform transform hover:scale-105 active:scale-95`}
    //       style={{
    //         gridColumn: `span ${events[0].duration} / span ${events[0].duration}`,
    //         gridRow: "span 1",
    //         gridColumnStart: dayToGridColumn[events[0].start],
    //       }}
    //     >
    //       <div className="flex flex-col sm:flex-row justify-between items-center gap-0.5 sm:gap-2 text-[#3F3F4426]">
    //         <p className="font-semibold text-[8px] sm:text-base truncate w-full">{events[5].title}</p>
    //         <Image src={image1} alt="" className="w-4 h-4 sm:w-8 sm:h-8 rounded-full bg-white" />
    //       </div>
    //       <div className="flex flex-col sm:flex-row justify-between items-center text-[6px] sm:text-sm mt-0.5 sm:mt-1 text-[#3F3F4426]">
    //         <p className="truncate">
    //           {events[5].start}
    //           {events[5].duration > 1 && " - "}
    //           {events[5].duration > 1 &&
    //             gridColumnToDay[
    //               Math.min(
    //                 Number(dayToGridColumn[events[0].start]) + events[0].duration - 1,
    //                 7
    //               )
    //             ]}
    //         </p>
    //         {events[5].time && <p className="truncate">{events[5].time}</p>}
    //       </div>
    //     </div>
    //   </div>
    // </div>
    <div className="bg-white rounded-lg lg:col-span-2 shadow-md overflow-hidden p-2 sm:p-4">
      <div className="flex justify-between items-center mb-2 sm:mb-4">
        <h3 className="text-base sm:text-lg font-semibold">Weekly Calendar</h3>
      </div>

      {/* Calendar Days Header */}
      <div className="grid grid-cols-7 text-center text-xs sm:text-sm text-gray-500 mb-2">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day, idx) => {
          const date = getDateForWeek(idx - new Date().getDay());
          const fullDayName = getFullDayName(idx - new Date().getDay());
          return (
            <div key={idx} className="py-1 sm:py-2">
              <p className="font-semibold text-xs sm:text-sm">{date}</p>
              <p className="text-[10px] sm:text-sm truncate">{fullDayName}</p>
            </div>
          );
        })}
      </div>

      {/* Calendar Grid */}
      <div className="mt-2 sm:mt-4 grid grid-cols-1 sm:grid-cols-7 gap-1 sm:gap-2">
        {/* Sunday */}
        <div className="bg-opacity-50 bg-gray-300 p-2 sm:p-4 rounded-lg shadow-md h-[100px] sm:h-[300px]">
          <div className="h-full flex flex-col justify-center items-center">
            <p className="text-sm sm:text-lg font-semibold">Sun</p>
          </div>
        </div>

        {/* Monday */}
        <div className="bg-opacity-50 bg-gray-300 p-2 sm:p-4 rounded-lg shadow-md h-[100px] sm:h-[300px]">
          <div className="h-full flex flex-col justify-center items-center">
            <p className="text-sm sm:text-lg font-semibold">Mon</p>
            <div
              className="text-[10px] sm:text-xs bg-opacity-60 p-1 sm:p-2 rounded-lg mt-2 w-full max-w-[200px]"
              style={{ backgroundColor: "#a2d154" }}
            >
              <p className="font-semibold">IGCSE Class</p>
              <p>9 PM - 10 PM</p>
            </div>
          </div>
        </div>

        {/* Tuesday */}
        <div className="bg-opacity-50 bg-gray-300 p-2 sm:p-4 rounded-lg shadow-md h-[100px] sm:h-[300px]">
          <div className="h-full flex flex-col justify-center items-center">
            <p className="text-sm sm:text-lg font-semibold">Tue</p>
            <div
              className="text-[10px] sm:text-xs bg-opacity-60 p-1 sm:p-2 rounded-lg mt-2 w-full max-w-[200px]"
              style={{ backgroundColor: "#a2d154" }}
            >
              <p className="font-semibold">Webinar</p>
              <p>9 AM - 10 AM</p>
            </div>
          </div>
        </div>

        {/* Wednesday to Saturday */}
        {["Wed", "Thu", "Fri", "Sat"].map((day, idx) => (
          <div
            key={idx}
            className="bg-opacity-50 bg-gray-300 p-2 sm:p-4 rounded-lg shadow-md h-[100px] sm:h-[300px]"
          >
            <div className="h-full flex flex-col justify-center items-center">
              <p className="text-sm sm:text-lg font-semibold">{day}</p>
              {day === "Fri" && (
                <div
                  className="text-[10px] sm:text-xs bg-opacity-60 p-1 sm:p-2 rounded-lg mt-2 w-full max-w-[200px]"
                  style={{ backgroundColor: "#a2d154" }}
                >
                  <p className="font-semibold">Team Meeting</p>
                  <p>2 PM - 3 PM</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
