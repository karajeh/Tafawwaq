import Chatbox from "src/app/student/messages/chatbox";
import Messages from "src/app/student/messages/messages";

const Page = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto py-6">
        <div className="md:flex gap-[20px] px-[20px] md:px-[10px]">
          <div className="md:w-[376px] md:flex-shrink-0 mb-6 md:mb-0">
            <Messages />
          </div>

          <div className="flex-1">
            <Chatbox />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;