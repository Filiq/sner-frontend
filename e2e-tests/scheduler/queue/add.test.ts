import { expect, test } from '@playwright/test'

test('add queue', async ({ page }) => {
  await page.goto('/scheduler/queue/add')

  await page.fill('input[name="name"]', 'test queue')
  await page.fill('input[name="hostname"]', 'test-hostname')
  await page.fill(
    'input[type="config"]',
    'module: nmap\nargs: -sS -A -p1-65535 -Pn  --max-retries 3 --script-timeout 10m --min-hostgroup 20\n--min-rate 900 --max-rate 1500',
  )
  await page.click('input[type="submit"]')

  await page.waitForURL('/scheduler/queue/list')

  expect(page.getByText('test queue')).toBeTruthy()
})
