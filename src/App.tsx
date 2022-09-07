import { useEffect, useState } from "react";
import Filter from "./Filter";
import Search from "./Search";
import Display from "./Display";
import "./styles.css";

export interface IState {
  title: string;
  description: string;
  lists: [
    {
      id: string;
      items: [
        {
          id: number;
          image: string;
          provider: string;
          title: string;
        }
      ];
      title: string;
    }
  ];
}

export interface IStateFiltered {
  id: string;
  title: string;
  items: {
    id: number;
    image: string;
    provider: string;
    title: string;
  }[];
}

export default function App() {
  const [data, setData] = useState<IState>();
  const [isCheckAll, setIsCheckAll] = useState(false);
  const [isCheck, setIsCheck] = useState<string[]>([]);
  const [search, setNewSearch] = useState("");

  // Collecting my data and save it in a state.
  useEffect(() => {
    fetch("http://localhost:1234/api/games/lists.json")
      .then((response) => response.json())
      .then((data) => setData(data));
  }, []);

  // Securing that my Select All is checked in correct ways.
  useEffect(() => {
    if (isCheck.length < 3) setIsCheckAll(false);
    if (isCheck.length === 3) setIsCheckAll(true);
  }, [isCheck]);

  // This is to faster check all boxes in filter
  const handleSelectAll = () => {
    setIsCheckAll(!isCheckAll);
    if (data) {
      setIsCheck(data.lists.map((genreObj) => genreObj.id));
    }
    if (isCheckAll) {
      setIsCheck([]);
    }
  };

  // This is to check choosen input box
  const handleClick = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, checked } = e.target;
    setIsCheck([...isCheck, id]);
    if (!checked) {
      setIsCheck(isCheck.filter((genreId) => genreId !== id));
    }
  };

  // Save value from the input type text in a state
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewSearch(e.target.value);
  };

  // Saving correct data in a variabel after filtering the data and later sending it to Display.tsx
  let filtered: IStateFiltered[] = [];
  data
    ? (filtered = data.lists
        .filter((item) => {
          return isCheck.includes(item.id);
        })
        .map((genreObj) => {
          return {
            id: genreObj.id,
            title: genreObj.title,
            items: genreObj.items.filter((gameObj) => {
              return (
                !search ||
                gameObj.title.toLowerCase().includes(search.toLowerCase())
              );
            }),
          };
        }))
    : "";

  // Collecting data for the filter/input elements and later using the catalog variabel for displaying on the browser.
  let catalog: JSX.Element[] = [];
  if (data) {
    catalog = data.lists.map(({ id, title }) => {
      return (
        <div key={id}>
          <Filter
            key={id}
            name={title}
            id={id}
            handleClick={handleClick}
            isChecked={isCheck.includes(id)}
          />
        </div>
      );
    });
  }

  return (
    <div>
      {data ? (
        <div className="mainWrapper">
          <h2 className="filterTitle">Filter Games by Genrer</h2>
          <Filter
            name="Select All"
            id="selectAll"
            handleClick={handleSelectAll}
            isChecked={isCheckAll}
          />
          {catalog}
          <h2 className="searchTitle">Search a Game</h2>
          <Search handleSearchChange={handleSearchChange} search={search} />
          <Display filtered={filtered} data={data} />
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
