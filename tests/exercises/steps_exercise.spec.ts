/* pomocí PO a metod obsahující stepy se přihlásí do Pmtool a následně odhlásí. */

import { test } from '@playwright/test';
import { LoginPage } from '../../src/pages/pmtool/login_page';

test('Použití test.step', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage
        .openAndLogin("pw_skoleni", "TEG2023")
        .then((dashboard) => dashboard.logout());
});