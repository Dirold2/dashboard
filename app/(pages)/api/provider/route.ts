import authConfig from '.auth/auth.config';

export async function GET(): Promise<Response> {
	try {
		const providers = authConfig.providers;
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const extractProviderInfo = (
			provider: any,
		): { id: string; name: string; style: any } | undefined => {
			if (provider.style && typeof provider.style === 'object') {
				return {
					id: provider.id,
					name: provider.name,
					style: provider.style,
				};
			}
			return;
		};

		const providerData = providers.map(extractProviderInfo);

		return new Response(JSON.stringify(providerData), {
			headers: { 'Content-Type': 'application/json' },
		});
	} catch (error) {
		console.error('Error:', error);
		return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
			status: 500,
			headers: { 'Content-Type': 'application/json' },
		});
	}
}
