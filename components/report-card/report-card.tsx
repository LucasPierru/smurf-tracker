type ReportCardProps = {
  username: string;
  reportCount: number;
  notes?: string;
};

const ReportCard = ({ username, reportCount, notes }: ReportCardProps) => {
  return (
    <div className="bg-white/5 p-4 rounded-lg border border-white/10">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-semibold">{username}</h3>
          <p className="text-md text-white/70">Reported {reportCount} times</p>
        </div>
        <span className="bg-red-500/20 text-red-300 px-2 py-1 rounded text-md">
          {reportCount} reports
        </span>
      </div>
      {notes && <p className="mt-2 text-md text-white/60">{notes}</p>}
    </div>
  );
};

export default ReportCard;
