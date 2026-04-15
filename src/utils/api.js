
export const fetchCompanyData = async (cik) => {
  try {
    const res = await fetch(`/api/sec?cik=${cik}`);
    return await res.json();
  } catch (error) {
    throw error;
  }
};