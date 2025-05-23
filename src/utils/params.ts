function getNum(url: URL, key: string, fallback: number) {
  return parseFloat(url.searchParams.get(key) || "") || fallback;
}

export function getQueryParams(url: URL) {
  return {
    search: url.searchParams.get("search") || "",
    categories: url.searchParams.getAll("category") || "",
    minRating: getNum(url, "minRating", 1),
    maxRating: getNum(url, "maxRating", 5),
    minPrice: getNum(url, "minPrice", 0),
    maxPrice: getNum(url, "maxPrice", Number.MAX_SAFE_INTEGER),
    startDate: url.searchParams.get("startDate"),
    endDate: url.searchParams.get("endDate"),
    sort: url.searchParams.get("sort") || "date",
    order: url.searchParams.get("order") || "asc",
    page: parseInt(url.searchParams.get("page") || "1"),
    pageSize: parseInt(url.searchParams.get("pageSize") || "10"),
  };
}
