import { NextResponse, type NextRequest } from "next/server";

const corsOptions = {
  allowedMethods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE", "OPTIONS"],
  allowedOrigins: ["http://localhost:3002"],
  allowedHeaders: ["Content-Type", "Authorization"],
  exposedHeaders: [],
  maxAge: 86400,
  credentials: true,
};

export async function proxy(request: NextRequest) {
  const response = NextResponse.next();
  const origin = request.headers.get("origin") ?? "";
  const isProd = process.env.NODE_ENV === "production";

  if (isProd) {
    if (
      origin &&
      new URL(origin).hostname.endsWith(".cozybrian.dev") &&
      corsOptions.allowedOrigins.includes(origin)
    ) {
      response.headers.set("Access-Control-Allow-Origin", origin);
      response.headers.set("Access-Control-Allow-Credentials", "true");
    }
  } else {
    if (corsOptions.allowedOrigins.includes(origin)) {
      response.headers.set("Access-Control-Allow-Origin", origin);
    }
  }

  response.headers.set(
    "Access-Control-Allow-Credentials",
    corsOptions.credentials.toString(),
  );
  response.headers.set(
    "Access-Control-Allow-Methods",
    corsOptions.allowedMethods.join(","),
  );
  response.headers.set(
    "Access-Control-Allow-Headers",
    corsOptions.allowedHeaders.join(","),
  );
  response.headers.set(
    "Access-Control-Expose-Headers",
    corsOptions.exposedHeaders.join(","),
  );
  response.headers.set("Access-Control-Max-Age", corsOptions.maxAge.toString());

  return response;
}

export const config = {
  matcher: "/api/auth/:path*",
};
