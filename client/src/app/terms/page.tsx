import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `Terms of Use - Tafawwaq Tutoring`,
  };
}
const page = () => {
  return (
    <div className="pb-16">
      {/* Header Section */}
      <div className="w-full bg-[#40A8CD] p-8 md:p-16 lg:p-32 text-center mt-28">
        <h1 className=" md:text-4xl lg:text-5xl font-semibold text-white">
          Terms and Conditions
        </h1>
      </div>

      {/* Main Content Section */}
      <div className="w-full flex flex-col items-center bg-gray-50 py-20">
        {/* Content Section */}
        <div className="max-w-[1140px] w-full space-y-10 text-left px-10 md:px-12 lg:px-32">
          <section>
            <h2 className="text-2xl font-[500] text-black mb-4">
              Introduction
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.
            </p>
          </section>

          {/* Managing Your Information Section */}
          <section>
            <h2 className="text-2xl font-[500] text-black mb-4">
              Managing Your Information
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.
            </p>
          </section>

          {/* Security Section */}
          <section>
            <h2 className="text-2xl font-[500] text-black mb-4">Security</h2>
            <p className="text-gray-700 leading-relaxed">
              Contrary to popular belief, Lorem Ipsum is not simply random text.
              It has roots in a piece of classical Latin literature from 45 BC,
              making it over 2000 years old. Richard McClintock, a Latin
              professor at Hampden-Sydney College in Virginia, looked up one of
              the more obscure Latin words, consectetur, from a Lorem Ipsum
              passage, and going through the cites of the word in classical
              literature, discovered the undoubtable source. Lorem Ipsum comes
              from sections 1.10.32 and 1.10.33 of de Finibus Bonorum et Malorum
              (The Extremes of Good and Evil) by Cicero, written in 45 BC.
            </p>
          </section>

          {/* Additional Sections */}
          <section>
            <h2 className="text-2xl font-[500] text-black mb-4">
              Introduction
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-[500] text-black mb-4">
              Managing Your Information
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default page;
