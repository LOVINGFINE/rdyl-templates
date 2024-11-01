interface ResultItem {
  icon: string;
  title: string;
  content: string;
}

declare enum ExceptionStatus {
  notFound = "404",
  unauthorized = "401",
  inaccessible = "403",
  serviceError = "500",
}