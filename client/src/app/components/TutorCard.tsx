import Image from 'next/image';
import { Star, Clock, MessageSquare, BadgeCheck } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createLessonBooking } from '../../api/lessonService';

export interface TutorCardProps {
    id: string;
    name: string;
    title: string;
    description: string;
    image: string;
    rating: {
      stars: number;
      value: number;
      count: number;
    };
    isAvailable: boolean;
    rate: number;
    hoursTutored: number;
    responseTime: string;
    review: {
      quote: string;
      reviewer: string;
      details: string;
    };
    location: string;
    memberSince: string;
    tutoringExperience: string;
    age: string;
    gender: string;
    language: string;
    educationLevel: string;
    teachingGrades:string[];
    subjects:string[];
}

const TutorCard = ( tutor : TutorCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const wordLimit = 30;
  const words = tutor?.review?.details.split(' ');

  // Toggle expanded state
  const toggleReadMore = () => setIsExpanded((prev: boolean) => !prev);
  const router = useRouter();
  const handleButtonClick = (id: string) => {
    // Navigate to the full profile URL using the tutor's id
    router.push(`/find-a-tutor/${id}`);
  };

  // handle booking
  const handleBooking = async () => {
    const sessionUrl = await createLessonBooking({
      selectedHours: 5,
      // Currently get the teacher id and subject manually,
      subject: 'English teacher',
      teacher: '679bd7e9a92088bee01817b3',
    });

    router.push(sessionUrl);
  };
  return (
    <div className="mt-12 mx-auto bg-white rounded-lg shadow-lg overflow-hidden p-4 md:p-6">
      <div className="p-4 md:p-6">
        <div className="flex flex-col md:flex-row ">
          {/* Tutor Image and Rating */}
          <div className="md:w-1/4 mb-4 md:mb-0 flex flex-col gap-3 items-start justify-start ">
            <Image
              src={tutor.image}
              alt={tutor.name}
              className="w-40 h-40 md:w-52 md:h-52 rounded-xl object-cover mx-auto md:mx-0"
              width={150}
              height={150}
            />
            <div className="flex items-center mb-2">
              {Array.from({ length: tutor.rating.stars }, (_, index) => (
                <Star
                  key={index}
                  className="w-5 h-5 fill-yellow-400 text-yellow-400"
                />
              ))}
              <span className="ml-2 text-gray-600">
                {tutor.rating.value} ({tutor.rating.count})
              </span>
            </div>
          </div>

          {/* Tutor Details and Buttons */}
          <div className="md:w-2/4 md:px-4 flex flex-col justify-start gap-3  md:border-r border-slate py-2 mr-4">
            {/* <div className=""> */}
            <div className="flex items-center mb-2">
              <h2 className="text-xl md:text-xl font-semibold mr-2">
                {tutor.name}
              </h2>

              <BadgeCheck className="w-5 text-green-500" />
            </div>
            <p className="text-[#40A8CD] font-semibold text-lg">
              {tutor.title}
            </p>
            <p className="text-header  ">
              {tutor.description}

              <Link
                href={`/find-a-tutor/${tutor.id}`}
                className="text-blue-500"
              >
                See Full Profile
              </Link>
            </p>
            {/* </div> */}
            <div className="flex gap-3 ">
              <button
                className="bg-primary w-40 hover:bg-blue-400 py-3 rounded-md text-white transition-transform transform hover:scale-105 active:scale-95"
                onClick={() => handleButtonClick(tutor.id)}
              >
                View Full Profile
              </button>
            </div>
          </div>

          {/* Rate and Additional Info */}

          <div className="md:w-1/8 mt-4 md:mt-0 flex flex-col justify-between ">
            <div className="flex justify-center flex-col items-start">
              <p className="text-3xl mt-4 font-semibold text-left">
                <sup className="text-sm">AED</sup>
                {tutor.rate}/hr
              </p>
              <div className="flex items-center mt-8 justify-start">
                <Clock className="w-4 h-4  text-green-500 mr-2" />
                <p className="text-gray">{tutor.hoursTutored} hours tutoring</p>
              </div>
              <div className="flex items-center mt-2 justify-start">
                <MessageSquare className="w-4 h-4 text-green-500 mr-2" />
                <p className="text-gray">
                  Respond time:
                  <span className="font-bold text-gray">
                    {tutor.responseTime}
                  </span>
                </p>
              </div>
              <div className="w-full flex flex-wrap ">
                <button
                  className="w-full mt-8 bg-secondary py-3 rounded-md text-white transition-transform transform hover:scale-105 active:scale-95"
                  onClick={handleBooking}
                >
                  Book a Lesson
                </button>
                <button className="w-full mt-2 bg-[#40A8CD] hover:bg-[#40A8CD] py-3 rounded-md text-white transition-transform transform hover:scale-105 active:scale-95">
                  Chat Now
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-gray-50  rounded-md">
          <div className="mt-8 mx-auto  bg-[#42ABD108] rounded-lg shadow-lg overflow-hidden p-4 md:p-6">
            <blockquote className="text-header font-semibold">
              <span className="text-4xl font-serif text-[#A3D154] ">
                &#8220;
              </span>
              {tutor.review.quote}
            </blockquote>
            {/* <p className="mt-2 ml-5 text-header">
              {tutor.description}{" "}
              <Link href="#" className="text-blue-500">
                Read full review
              </Link>
            </p> */}
            <p className="mt-2 ml-5 text-header">
              {/* Display full or truncated description based on state */}
              {isExpanded || words.length <= wordLimit
                ? tutor.review.details
                : `${words.slice(0, wordLimit).join(' ')}...`}
              {/* Conditionally show "Read more/less" link if description exceeds limit */}
              {words.length > wordLimit && (
                <>
                  <span className="text-[#707070]">
                    {isExpanded ? '-' + tutor.review.reviewer : ''}
                  </span>
                  <span
                    onClick={toggleReadMore}
                    className="text-blue-500 cursor-pointer ml-2"
                  >
                    {isExpanded ? 'Read less' : 'Read full review'}
                  </span>
                </>
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TutorCard;
