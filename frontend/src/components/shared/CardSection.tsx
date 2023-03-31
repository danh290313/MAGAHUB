import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  title: string;
};

const CardSection = ({ children, title }: Props) => {
  return (
    <div className="bg-gray-300 text-black dark:bg-accent flex flex-col gap-4 dark:text-white ">
      <div className="w-full border-b-[1px] border-gray-400">
        <h1 className="p-4">{title}</h1>
      </div>
      {children}
    </div>
  );
};

export default CardSection;
