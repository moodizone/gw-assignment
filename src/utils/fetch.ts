export async function appFetch<T>(
  url: string,
  options: RequestInit = {}
): Promise<T> {
  const { headers, ...others } = options;
  const newHeaders: HeadersInit = {
    ...headers,
    "Content-Type": "application/json",
  };

  const res = await fetch(url, {
    headers: newHeaders,
    ...others,
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Something went wrong");
  }
  return res.json();
}
