const allure = require('@wdio/allure-reporter').default;

describe('Docker Hub Application Suite', () => {

    it('container page visible', async () => {
        await allure.addFeature("Container Page Added")
        await browser.pause(5000)
        let containerPageVisible = await $("//button[normalize-space()='Containers']").isDisplayed();
        console.log(await containerPageVisible)
        await expect(await true).to.equal(containerPageVisible);
    });

    it('testVerifyLabel', async () => {
        await allure.addFeature("Added Verified Label")
        await browser.pause(3000)
        const allLabels = []
        let imagesText = await $("//div[normalize-space()='Images']").getText()
        allLabels[0] = imagesText;

        let verifiedPublisherText = await $("//input[@value='store']/parent::div/div/label/span").getText()
        allLabels[1] = verifiedPublisherText

        let officialImageText = await $("//input[@value='official']/parent::div/div/label/span[1]").getText()
        allLabels[2] = officialImageText

        await expect(await allLabels[0]).to.equal("Images");
        await expect(await allLabels[1]).to.equal("Verified Publisher");
        await expect(await allLabels[2]).to.equal("Official Images");

    });

    it('testVerifyCategories', async () => {
        await browser.pause(3000)
        let allCheckboxs = []
        let analyticsCheckBox = await $("//input[@value='analytics']/parent::div/div/label/parent::div/div").isDisplayed();
        allCheckboxs.push(analyticsCheckBox)

        let baseImageCheckBox = await $("//input[@value='base']/parent::div/div/label/parent::div/div").isDisplayed();
        allCheckboxs.push(baseImageCheckBox)

        let databaseCheckBox = await $("//input[@value='database']/parent::div/div/label/parent::div/div").isDisplayed();
        allCheckboxs.push(databaseCheckBox)

        let storageCheckBox = await $("//input[@value='storage']/parent::div/div/label/parent::div/div").isDisplayed();
        allCheckboxs.push(storageCheckBox)

        for (let i = 0; i < allCheckboxs.length; i++) {
            await expect(await true).to.equal(allCheckboxs[i]);
        }
    });

    it('testPublisherContent', async () => {
        await browser.pause(3000)
        await $("//input[@value='store']").click()
        let publisherContent = await $("//div[@data-testid='currentFilters']/div").getText()
        await expect(publisherContent).to.equal("Publisher Content");
        await browser.pause(3000)
    });

    it('testBaseImageAndDatabaseFilterContent', async () => {
        await $("//input[@value='base']").click()
        await $("//input[@value='database']").click()

        let baseImageFilter = await $("//div[@data-testid='currentFilters']/div[1]").getText()
        let databaseFilter = await $("//div[@data-testid='currentFilters']/div[2]").getText()

        await expect(baseImageFilter).to.equal("Base Images");
        await expect(databaseFilter).to.equal("Databases");
        await browser.pause(3000)
    });

    it('testBaseImageFilterRemovedFromLeftPane', async () => {
        await browser.pause(3000)
        await $("//div[@data-testid='currentFilters']/div[1]").click()
        let baseImageCheckboxNotFound = await $("//input[@value='base']").isDisplayed()
        await expect(false).to.equal(baseImageCheckboxNotFound)
        await browser.pause(3000)
    })
});

