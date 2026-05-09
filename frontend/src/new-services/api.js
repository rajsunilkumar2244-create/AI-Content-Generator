const BASE_URL = import.meta.env.VITE_API_URL || "/api/v1";
 
async function generateContent(formData) {
  const response = await fetch(`${BASE_URL}/generate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      topic: formData.topic,
      content_type: formData.content_type,
      tone: formData.tone,
      target_audience: formData.target_audience || "",
      additional_context: formData.additional_context || "",
    }),
  });
 
  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err.detail || `Request failed with status ${response.status}`);
  }
 
  return response.json();
}
 
export const api = { generateContent };
