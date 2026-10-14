
import { apiClient } from "@/lib/api-client";

export type HealthResponse = {
  status: string;
  application: string;
  timestamp: string;
};

export async function getApiHealth(): Promise<HealthResponse> {
  const response = await apiClient.get<HealthResponse>("/api/health");

  return response.data;
}
