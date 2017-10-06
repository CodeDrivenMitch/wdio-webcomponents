import {assert} from 'chai';

describe('integration tests for desktop browsers', function () {

    context('Non-Shadow DOM - basic nested elements', function () {
        beforeEach(async function () {
            await browser.url('static.html');
        });

        it('can find a nested element in normal dom', async function() {
            const element = await browser.wcElement('.body-container .header h1');
            assert.isNotNull(element.value.ELEMENT);
        });

        it('can find a top level element in normal DOM', async function() {
            const element = await browser.wcElement('.body-container');
            assert.isNotNull(element.value.ELEMENT);
        });

        it('can find a nested element in normal DOM directly', async function() {
            const element = await browser.wcElement('h2');
            assert.isNotNull(element.value.ELEMENT);
        });

        it('result of the element call is valid can be used by other browser commands', async function() {
            const element = await browser.wcElement('.body-container .header h1');
            const text = await browser.elementIdText(element.value.ELEMENT);
            assert.equal(text.value, 'Coiffeur Jeffrey\'s blog')
        });
    });
});