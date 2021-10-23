type RequestPayload = {
  url: string
  method: string
  body?: any
}
type Request = (payload: RequestPayload) => Promise<any>

export const request: Request = ({ url, method, body }) => {
  return fetch(url, {
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    method,
    body: JSON.stringify(body),
  })
    .then((response) => response.json())
    .catch((error) => console.error(error))
}
