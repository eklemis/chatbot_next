import { NextResponse, NextRequest } from "next/server";

let locales = ["en", "id"];

function getLocale(request: NextRequest) {
	//console.log("Request:", request);
	return "id";
}

export function middleware(request: NextRequest) {
	// Check if there is any supported locale in the pathname
	const { pathname } = request.nextUrl;
	console.log("Path:", pathname);
	const pathnameHasLocale = locales.some(
		(locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
	);

	if (pathnameHasLocale) return;

	// Redirect if there is no locale
	const locale = getLocale(request);

	request.nextUrl.pathname = `/${locale}${pathname}`;
	// e.g. incoming request is /products
	// The new URL is now /en-US/products
	return NextResponse.redirect(request.nextUrl);
}

export const config = {
	matcher: ["/:path*"],
};
