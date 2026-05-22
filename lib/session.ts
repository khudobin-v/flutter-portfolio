import type { SessionOptions } from 'iron-session'

export interface SessionData {
  isLoggedIn: boolean
}

export const sessionOptions: SessionOptions = {
  password: process.env.IRON_SESSION_PASSWORD as string,
  cookieName: 'adm_session',
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 7, // 7 дней
  },
}
