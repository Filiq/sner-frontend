import { expect, test as setup } from '@playwright/test'

const authFile = 'playwright/.auth/user.json'

setup('authenticate', async ({ page }) => {
  await page.goto('/auth/login')
  await page.getByLabel('Username').fill(process.env.USERNAME)
  await page.getByLabel('Password').fill(process.env.PASSWORD)
  await page.getByRole('button', { name: 'Login' }).click()

  await page.waitForURL('/')

  await page.context().storageState({ path: authFile })

  expect(page).toHaveTitle('Homepage - sner4')
})
