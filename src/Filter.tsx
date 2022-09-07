import { ChangeEventHandler } from "react";

interface IProps {
  id: string;
  name: string;
  handleClick: ChangeEventHandler<Element>;
  isChecked: boolean;
}

export default function Filter({ id, name, handleClick, isChecked }: IProps) {
  return (
    <div className="filterWrapper">
      <input
        id={id}
        type="checkbox"
        name={name}
        onChange={handleClick}
        checked={isChecked}
      />
      <label htmlFor={id}>{name}</label>
    </div>
  );
}
