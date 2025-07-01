import { dummyCases } from "../dummy_data/dummy_data";

export const getCaseById = async (id: string) => {
  // Later, replace this with fetch(`/api/cases/${id}`)
  return dummyCases.find(c => c.id === id) || null;
};
