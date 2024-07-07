type IApiFetch<Body> = {
  url: string
  data?: Body
} & RequestInit

export type ApiResponse<Data> = {
  status: number
  data: Data
}

export const apiFetch = async <Body>({
  url,
  method,
  data,
  ...options
}: IApiFetch<Body>) => {
  const baseApiURL = process.env.NEXT_PUBLIC_BASE_API_URL || ""
  const res = await fetch(`${baseApiURL}${url}`, {
    method: method ?? "GET",
    credentials: "include",
    ...(data && { body: JSON.stringify(data) }),
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  })

  const responseData = await res.json()

  return { status: res.status, data: responseData }
}
