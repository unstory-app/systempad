import type { Metadata } from "next";
import { StackProvider } from "@stackframe/stack";
import { stackClientApp } from "../stack/client";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";

const inter = Inter({
	variable: "--font-inter",
	subsets: ["latin"],
	display: "swap",
});

const outfit = Outfit({
	variable: "--font-outfit",
	subsets: ["latin"],
	display: "swap",
});

export const metadata: Metadata = {
	title: "SystemPad | Design Scalable System Architectures",
	description: "The fastest way to design, document, and share system architectures.",
};

import { ThemeProvider } from "@/components/theme-provider";

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<head>
				<link rel="icon" href="/favicon.svg" type="image/svg+xml"></link>
			</head>
			<body className={`${inter.variable} ${outfit.variable} antialiased bg-background text-foreground`}>
				<StackProvider app={stackClientApp}>
					<ThemeProvider>
						{children}
					</ThemeProvider>
				</StackProvider>
			</body>
		</html>
	);
}
