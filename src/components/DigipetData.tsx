import { Digipet } from "../App";

interface Props {
  digipet?: Digipet;
}

function DigipetData({ digipet }: Props) {
  if (digipet) {
    console.log("what is digipet:", digipet);
    //object w key:value pairs o
    const digipetEntries = Object.entries(digipet);
    console.log("object.entries(digipet)", digipetEntries);
    // logs an array, ["happiness", 80] - ["key", value] - nested array?
    const digipetStats = digipetEntries.map(([key, val]) => (
      <li key={key}>
        {key}: {val}
      </li>
    ));

    return (
      <>
        <h2>Your digipet:</h2>
        <ul>{digipetStats}</ul>
      </>
    );
  } else {
    return <p>No digipet to see 😢</p>;
  }
}

export default DigipetData;
