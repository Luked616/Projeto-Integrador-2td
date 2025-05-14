import bcrypt from 'bcryptjs'

async function generateHashedPassword() {
	const password = 'teste';
	try {
		const salt = await bcrypt.genSalt(10);

		const hashedPassword = await bcrypt.hash(password, salt);

		console.log('Senha hasheada: ', hashedPassword)
		process.exit(0)
	} catch (error) {
		console.error('Erro ao hashear a senha: ', error)
		process.exit(1)
	}
}

generateHashedPassword();
