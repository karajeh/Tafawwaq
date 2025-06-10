import Image from "next/image";
import Heading from "../components/Heading";
import lesson_planning from "public/images/best-practice/lesson-planning.svg";
import classroom from "public/images/best-practice/classroom.svg";
import communication from "public/images/best-practice/communication.svg";
export default function BestPractices() {
  return (
    <section className="bg-public_bg text-black py-12 px-4 md:px-12">
      <div className="container mx-auto  text-center">
        {/* Heading */}

        <Heading
          title="Best Practices for"
          spanned="Online Tutoring"
          center={true}
        />
        {/* Icon grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 justify-items-center gap-8 mt-16">
          <Card
            Heading="Lesson Planning"
            content={[
              "Foster a welcoming space where students feel comfortable asking questions and sharing ideas.",
              "Ensure every concept is understood, breaking down complex topics and checking for understanding.",
              "Provide constructive feedback to help students stay on track and motivated.",
            ]}
            icon={lesson_planning}
          />

          <Card
            Heading="Classroom Management"
            content={[
              "Establish clear rules and expectations from the start to maintain order.",
              "Monitor student engagement regularly and address distractions promptly.",
            ]}
            icon={classroom}
          />

          <Card
            Heading="Effective Communication"
            content={[
              "Plan lessons that are interactive and tailored to your students’ needs.",
              "Incorporate engaging elements like polls and quizzes to make learning engaging.",
              "Set clear objectives for each lesson to keep students focused and motivated.",
            ]}
            icon={communication}
          />
        </div>
      </div>
    </section>
  );
}

interface CardProps {
  Heading: string;
  content: string[];
  icon: string;
}
const Card: React.FC<CardProps> = ({ Heading, content, icon }) => {
  return (
    <div className="flex flex-col text-start bg-white rounded-xl shadow-xl p-8 max-w-sm">
      <div className=" text-[#40A8CD]  rounded-full  mb-4">
        {/* Icon placeholder */}
        <Image
          src={icon}
          alt="icon"
          className="text-inherit"
          width={40}
          height={40}
        />
      </div>
      <h3 className="text-xl font-bold text-header mb-2">{Heading}</h3>
      <ul className="list-disc ml-6 text-[#525252] font-light text-sm">
        {content.map((item, index) => (
          <li key={index} className="py-1">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};
