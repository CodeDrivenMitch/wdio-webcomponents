import {assert} from 'chai';

describe('integration tests for desktop browsers', function () {

    context('Shadow DOM - nested Shadow roots', function() {
        beforeEach(async function () {
            await browser.url('/');
        });

        it('can find the mens outerwear image using getAttribute (getAttribute)', async function() {
            const selector = 'shop-app shop-home .item:first-of-type shop-image img';
            const expected = 'https://shop.polymer-project.org/es6-unbundled/images/mens_outerwear.jpg';
            assert.equal(await browser.getAttribute(selector, 'src'), expected)
        });

        it('can get text of an element using getText (waitForText, getText)', async function() {
            const selector = 'shop-app shop-detail .description h2';
            const expected = 'Description';
            await browser.url('/detail/ladies_outerwear/Ladies+Modern+Stretch+Full+Zip');
            await(browser.waitForText(selector));
            assert.equal(await browser.getText(selector), expected);
        });

        it('can click on an element and wait for page (click, waitForVisible, isVisible)', async function() {
            const selector = 'shop-app shop-home shop-button a';
            const selectorVisible = 'shop-app shop-list header h1';

            await browser.click(selector);
            await browser.waitForVisible(selectorVisible);
            assert.equal(await browser.isVisible(selector), true);
        });

        it('can set value of input fields (waitForVisible, click, getText, setValue, waitForValue, getValue)', async function() {
            await browser.url('/detail/mens_tshirts/YouTube+Organic+Cotton+T-Shirt+-+Grey');

            const selectorHeader = 'shop-app shop-detail h1';
            const selectorAddToCart = 'shop-app shop-detail shop-button button';
            const selectorCheckoutButton = 'shop-app shop-cart-modal shop-button:nth-of-type(2) a';
            const selectorCheckoutHeader = 'shop-app shop-checkout form h1';
            const selectorEmailInput = 'shop-app shop-checkout form #accountEmail';

            await browser.waitForVisible(selectorHeader);
            assert.equal(await browser.getText(selectorHeader), 'YouTube Organic Cotton T-Shirt - Grey');
            await browser.click(selectorAddToCart);
            await browser.waitForVisible(selectorCheckoutButton);
            await browser.click(selectorCheckoutButton);
            await browser.waitForVisible(selectorCheckoutHeader);
            assert.equal(await browser.getText(selectorCheckoutHeader), 'Checkout');

            browser.setValue(selectorEmailInput, 'dummy@gmail.com');
            await browser.waitForValue(selectorEmailInput);
            assert.equal(await browser.getValue(selectorEmailInput), 'dummy@gmail.com')
        });

        it('can query selectors concatenated by ::', async function() {
            await browser.url('/detail/mens_tshirts/YouTube+Organic+Cotton+T-Shirt+-+Grey');
            const selector = 'shop-app app-header::#tabContainer shop-tabs::.iron-selected::a';

            await browser.waitForExist(selector);
            assert.equal(await browser.getText(selector), 'Men\'s T-Shirts')
        })
    });
});