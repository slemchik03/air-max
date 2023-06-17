import { FC } from "react";

interface Props {
  text: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}

const Checkbox: FC<Props> = ({ text, checked, onChange }) => {
  return (
    <div className="flex items-center">
      <input
        id={`default-checkbox-${text}`}
        type="checkbox"
        checked={checked}
        onChange={() => onChange(!checked)}
        className="w-4 h-4 accent-teal-600 bg-gray-100 border-gray-300 rounded focus:ring-teal-500 focus:ring-2"
      />
      <label
        htmlFor={`default-checkbox-${text}`}
        className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
      >
        {text}
      </label>
    </div>
  );
};

export default Checkbox;
