import { test } from '@playwright/test';
import HomePage from '../../pages/HomePage';
import SignupLoginPage from '../../pages/SignupLoginPage';
import AccountCreatedPage from '../../pages/AccountCreatedPage';
import { getRegistrationUser } from '../../utils/testData';

test('user can complete registration flow', async ({ page }) => {
  const homePage = new HomePage(page);
  const signupLoginPage = new SignupLoginPage(page);
  const accountCreatedPage = new AccountCreatedPage(page);
  const user = getRegistrationUser();
  console.log('Registering user email:', user.email);

  await homePage.goto();
  await homePage.openSignupLogin();
  await signupLoginPage.registerNewUser(user);
  await accountCreatedPage.expectAccountCreated();
});
