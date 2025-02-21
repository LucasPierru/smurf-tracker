import { api } from "./api";

export const getReportedUsers = async (
  search?: string
): Promise<{
  mostReportedUsers:
    | { _id: string; username: string; reportCount: number }[]
    | null;
  error: unknown;
}> => {
  try {
    const response = await api(
      `/api/reported-users/most-reported${
        search ? `?search=${encodeURIComponent(search)}` : ""
      }`,
      {
        method: "GET",
      }
    );
    const data = await response.json();
    const { mostReportedUsers, error } = data;
    if (error) throw error;
    return { mostReportedUsers, error: null };
  } catch (error) {
    return { mostReportedUsers: null, error };
  }
};
