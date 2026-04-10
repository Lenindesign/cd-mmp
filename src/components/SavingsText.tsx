interface SavingsTextProps {
  text: string;
}

const AMOUNT_RE = /^(\$[\d,]+\/mo\.)/;

export default function SavingsText({ text }: SavingsTextProps) {
  const match = text.match(AMOUNT_RE);
  if (!match) return <>{text}</>;
  return (
    <>
      <strong>{match[1]}</strong>
      {text.slice(match[1].length)}
    </>
  );
}
