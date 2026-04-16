import axios from "axios";

export async function GET(req) {
  const { searchParams } = new URL(req.url);

  // To ensure CIK is numeric only
  const cik = searchParams.get("cik");

  if (!cik || isNaN(cik)) {
    return Response.json(
      { error: "CIK must be a numeric value" },
      { status: 400 },
    );
  }

  const paddedCIK = cik.padStart(10, "0");
  try {
    const response = await axios.get(
      `https://data.sec.gov/api/xbrl/companyfacts/CIK${paddedCIK}.json`,
      {
        headers: {
          "User-Agent": "Jatin Gupta your-email@example.com",
        },
      },
    );

    return Response.json(response.data);
  } catch (error) {
    if (error.response?.status === 404) {
      return Response.json({ error: "Company not found" }, { status: 404 });
    }
    return Response.json(
      { error: "Failed to fetch SEC data" },
      { status: 500 },
    );
  }
}
