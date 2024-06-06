module.exports =  ({ env }) => ({
	connection: {
		client: 'postgres',
		connection: {
		host: env('DATABASE_HOST', '129.232.211.166'),
			port: env.int('DATABASE_PORT', 5432),
			database: env('DATABASE_NAME', 'learnerportal'),
			user: env('DATABASE_USERNAME', 'dylan'),
			password: env('DATABASE_PASSWORD', 'super123duper'),
			ssl: env.bool('DATABASE_SSL', false)
		}
	}
});
