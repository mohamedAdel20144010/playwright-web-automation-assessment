import { Page, expect } from '@playwright/test';

export interface RegistrationUser {
  name: string;
  email: string;
  password: string;
  day: string;
  month: string;
  year: string;
  firstName: string;
  lastName: string;
  company: string;
  address1: string;
  address2: string;
  country: string;
  state: string;
  city: string;
  zipcode: string;
  mobileNumber: string;
}

export interface ExistingUser {
  name: string;
  email: string;
  password: string;
}

export class SignupLoginPage {
  constructor(private readonly page: Page) {}

  async registerNewUser(user: RegistrationUser): Promise<void> {
    await this.page.locator('[data-qa="signup-name"]').fill(user.name);
    await this.page.locator('[data-qa="signup-email"]').fill(user.email);
    await this.page.locator('[data-qa="signup-button"]').click();

    await expect(this.page.getByText('Enter Account Information')).toBeVisible();

    await this.page.locator('#id_gender1').check();
    await this.page.locator('[data-qa="password"]').fill(user.password);
    await this.page.locator('[data-qa="days"]').selectOption(user.day);
    await this.page.locator('[data-qa="months"]').selectOption(user.month);
    await this.page.locator('[data-qa="years"]').selectOption(user.year);
    await this.page.locator('#newsletter').check();
    await this.page.locator('#optin').check();

    await this.page.locator('[data-qa="first_name"]').fill(user.firstName);
    await this.page.locator('[data-qa="last_name"]').fill(user.lastName);
    await this.page.locator('[data-qa="company"]').fill(user.company);
    await this.page.locator('[data-qa="address"]').fill(user.address1);
    await this.page.locator('[data-qa="address2"]').fill(user.address2);
    await this.page.locator('[data-qa="country"]').selectOption(user.country);
    await this.page.locator('[data-qa="state"]').fill(user.state);
    await this.page.locator('[data-qa="city"]').fill(user.city);
    await this.page.locator('[data-qa="zipcode"]').fill(user.zipcode);
    await this.page.locator('[data-qa="mobile_number"]').fill(user.mobileNumber);
    await this.page.locator('[data-qa="create-account"]').click();
  }

  async login(user: ExistingUser): Promise<void> {
    await this.page.locator('[data-qa="login-email"]').fill(user.email);
    await this.page.locator('[data-qa="login-password"]').fill(user.password);
    await this.page.locator('[data-qa="login-button"]').click();
  }
}

export default SignupLoginPage;
