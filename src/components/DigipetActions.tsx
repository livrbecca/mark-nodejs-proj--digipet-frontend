/**
 * Represents data which is used to make the UI for a DigipetAction.
 */
export interface DigipetAction {
  /** The action name */
  name: string;
  /** The callback to trigger */
  handler?(e: React.MouseEvent): void;
}

interface Props {
  actions: DigipetAction[];
  instructions: DigipetAction[];
}

function DigipetActions({ actions, instructions }: Props) {
  return (
    <>
      <div className="btn-box">
        {actions.map(({ name, handler }) => (
          <button className="btn" key={name} onClick={handler}>
            {name}
          </button>
        ))}
      </div>
      {instructions.map(({ name, handler }) => (
        <>
          <br />
          <button key={name} className="inst btn" onMouseEnter={handler}>
            Hover for {name}!
          </button>
          <br />
        </>
      ))}
    </>
  );
}

export default DigipetActions;
