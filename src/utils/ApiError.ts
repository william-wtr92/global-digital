export class ApiError extends Error {
  status = 0

  constructor({ data, status }: { data: string; status: number }) {
    super(data)

    this.status = status
  }
}
