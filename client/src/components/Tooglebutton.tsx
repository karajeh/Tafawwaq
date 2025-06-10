import React from 'react';

interface ToggleButtonProps {
  leftLabel: string;
  rightLabel: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  checked?: boolean;
}

const Tooglebutton: React.FC<ToggleButtonProps> = (props) => {
  return (
    <div>
      <div className="flex items-center justify-center w-full">
        <span className="mx-5 text-md">{props.leftLabel ?? ''}</span>
        <label htmlFor="toggle" className="flex items-center cursor-pointer">
          <input
            type="checkbox"
            id="toggle"
            className="sr-only peer"
            onChange={props.onChange}
            checked={props.checked}
          />
          <div className="block relative bg-[#3d4dff] w-16 h-9 p-1 rounded-full
            before:absolute before:bg-[#a3d154] before:w-7 before:h-7 before:p-1 
            before:rounded-full before:transition-all before:duration-500 before:left-1 
            peer-checked:before:left-8 peer-checked:before:bg-white" />
        </label>
        <span className="mx-5 text-md">{props.rightLabel ?? ''}</span>
      </div>
    </div>
  );
};

export default Tooglebutton;
