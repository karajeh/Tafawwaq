import React from "react";

const Schedule: React.FC = () => {
  return (
    <div className="mt-6">
      <h2 className="text-lg font-semibold">Schedule</h2>
      <table className="w-full text-left mt-2">
        <tbody>
          <tr>
            <td className="py-1 text-gray-700">Monday - Thursday</td>
            <td className="py-1 text-gray-700">09:30 AM - 05:00 PM</td>
          </tr>
          <tr>
            <td className="py-1 text-gray-700">Friday</td>
            <td className="py-1 text-gray-700">09:30 AM - 01:00 PM</td>
            <td className="py-1 text-gray-700">02:30 PM - 05:00 PM</td>
          </tr>
          <tr>
            <td className="py-1 text-gray-700">Saturday - Sunday</td>
            <td className="py-1 text-gray-700">Holiday</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Schedule;
