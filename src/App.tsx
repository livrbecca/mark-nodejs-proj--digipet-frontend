import { useEffect, useState } from "react";
import DigipetActions from "./components/DigipetActions";
import DigipetData from "./components/DigipetData";
import "./style.css";

export interface Digipet {
  happiness: number;
  nutrition: number;
  discipline: number;
}

function App() {
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [message, setMessage] = useState<string>();
  const [infoMessage, setInfoMessage] = useState<string>();
  const [digipetStats, setDigipetStats] = useState<Digipet>();

  const loadDataFromEndpoint = async (endpoint: `/${string}`) => {
    // try... catch documentation:
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/try...catch
    try {
      const res = await fetch(
        `https://fast-peak-16437.herokuapp.com${endpoint}`
      );
      // https://fast-peak-16437.herokuapp.com HEROKU
      const body = await res.json();
      setMessage(body.message.includes("/") ? body.description : body.message);
      setDigipetStats(body.digipet);
    } catch (err) {
      console.log(err);
      setMessage(`${err.name}: ${err.message}`);
    }
  };

  const instructionsData = async () => {
    const res = await fetch(
      `https://fast-peak-16437.herokuapp.com/instructions`
    );
    const body = await res.json();
    const mainMessage: string = body.description;
    setInfoMessage(mainMessage);
  };

  useEffect(() => {
    instructionsData();
  }, [setInfoMessage]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    // safe to ignore exhaustive deps warning as we're _not_ triggering infinite updates, since our setState is conditional and not executed on all rerenders after the first one
    if (isFirstLoad) {
      // populate data on first load
      loadDataFromEndpoint("/");
      setIsFirstLoad(false);
    }
  });

  return (
    <main className="game-container">
      <h1>Digipet</h1>
      {isFirstLoad && <p>Loading...</p>}
      {message && <p>{message}</p>}
      <hr />
      <DigipetData digipet={digipetStats} />
      <hr />
      <DigipetActions
        instructions={[
          {
            name: "Instructions",
            handler: () => alert(infoMessage),
            // replace terminology
          },
        ]}
        actions={[
          {
            name: "Check digipet",
            handler: () => loadDataFromEndpoint("/digipet"),
          },
          {
            name: "Hatch",
            handler: () => loadDataFromEndpoint("/digipet/hatch"),
          },
          {
            name: "Walk",
            handler: () => loadDataFromEndpoint("/digipet/walk"),
          },
          {
            name: "Feed",
            handler: () => loadDataFromEndpoint("/digipet/feed"),
          },
          {
            name: "Train",
            handler: () => loadDataFromEndpoint("/digipet/train"),
          },
          {
            name: "Ignore",
            handler: () => loadDataFromEndpoint("/digipet/ignore"),
          },
        ]}
      />
    </main>
  );
}

export default App;
