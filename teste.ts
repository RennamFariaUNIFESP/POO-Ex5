import bcrypt from 'bcrypt';

const password = 'Passoword1'

const hash = await bcrypt.hash(password, 10)

//const isMatch = bcrypt.compare("Pass", hash)

console.log(hash)