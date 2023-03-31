import { ChevronDownIcon } from "@heroicons/react/24/solid";
import classNames from "classnames";
import { useState } from "react";

type Props = {
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: any[];
  defaultValue?: any;
};

const Combobox = ({ defaultValue, onChange, options }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="relative w-fit">
      <select
        className="bg-accent outline-none border-[1px] border-white p-2 pr-12 rounded m-2 appearance-none"
        onChange={onChange}
        defaultValue={defaultValue || options[0].value}
        // onFocus={() => setIsOpen(true)}
        onBlur={() => setIsOpen(false)}
        onClick={() => setIsOpen(!isOpen)}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      <ChevronDownIcon
        className={classNames(
          "w-5 h-5 text-white absolute right-4 top-[50%] -translate-y-[50%] trans-300",
          isOpen && "rotate-180"
        )}
      />
    </div>
  );
};

export default Combobox;
