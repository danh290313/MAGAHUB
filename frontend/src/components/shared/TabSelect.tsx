import React, {
  memo,
  MouseEvent,
  useState,
  ReactNode,
  useRef,
  useEffect,
  useLayoutEffect,
} from "react";

type Props = {
  selections: ReactNode[];
  selectActions: (value: number) => void;
};

const TabSelect = ({ selectActions, selections }: Props) => {
  const [floatLabelStyle, setFloatLabelStyle] = useState({
    width: 0,
    left: 0,
  });
  const initBtn = useRef<HTMLLIElement>(null);
  const handleChange = (
    e: React.MouseEvent<HTMLLIElement, globalThis.MouseEvent>,
    index: number
  ) => {
    setFloatLabelStyle({
      width: e.currentTarget.offsetWidth,
      left: e.currentTarget.offsetLeft,
    });
    selectActions(index);
  };
  useLayoutEffect(() => {
    if (initBtn.current) {
      setFloatLabelStyle({
        width: initBtn.current.offsetWidth,
        left: initBtn.current.offsetLeft,
      });
    }
  }, []);
  return (
    // <div>
    <ul className="flex relative w-fit  my-4  rounded-md bg-slate-400 dark:bg-gray-800">
      {selections.map((selection, index) => (
        <li
          ref={index === 0 ? initBtn : null}
          id={`tab-select-${index}`}
          key={index}
          className={`z-10 whitespace-nowrap  rounded-sm p-3 transition-all 
          cursor-pointer text-center  text-black dark:text-white`}
          onClick={(e) => {
            handleChange(e, index);
          }}
        >
          <span className="block mx-auto">{selection}</span>
        </li>
      ))}
      <li
        className={`selector-menu absolute  z-0 h-full rounded-md bg-slate-200 dark:bg-gray-400/40 duration-150 ease-out`}
        style={{
          width: `${floatLabelStyle.width}px`,
          left: `${floatLabelStyle.left}px`,
        }}
      ></li>
    </ul>
    // </div>
  );
};
export default memo(TabSelect);
