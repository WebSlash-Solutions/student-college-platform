const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:8080";

export async function getSubscriptionPlans() {
  const response = await fetch(
    `${API_BASE_URL}/api/subscriptions/plans`
  );

  if (!response.ok) {
    throw new Error("Failed to load subscription plans");
  }

  return response.json();
}