import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

const middleware = async (req: NextRequest) => {
  const path = req.nextUrl.pathname;
  if (path?.includes("/app") || path?.includes("/auth")) {
    return NextResponse.next();
  }

  const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const isProtected = path.includes("/backoffice") || path.includes("/api");

  if (!session && isProtected) {
    return NextResponse.redirect(new URL("/auth/signin", req.url));
  }
  return NextResponse.next();
};

export default middleware;
