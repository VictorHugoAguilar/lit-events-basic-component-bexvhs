export default async function loginService(email, password) {
  // Simulate a 2-second delay
  await new Promise((resolve) => setTimeout(resolve, 2000));

  // Check if email and password are valid
  const isValid = validateEmailAndPassword(email, password);

  // Update isLoggedIn property based on the validation result
  return isValid;
}

function validateEmailAndPassword(email, password) {
  if (email !== 'v@v.com') {
    return false;
  }

  if (password !== '12345678') {
    return false;
  }

  return true;
}
