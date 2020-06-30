interface IMailConfig {
	driver: 'ethereal' | 'ses';

	defaults: {
		from: {
			email: string;
			name: string;
		};
	};
}

export default {
	driver: process.env.MAIL_DRIVE || 'ethereal',

	defaults: {
		from: {
			email: 'contato@linkysolucoes.com',
			name: 'Patricio da Linky Soluções',
		},
	},
} as IMailConfig;
