import users from '../test-data/users.json';
import { ExistingUser, RegistrationUser } from '../pages/SignupLoginPage';

export const getRegistrationUser = (): RegistrationUser => {
  // Create a unique email by inserting a timestamp before the @ symbol.
  const uniqueEmail = users.registrationUser.email.replace(
    '@',
    `+${Date.now()}@`,
  );

  // Return the registration template with the unique email applied.
  return {
    ...users.registrationUser,
    email: uniqueEmail,
  };
};

export const getExistingUser = (): ExistingUser => users.existingUser;
