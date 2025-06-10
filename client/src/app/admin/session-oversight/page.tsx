import { Comparison } from "../../components/admin-panel/StatCard/Comparison";
import Sessions from "../../components/admin-panel/StatCard/Sessions";
import StatCardSectionSessionOverSight from "src/app/components/admin-panel/StatCard/StatCardSectionSessionOverSight";

export default function SessionOversight(): JSX.Element {
  return (
    <div>
      <div className="px-4 md:px-1">
        <div className="mt-[20px] md:mt-[0px]">
          <StatCardSectionSessionOverSight />
        </div>
        <Comparison />
        <Sessions />
      </div>
    </div>
  );
}
