import { Logger } from 'tslog';
import { prisma } from '@PrismaSingleton';

export const dynamic = 'force-dynamic';
const logger = new Logger();

export async function GET(request: Request, { params }: { params: { account: string } }): Promise<Response> {
    if (!params || !params.account) {
        logger.error('params or params.account is undefined');
        return new Response(null, { status: 400, statusText: 'Bad Request' });
    }
    const account = params.account;
    try {
        const accounts = await prisma.user.findMany({
            where: { name: account },
            select: { name: true, image: true },
        });

        if (accounts.length === 0) {
            logger.error('No user found with the provided access token');
            return new Response(null, { status: 404, statusText: 'Not Found' });
        }

        return Response.json(accounts[0], { status: 200 });
    } catch (error) {
        logger.error('Error fetching users:', error);
        return new Response(null, { status: 500, statusText: 'Internal Server Error' });
    }
}