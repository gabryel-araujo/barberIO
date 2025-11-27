type StatCardProps = {
  icon: React.ReactNode;
  title: string;
  stats: number | string;
  label: string;
};

export default function StatCard(props: StatCardProps) {
  return (
    <div className="flex flex-col border rounded-xl p-4">
      <div className="flex gap-2 items-center">
        {props.icon}
        <p className="text-slate-700 font-semibold">{props.title}</p>
      </div>
      <p className="text-2xl font-bold text-slate-800">{props.stats}</p>
      <p className="text-muted-foreground text-sm">{props.label}</p>
    </div>
  );
}
