export type RealMarketPrice = {
  state: string;
  district: string;
  market: string;
  commodity: string;
  variety: string;
  grade: string;
  arrival_date: string;
  min_price: string;
  max_price: string;
  modal_price: string;
};

export type MarketApiResponse = {
  records: RealMarketPrice[];
  total: number;
  count: number;
};

export async function getMarketPrices(): Promise<MarketApiResponse> {
  const response = await fetch("/api/market-prices");

  if (!response.ok) {
    throw new Error("Failed to fetch market prices");
  }

  return response.json();
}