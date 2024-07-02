import configuration from "@/config"

type IApiFetch<Body> = {
  url: string
  data?: Body
} & RequestInit

export const apiFetch = async <Body>({
  url,
  method,
  data,
  ...options
}: IApiFetch<Body>) => {
  const res = await fetch(
    `http://localhost:3000${configuration.api.baseApiURL}${url}`,
    {
      method: method ?? "GET",
      ...(data && { body: JSON.stringify(data) }),
      ...options,
    },
  )

  return await res.json()
}
