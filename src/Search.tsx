import { ChangeEventHandler, useState } from "react";

interface IProps {
  handleSearchChange: ChangeEventHandler;
  search: string;
}

export default function Search({ handleSearchChange, search }: IProps) {
  // This file is messy and not correct, lack of time i couldn´t fixs the "search history" and also i wanted for the user to be able to click on a old search string to get that old search back with same filtering as before too.
  let sessionStorageSearchHistory: string[] = localStorage.getItem(
    "copySearchHistory"
  )
    ? JSON.parse(localStorage.getItem("copySearchHistory") || "")
    : [];

  const [searchHistory, setSearchHistory] = useState<string[]>(
    sessionStorageSearchHistory ? sessionStorageSearchHistory.slice(-1) : []
  );
  // This was begining of me trying to fix the click on a old search string to get that old search back with same filtering as before too.
  const [searchDefaultValue, setSearchDefaultValue] = useState<string>();

  const handleSearchSave = () => {
    let copySearchHistory = [...searchHistory];
    copySearchHistory.push(search);
    setSearchHistory(copySearchHistory);

    if (sessionStorageSearchHistory.length >= 10) {
      sessionStorageSearchHistory.splice(0, 1);
      sessionStorageSearchHistory.push(search);
    } else {
      localStorage.setItem(
        "copySearchHistory",
        JSON.stringify(copySearchHistory)
      );
    }
  };

  // This was begining of me trying to fix the click on a old search string to get that old search back with same filtering as before too.
  const handleSearchDefaultValue = (e: React.MouseEvent) => {
    setSearchDefaultValue((e.target as Element).innerHTML);
  };

  return (
    <div className="searchWrapper">
      <input
        type="text"
        placeholder="Game Name"
        onChange={handleSearchChange}
        // defaultValue={searchDefaultValue}
        value={searchDefaultValue}
      />
      <button className="btn" onClick={handleSearchSave}>
        Save your Search
      </button>
      <p>Your Latest Searches:</p>
      {sessionStorageSearchHistory.map((str, id) => {
        return (
          <p key={id} onClick={handleSearchDefaultValue}>
            {str}
          </p>
        );
      })}
    </div>
  );
}
