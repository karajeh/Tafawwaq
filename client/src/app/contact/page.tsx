import Image from "next/image";
import contactHero from "public/images/contact/contact.png";

// fonts
import { jost } from "../../font";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `Contact Us - Tafawwaq Tutoring`,
  };
}
export default function ContactPage() {
  return (
    <div className=" relative py-28 ">
      <Image
        className=" absolute left-0 top-0 w-full h-full object-cover"
        src={contactHero}
        alt="contact image"
      />
      <div className="absolute inset-0 bg-bgHero"></div>

      <div className=" max-w-7xl m-auto px-4 flex flex-col md:flex-row gap-10 text-center md:items-center justify-center md:gap-40 relative">
        <div className="  text-white">
          <span className="font-semibold  block">Contact Us</span>
          <h1
            className={`${jost.className} py-4 font-medium text-4xl md:text-5xl text-center`}
          >
            We&apos;re Here to Help!
          </h1>
          <p className=" opacity-70 max-w-xs md:max-w-md m-auto">
            Got questions? Our team is ready to assist with any inquiries or
            support.
          </p>

          {/* <div className=" flex flex-col md:flex-row items-center gap-3 md:gap-6 mx-auto md:justify-center  mt-8">
            <div className=" flex items-center  gap-2">
              <TfiEmail />
              <span>myjourney@email.com</span>
            </div>

            <div className=" flex gap-3 text-[#39c6ff]">
              <Icon>
                <FaInstagram />
              </Icon>
              <Icon>
                <RiFacebookCircleLine />
              </Icon>
              <Icon>
                <PiTwitterLogo />
              </Icon>
            </div>
          </div> */}
        </div>

        <div
          style={{ background: "rgb(255 255 255 / 0.1)" }}
          className=" backdrop-blur-2xl rounded-xl p-6  md:basis-[500px] "
        >
          <ContactForm />
        </div>
      </div>
    </div>
  );
}

// function Icon({ children }: { children: React.ReactElement }) {
//   return (
//     <button className=" w-8 h-8 backdrop-blur rounded-lg text-2xl flex justify-center items-center">
//       {children}
//     </button>
//   );
// }

function ContactForm() {
  return (
    <form className="flex flex-col gap-6 text-white">
      <div className=" text-left">
        <label className=" mb-2 block " htmlFor="email">
          Your Email
        </label>
        <input
          className=" border w-full text-white border-white rounded-xl px-2 py-3 bg-transparent"
          type="text"
          id="email"
          placeholder="e.g johndoe@email.com"
        />
      </div>
      <div className=" text-left">
        <label className=" mb-2 block " htmlFor="name">
          Your Name
        </label>
        <input
          type="text"
          id="name"
          className=" border w-full border-white rounded-xl px-2 py-3  bg-transparent"
          placeholder="e.g John Doe"
        />
      </div>

      <div className=" text-left">
        <label className=" mb-2 block " htmlFor="name">
          Message
        </label>
        <textarea
          rows={4}
          id="name"
          className=" border w-full border-white rounded-xl px-2 py-3  bg-transparent"
          placeholder="Start typing..."
        />
      </div>
      <button className="bg-[#f3f3f3] text-black p-3 rounded-xl transition-all hover:scale-105 hover:bg-opacity-90 hover:shadow-lg active:scale-[0.98]">
        Submit
      </button>
    </form>
  );
}

// border: 1px solid rgba(221, 221, 225, 1)
