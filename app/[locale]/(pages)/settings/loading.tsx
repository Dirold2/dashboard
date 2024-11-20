import { Metadata } from "next";
import { JSX } from "react/jsx-runtime";

export const metadata: Metadata = {
	title: 'Settings',
};
  
export default function Loading(): JSX.Element {
	return <main className="center">Loading...</main>
}
