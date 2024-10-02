import { Logger } from 'tslog';
import { prisma } from '@PrismaSingleton';

export const dynamic = 'force-dynamic';
const logger = new Logger();

export async function GET(
    request: Request,
    { params }: { params: { name: string } },
): Promise<Response> {
    if (!params || !params.name) {
        logger.error('params or params.name is undefined');
        return new Response(null, { status: 400, statusText: 'Bad Request' });
    }

    try {
        const userId = await prisma.user.findFirst({
            where: { name: params.name },
            select: { id: true },
        });

        if (!userId) {
            logger.error('No user found with the provided access token');
            return new Response(null, { status: 404, statusText: 'Not Found' });
        }

        const providers = await prisma.account.findMany({
            where: { userId: userId.id },
            select: { provider: true },
        });

        return new Response(JSON.stringify(providers.map(item => item.provider)), {
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        logger.error('Error fetching users:', error);
        return new Response(null, { status: 500, statusText: 'Internal Server Error' });
    }
}