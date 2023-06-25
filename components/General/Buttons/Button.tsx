import { FC } from "react";

interface Props extends React.HTMLProps<HTMLButtonElement> {
  type: "white" | "gray" | "black";
  text: string;
}

const Button: FC<Props> = ({
  text,
  type,
  children,
  className,

  ...props
}) => {
  switch (type) {
    case "black":
      return (
        <button
          {...props}
          className={`grid grid-flow-col items-center gap-1 relative px-6 group/item item py-[6px] font-monument text-[20px] text-black bg-transparent border-[1.5px] hover:text-white duration-200 ease-in-out`}
        >
          {children}
          {text}
          <div
            className={`absolute group-hover/item:w-full top-0 left-0 w-0 h-full bg-black border-[black] duration-150 ease-in-out z-[-1]`}
          ></div>
        </button>
      );
    case "gray":
      return (
        <button
          type="button"
          {...props}
          className={`grid grid-flow-col items-center gap-1 justify-center relative px-6 group/item item py-[6px] font-monument text-[20px] text-gray-500 bg-transparent border-[1.5px] border-[gray] hover:text-white  duration-200 ease-in-out ${className}`}
        >
          {children}
          {text}
          <div
            className={`absolute group-hover/item:w-full top-0 left-0 w-0 h-full bg-gray-500 duration-150 ease-in-out z-[-1]`}
          ></div>
        </button>
      );
    default:
      return (
        <button
          {...props}
          className={`relative px-6 group/item item py-[6px] font-monument text-[20px] text-white bg-transparent border-[1.5px] hover:text-black 
         duration-200 ease-in-out`}
        >
          {children}
          {text}
          <div
            className={`absolute group-hover/item:w-full  top-0 left-0 w-0 h-full bg-white duration-150 ease-in-out z-[-1]`}
          ></div>
        </button>
      );
  }
};

export default Button;
