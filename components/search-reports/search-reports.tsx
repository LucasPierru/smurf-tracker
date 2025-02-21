import { getReportedUsers } from "@/requests/reportedUser";
import { Card } from "../card/card";
import H3 from "../headers/h3/h3";
import ReportCard from "../report-card/report-card";
import { SearchInput } from "./search-input/search-input";

const SearchReports = async ({ search }: { search?: string }) => {
  const { mostReportedUsers } = await getReportedUsers(search);

  return (
    <Card>
      <H3>Recent reports</H3>
      <SearchInput />
      <div className="flex flex-col gap-4 mt-4">
        {mostReportedUsers &&
          mostReportedUsers.map((user) => (
            <ReportCard
              key={user._id}
              username={user.username}
              reportCount={user.reportCount}
            />
          ))}
      </div>
    </Card>
  );
};

export default SearchReports;
