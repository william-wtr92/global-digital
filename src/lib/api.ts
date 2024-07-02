type IApiFetch<Body> = {
  url: string
  data: Body
} & RequestInit

export const apiFetch = async <Body>({
  url,
  method,
  data,
  ...options
}: IApiFetch<Body>) => {
  const res = await fetch(`http://localhost:3000${url}`, {
    method: method ?? "GET",
    body: JSON.stringify(data),
    ...options,
  })

  return await res.json()
}
