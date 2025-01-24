import { MetadataRoute } from 'next';

import { hostName } from '@config';

export default async function robots(): Promise<MetadataRoute.Robots> {
	const host = await hostName;

	return {
		rules: {
			userAgent: '*',
			allow: '/',
			disallow: '/private/',
		},
		sitemap: `${host}sitemap.xml`,
	};
}
