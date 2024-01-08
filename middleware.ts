import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(req: NextRequest) {

    const url = req.nextUrl
    const { pathname } = url

    console.log(pathname)
    console.log(req.headers.get("referer"))
    console.log(process.env.APP_URL as string)

    if (pathname.startsWith(`/api/`)) {
        if (!req.headers.get("referer")?.includes(process.env.APP_URL as string)) {
          return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
        }
      }

     return NextResponse.next()

}

export const config = {
  matcher: ['/((?!_next|fonts|examples|svg|[\\w-]+\\.\\w+).*)'],
}