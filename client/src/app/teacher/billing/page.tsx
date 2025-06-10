'use client';
import { useRouter } from 'next/navigation';
import { getStripeDashboard } from 'src/api/teacherService';

const BillingPage = () => {
  const router = useRouter();
  // This should be a private route

  // Get the current user 'teacher'

  const handleViewDashboard = async () => {
    try {
      // TODO: redirect teacher to billing if teacher is not connected to stripe
      const dashboardURL = await getStripeDashboard();
      router.push(dashboardURL);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="mt-6 shadow-md rounded-lg p-4">
      <h2 className="text-xl text-[#66797C] font-semibold">Billing</h2>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 xl:gap-36">
        <p>Find all your billing details</p>
        {/* Render the billing link when teacher isConnectedAccount=false */}
        <button onClick={handleViewDashboard}>View dashboard</button>
      </div>
    </div>
  );
};
export default BillingPage;
