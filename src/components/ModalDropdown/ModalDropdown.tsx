/* VENDOR */
import { useState } from "react";

/* APPLICATION */
import down from "../../icons/down.svg";
import { selectAllCategories } from "../../features/categoriesSlice";
import {useAppSelector} from "../../app/hooks";

interface ModalDropdownProps {
  selected: string | undefined;
  setSelected: React.Dispatch<React.SetStateAction<string>>;
}

export const ModalDropdown: React.FC<ModalDropdownProps> = ({
  selected,
  setSelected,
}) => {
  const [isActive, setIsActive] = useState(false),
    options = useAppSelector(selectAllCategories);

  return (
    <div className={options.length > 0 ? "dropdown" : "dropdown dropdown_disabled"} onClick={() => setIsActive(!isActive)}>
      <span className={options.length > 0 ? "dropdown-label" : "dropdown-label dropdown_disabled"}>Категория</span>
      <div className={selected ? "dropdown-btn" : "dropdown-btn placeholder"}>
        {options.find((option) => option.id === selected)?.name ||
          "Выберите категорию"}
        <img src={down} alt="open dropdown" />
      </div>
      {isActive && (
        <div className="dropdown-content">
          {options.map((option) => (
            <div
              className="dropdown-item"
              onClick={() => {
                setSelected(option.id);
                setIsActive(false);
              }}
              key={option.id}
            >
              {option.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};