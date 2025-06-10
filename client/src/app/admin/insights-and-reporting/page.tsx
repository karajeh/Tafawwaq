import BarChartInsight from "../../components/admin-panel/StatCard/BarChart";
import StatCardSection from "../../components/admin-panel/StatCard/StatCardSection";
import threedot from "public/images/session-oversight/threedot.svg";
import Image from "next/image";

export default function InsightsReporting(): JSX.Element {
  return (
    <div className="">
      <div className="px-4 md:px-1">
        <div className="mt-[20px] md:mt-[0px]">
          <StatCardSection />
          <div className="border  border-slate rounded-[12px] mt-[20px] md:mt-[24px]">
            <div className="flex flex-col">
              <div className="flex items-center justify-between  pr-[24px]">
                <h1 className="text-[#101828] font-inter font-semibold text-[18px] p-[30px]">
                  Total Tutors Register
                </h1>
                <Image src={threedot} alt="threedot" />
              </div>
              <hr className="my-1 border-slate" />
            </div>
            <div className="mt-[20px]">
              <BarChartInsight />
            </div>
          </div>
          <div className="border border-slate rounded-[12px] mt-[20px] md:mt-[24px]">
            <div className="flex flex-col">
              <div className="flex items-center justify-between  pr-[24px]">
                <h1 className="text-[#101828] font-inter font-semibold text-[18px] p-[30px]">
                  Total Students Register
                </h1>
                <Image src={threedot} alt="threedot" />
              </div>
              <hr className="my-1 border-slate" />
            </div>
            <div className="mt-[20px]">
              <BarChartInsight />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
