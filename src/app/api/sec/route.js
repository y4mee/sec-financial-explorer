import axios from "axios";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const cik = searchParams.get("cik");

  try {
    const response = await axios.get(
      `https://data.sec.gov/api/xbrl/companyfacts/CIK${cik}.json`,
      {
        headers: {
          "User-Agent": "user@gmail.com",
        },
      },
    );

    return Response.json(response.data);
  } catch (error) {
    return Response.json({ error: "Failed to fetch" }, { status: 500 });
  }
}
