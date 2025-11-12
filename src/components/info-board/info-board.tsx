import "./info-board.styles.css";

interface infoBoardProps {
  title: String;
  body: String;
}

export default function InfoBoard({ title, body }: infoBoardProps) {
  return (
    <div className="info-board">
      <div className="info-board-title">
        {title}
      </div>
      <div className="info-board-body">{body}</div>
    </div>
  );
}
