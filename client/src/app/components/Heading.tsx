"use client";

interface HeadingProps {
  title?: string;
  spanned?: string;
  subtitle?: string;
  center?: boolean;
}

const Heading: React.FC<HeadingProps> = ({
  title,
  subtitle,
  center,
  spanned,
}) => {
  return (
    <div className={center ? "text-center" : "text-start"}>
      <h2 className="text-4xl md:text-5xl font-[500] text-black mb-4">
        {title} <span className="text-secondary">{spanned}</span>
      </h2>
      <div className="font-light text-neutral-500 text-lg mt-2">{subtitle}</div>
    </div>
  );
};

export default Heading;
