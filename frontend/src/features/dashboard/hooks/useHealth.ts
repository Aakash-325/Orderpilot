import { useQuery } from "@tanstack/react-query";
import { getApiHealth } from "../api/api";

export function useApiHealth() {
  return useQuery({
    queryKey: ["api-health"],
    queryFn: getApiHealth,
    retry: false,
  });
}