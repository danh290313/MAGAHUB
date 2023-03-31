import { motion } from "framer-motion";
import { memo } from "react";
import { RiMoonClearFill, RiSunFill } from "react-icons/ri";
import { useTheme } from "~/context/themeContext";

function DarkModeSwitch() {
  const [theme, toggleTheme] = useTheme();
  const isOn = theme === "light" ? true : false;
  const spring = {
    type: "spring",
    stiffness: 700,
    damping: 30,
  };

  return (
    <div
      onClick={() => toggleTheme()}
      className={` flex-shrink-0 flex-start m-auto flex items-center h-[28px] w-[60px] rounded-[50px] bg-zinc-100 p-[5px] shadow-inner hover:cursor-pointer dark:bg-zinc-700 ${
        isOn && "place-content-end"
      }`}
    >
      <motion.div
        className="flex h-[20px] w-[20px] items-center justify-center rounded-full bg-black/90"
        layout
        transition={spring}
      >
        <motion.div whileTap={{ rotate: 360 }}>
          {isOn ? (
            <RiSunFill className="h-3 w-3 text-yellow-300" />
          ) : (
            <RiMoonClearFill className="h-3 w-3 text-slate-200" />
          )}
        </motion.div>
      </motion.div>
    </div>
  );
}
export default memo(DarkModeSwitch);
