import { Skeleton } from "@ui/Skeleton";
import { Metadata } from "next";
import { JSX } from "react/jsx-runtime";

export const metadata: Metadata = {
	title: 'Charter',
};

export default function Loading(): JSX.Element {
	return <main className="center"><Skeleton height="1.5em" pulse={false} waveLines={false} backgroundColor='none'/></main>
}