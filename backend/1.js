import bcrypt from 'bcryptjs';

const hashPassword = async () => {
  const hash = await bcrypt.hash("root123", 10);
  console.log("Hashed password:", hash);
};

hashPassword();