
import React, { useState } from 'react';

interface AccordionProps {
  isOpen?: boolean;
  accheader?: string;
  accHeaderClass?: string;
  nestedHeader?: React.ReactNode;
  accBody?: React.ReactNode;
  accMainWrapper?: string;
  accWrapper?: string;
  accBodyClass?: string;
  onAccordionOpen?: () => void;
  id?: string;
}

const Accordion: React.FC<AccordionProps> = (props) => {
  const [isOpen, setIsOpen] = useState(props.isOpen ?? true);
  const [isOpening, setIsOpening] = useState(false);

  const handleToggle = (event: React.SyntheticEvent<HTMLDetailsElement>) => {
    event.stopPropagation();

    const target = event.target as HTMLDetailsElement;

    setIsOpen(target.open);

    if (target.open && !isOpening) {
      setIsOpening(true);
      props.onAccordionOpen?.();
    } else {
      setIsOpening(false);
    }
  };

  return (
    <div
      id={props.id}
      className={`border-[1px] border-text_primary rounded-md ${
        isOpen ? 'h-full' : 'h-auto'
      } ${props.accMainWrapper || ''}`}
    >
      <div
        className={`rounded-md p-2 ${isOpen ? 'h-full' : 'h-auto'} ${
          props.accWrapper || ''
        }`}
      >
        <details
          className="group h-full flex-1"
          open={props.isOpen}
          onToggle={handleToggle}
        >
          <summary
            className={`accHeader text-commonGreen1 flex justify-between text-xs items-center font-medium cursor-pointer list-none ${
              props.accHeaderClass || ''
            }`}
            onClick={() => setIsOpen(!isOpen)}
          >
            <div className="d-flex items-center flex-grow-[2]">
              <span className="whitespace-nowrap">{props.accheader}</span>
              {props.nestedHeader || null}
            </div>
            <span className="accArrow ml-1 transition group-open:rotate-180 bg-commonGreen1 rounded-full text-commonWhite">
              <svg
                fill="none"
                height={14}
                shapeRendering="geometricPrecision"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
                width={14}
              >
                <path d="M6 9l6 6 6-6" />
              </svg>
            </span>
          </summary>
          {isOpen ? (
            <div
              className={`${
                props.accBodyClass ? props.accBodyClass : 'mt-2'
              } group-open:animate-fadeIn`}
            >
              {props.accBody}
            </div>
          ) : null}
        </details>
      </div>
    </div>
  );
};

export default Accordion;
