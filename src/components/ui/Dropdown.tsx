import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { VerticalDotsIcon } from "../svgs";
import Button from "./Button";

export default function Dropdown({
  offsetX = 120,
  offsetY = 0,
  rowId,
}: {
  offsetX?: number;
  offsetY?: number;
  rowId: string | undefined;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState({
    top: 0,
    left: 0,
  });
  const buttonRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    if (buttonRef.current && isOpen) {
      const rect = buttonRef.current.getBoundingClientRect();
      setPosition({
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX,
      });
    }
  }, [isOpen]);

  const handleClickOutside = () => {
    if (!isOpen) return;

    setIsOpen(false);
  };

  return (
    <div>
      <div className="w-full">
        <Button
          variant="flat"
          isIconOnly
          onPress={toggleDropdown}
          ref={buttonRef}
        >
          <VerticalDotsIcon className="text-default-300" />
        </Button>

        <AnimatePresence>
          {isOpen && (
            <div
              onClick={handleClickOutside}
              className="fixed inset-0 z-[500]"
              style={{ background: "transparent" }}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
                className="absolute p-3 rounded-lg shadow-2xl bg-white z-50 space-y-2 w-[175px]"
                style={{
                  top: position.top + offsetY,
                  left: position.left - offsetX,
                }}
                ref={dropdownRef}
                aria-label="Actions"
                onClick={(event) => event.stopPropagation()}
              >
                <div
                  className="hover:bg-primary  text-left text-default hover:text-white px-2 py-1 rounded-md cursor-pointer"
                  onClick={() => {
                    setIsOpen(false);
                    console.log(rowId);
                  }}
                  key="view"
                >
                  View
                </div>
                <div
                  className="hover:bg-primary hover:text-white text-left text-default px-2 py-1 rounded-md cursor-pointer"
                  onClick={() => {
                    setIsOpen(false);
                    console.log(rowId);
                  }}
                  key="edit"
                >
                  Edit
                </div>
                <div
                  className="hover:bg-danger hover:text-white text-left text-danger px-2 py-1 rounded-md cursor-pointer"
                  onClick={() => {
                    setIsOpen(false);
                    console.log(rowId);
                  }}
                  key="delete"
                >
                  Delete
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
