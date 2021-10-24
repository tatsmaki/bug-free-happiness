type RequestPayload = {
  path: string
  method: string
  body?: any
  success: (data: any) => void
  fail?: (error: any) => void
}
type Request = (payload: RequestPayload) => Promise<any>

export const request: Request = async ({
  path,
  method,
  body,
  success,
  fail = (error) => console.error(error),
}) => {
  const url = process.env.REACT_APP_API + path

  try {
    const response = await fetch(url, {
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      method,
      body: JSON.stringify(body),
    })
    const data = await response.json()

    if (response.ok) {
      success(data)
    } else {
      fail(data)
    }
  } catch (error) {
    fail(error)
  }
}
