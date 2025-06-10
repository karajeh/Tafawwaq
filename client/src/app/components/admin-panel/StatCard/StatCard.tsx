"use client";
import React from "react";
import Image, { StaticImageData } from "next/image";
import threedot from "public/images/session-oversight/threedot.svg";

type BreakdownItem = {
  subject: string;
  sessions: number;
};

type CancellationDetails = {
  total: number;
  byStudent: number;
  byTutor: number;
  reasons: { reason: string; count: number }[];
};

const StatCard = ({
  title,
  value,
  image,
  percentage,
  color,
  ChartComponent,
  breakdown,
  cancellationDetails,
}: {
  title: string;
  value: string;
  image: StaticImageData;
  percentage: string;
  color?: string;
  ChartComponent?: React.ComponentType;
  breakdown?: BreakdownItem[];
  cancellationDetails?: CancellationDetails;
}) => (
  <div className="p-3 md:p-5 lg:p-6 border border-slate rounded-lg w-full shadow-sm hover:shadow-md transition-shadow duration-300">
    <div className="flex items-center justify-between">
      <h1 className="text-gray-800 font-medium text-sm md:text-base">
        {title}
      </h1>
      <button className="hover:bg-gray-50 p-1 rounded-full transition-colors">
        <Image src={threedot} alt="options" />
      </button>
    </div>
    <div className="mt-4 flex flex-col lg:flex-row lg:items-center lg:justify-between">
      <div className="w-full">
        <h1 className="text-xl md:text-2xl lg:text-3xl font-semibold">
          {value}
        </h1>
        <div className="flex items-center gap-2 mt-2 md:mt-3 w-full">
          <div className="flex items-center gap-1 w-full">
            <Image src={image} alt="trend" className="w-4 h-4" />
            <span
              className="text-xs md:text-sm font-semibold"
              style={{ color }}
            >
              {percentage}
            </span>
            <span className="text-xs md:text-sm text-gray-600">
              vs last month
            </span>
          </div>
        </div>

        {breakdown && (
          <div className="mt-4 bg-gray-50 p-3 rounded-md">
            <h2 className="text-xs md:text-sm font-medium mb-2 text-gray-700">
              Subject Breakdown
            </h2>
            <div className="space-y-2">
              {breakdown.map((item, index) => (
                <div key={index} className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-2 h-2 rounded-full"
                      style={{
                        backgroundColor:
                          index === 0
                            ? "#4C6FFF"
                            : index === 1
                            ? "#00C48C"
                            : "#FF6B6B",
                      }}
                    />
                    <span className="text-xs text-gray-700">
                      {item.subject}
                    </span>
                  </div>
                  <span className="text-xs font-medium">{item.sessions}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {cancellationDetails && (
          <div className="mt-4 bg-gray-50 p-3 rounded-md">
            <div className="mb-2">
              <span className="text-xs md:text-sm font-medium text-gray-700">
                Total: {cancellationDetails.total} cancellations
              </span>
            </div>
            <div className="flex gap-3 mb-3">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-orange-500" />
                <span className="text-xs text-gray-700">
                  Student: {cancellationDetails.byStudent}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-blue-500" />
                <span className="text-xs text-gray-700">
                  Tutor: {cancellationDetails.byTutor}
                </span>
              </div>
            </div>
            <div>
              <h2 className="text-xs font-medium mb-2 text-gray-700">
                Top Reasons
              </h2>
              <div className="space-y-1.5">
                {cancellationDetails.reasons.map((item, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center"
                  >
                    <span className="text-xs text-gray-700">{item.reason}</span>
                    <div className="flex items-center gap-1">
                      <span className="text-xs font-medium">{item.count}</span>
                      <div className="h-1.5 w-12 md:w-16 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: `${
                              (item.count / cancellationDetails.total) * 100
                            }%`,
                            backgroundColor:
                              index === 0
                                ? "#4C6FFF"
                                : index === 1
                                ? "#00C48C"
                                : index === 2
                                ? "#FFB547"
                                : "#FF6B6B",
                          }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="mt-3 lg:mt-0 w-full">
        {ChartComponent && <ChartComponent />}
      </div>
    </div>
  </div>
);

export default StatCard;
