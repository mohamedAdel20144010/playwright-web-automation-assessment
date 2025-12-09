import users from '../test-data/users.json';
import { ExistingUser, RegistrationUser } from '../pages/SignupLoginPage';

export const getRegistrationUser = (): RegistrationUser => {
  const uniqueEmail = users.registrationUser.email.replace(
    '@',
    `+${Date.now()}@`,
  );

  return {
    ...users.registrationUser,
    email: uniqueEmail,
  };
};

export const getExistingUser = (): ExistingUser => users.existingUser;
