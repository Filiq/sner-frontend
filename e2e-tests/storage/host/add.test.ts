import { expect, test } from '@playwright/test'

test('add host', async ({ page }) => {
  await page.goto('/storage/host/add')

  await page.fill('input[name="address"]', '10.11.12.13')
  await page.fill('input[name="hostname"]', 'test-hostname')
  await page.click('input[type="submit"]')

  await page.waitForURL('/host/view/(.)')
  await expect(page).toHaveTitle('Hosts / View / 10.11.12.13')
})
