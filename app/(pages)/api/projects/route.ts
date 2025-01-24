import { NextResponse } from 'next/server';
import { Logger } from 'tslog';

import { prisma } from '@PrismaSingleton';

export const dynamic = 'force-dynamic';
const logger = new Logger();

export async function POST(request: Request): Promise<Response> {
	try {
		const { name, product } = await request.json();

		const newProject = await prisma.project.upsert({
			where: { name },
			update: {},
			create: {
				name,
				products: {
					create: [product],
				},
			},
		});

		return NextResponse.json(newProject, { status: 200 });
	} catch (error) {
		console.error(error);
		return NextResponse.json(
			{ error: 'Something went wrong' },
			{ status: 500 },
		);
	}
}

export async function GET(): Promise<Response> {
	try {
		const proj = await prisma.project.findMany();

		if (proj.length === 0) {
			logger.error('No user found with the provided access token');
			return new Response(null, { status: 404, statusText: 'Not Found' });
		}

		return NextResponse.json(proj, { status: 200 });
	} catch (error) {
		console.error(error);
		return NextResponse.json(
			{ error: 'Something went wrong' },
			{ status: 500 },
		);
	}
}
