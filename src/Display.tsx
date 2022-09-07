import { IState as IPropsData, IStateFiltered as IPropsFiltered } from "./App";

interface IProps {
  data: IPropsData;
  filtered: IPropsFiltered[];
}

export default function Display({ data, filtered }: IProps) {
  return (
    <section className="displayWrapper">
      <hr></hr>
      <h2>{data.title}</h2>
      <hr></hr>
      <p className="description">{data.description}</p>
      {/* Im doing a nestes map so i can resturn what i want to return, i would have done this different if i started the project over or in another project. I would have broken out arrays and saved earlier i the code so i dont have to do nested things.  */}
      {filtered.map((genreObj) => {
        return (
          <div key={genreObj.id}>
            <h3>{genreObj.title}</h3>
            <div className="genreContainer" key={genreObj.id}>
              {genreObj.items.map((gameObj) => {
                return (
                  <div className="genreBox" key={gameObj.id}>
                    <img src={gameObj.image} alt="game-img" />
                    <p>{gameObj.title}</p>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </section>
  );
}
