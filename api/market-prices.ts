import type { VercelRequest, VercelResponse } from "@vercel/node";

const RESOURCE_ID =
  "9ef84268-d588-465a-a308-a864a43d0070";

export default async function handler(
  request: VercelRequest,
  response: VercelResponse,
) {
  try {
    if (request.method !== "GET") {
      return response.status(405).json({
        error: "Method not allowed",
      });
    }

    const apiKey = process.env.DATA_GOV_API_KEY;

    if (!apiKey) {
      return response.status(500).json({
        error: "DATA_GOV_API_KEY is not configured",
      });
    }

    const {
      state,
      district,
      market,
      commodity,
      limit = "100",
    } = request.query;

    const params = new URLSearchParams();

    params.set("api-key", apiKey);
    params.set("format", "json");
    params.set(
      "resource_id",
      RESOURCE_ID,
    );
    params.set(
      "limit",
      String(limit),
    );

    const filters: Record<string, string> = {};

    if (typeof state === "string" && state) {
      filters.state = state;
    }

    if (
      typeof district === "string" &&
      district
    ) {
      filters.district = district;
    }

    if (
      typeof market === "string" &&
      market
    ) {
      filters.market = market;
    }

    if (
      typeof commodity === "string" &&
      commodity
    ) {
      filters.commodity = commodity;
    }

    if (Object.keys(filters).length > 0) {
      params.set(
        "filters",
        JSON.stringify(filters),
      );
    }

    const apiUrl =
      `https://api.data.gov.in/resource/${RESOURCE_ID}?` +
      params.toString();

    const apiResponse = await fetch(apiUrl);

    if (!apiResponse.ok) {
      const errorText =
        await apiResponse.text();

      console.error(
        "Data.gov.in error:",
        errorText,
      );

      return response.status(
        apiResponse.status,
      ).json({
        error:
          "Government market API request failed",
      });
    }

    const data =
      await apiResponse.json();

    return response.status(200).json({
      records: data.records ?? [],
      total:
        data.total_records ??
        data.total ??
        0,
      count:
        data.records?.length ?? 0,
    });
  } catch (error) {
    console.error(
      "Market API error:",
      error,
    );

    return response.status(500).json({
      error:
        "Unable to fetch market prices",
    });
  }
}