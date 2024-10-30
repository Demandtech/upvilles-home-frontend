import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { VerticalDotsIcon } from "../svgs";
import Button from "./Button";

export default function Dropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="">
      <div className="w-full">
        <Button variant="flat" isIconOnly onClick={toggleDropdown}>
          <VerticalDotsIcon className="text-default-300" />
        </Button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              ref={dropdownRef}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
              className="absolute left-0 right-0 mt-2 p-2 rounded-lg shadow-2xl bg-white max-w-[200px] z-50 w-[175px]"
              aria-label="Actions"
            >
              <div
                className="bg-primary text-white px-2 py-1 rounded-md cursor-pointer"
                onClick={() => {
                  console.log("View clicked");
                  //   setIsOpen(false);
                }}
                key="view"
              >
                View
              </div>
              <div
                className="hover:bg-primary hover:text-white text-default px-2 py-1 rounded-md cursor-pointer mt-1"
                onClick={() => {
                  console.log("Edit clicked");
                  setIsOpen(false);
                }}
                key="edit"
              >
                Edit
              </div>
              <div
                className="hover:bg-danger hover:text-white text-danger px-2 py-1 rounded-md cursor-pointer mt-1"
                onClick={() => {
                  console.log("Delete clicked");
                  setIsOpen(false);
                }}
                key="delete"
              >
                Delete
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
