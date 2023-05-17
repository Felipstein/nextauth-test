import jwt from 'jsonwebtoken'

export interface User {
  name: string
  email: string
  avatarUrl: string
}

interface AuthResponse {
  user: User
  token: string
}

export interface SignInRequestData {
  email: string
  password: string
}

const delay = (ms = 1000) => new Promise((resolve) => setTimeout(resolve, ms))

export async function signInRequest({
  email,
  password,
}: SignInRequestData): Promise<AuthResponse> {
  await delay()

  if (password === '123456') {
    const token = jwt.sign({ email }, 'secretenho', {
      expiresIn: '1h',
    })

    return {
      user: {
        name: 'Felipe',
        email,
        avatarUrl: 'https://github.com/Felipstein.png',
      },
      token,
    }
  }

  throw new Error('Senha incorreta.')
}

export async function recoverUser(token: string): Promise<User> {
  await delay()

  return {
    name: 'Felipe',
    email: 'felipstein.oliveira@gmail.com',
    avatarUrl: 'https://github.com/Felipstein.png',
  }
}
