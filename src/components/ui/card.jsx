export function Card({ title, value }) {
  return (
    <div className="bg-white dark:bg-zinc-900 rounded-xl p-4 shadow border text-center">
      <h2 className="text-sm font-semibold text-muted-foreground">{title}</h2>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
}
