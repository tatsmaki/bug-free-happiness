type RequestPayload = {
  url: string
  method: string
  body?: any
  success: (data: any) => void
  fail?: (error: any) => void
}
type Request = (payload: RequestPayload) => Promise<any>

export const request: Request = ({
  url,
  method,
  body,
  success,
  fail = (error) => console.error(error),
}) => {
  return fetch(url, {
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    method,
    body: JSON.stringify(body),
  })
    .then((response) => response.json())
    .then((data) => success(data))
    .catch((error) => fail(error))
}
