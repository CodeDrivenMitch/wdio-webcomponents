# wdio-webcomponents

wdio-webcomponents is a webdriver.io plugin which makes webdriver compatible with Open Shadow Roots. 

Shadow DOMs are a great solution to encapsulate your components from the rest of your application, it is however
due to this encapsulation that the Shadow DOMs cannot be easily tested. Normal Selenium commands fail,
due to the element actually not beind in the main document. 

With the rise of Shadow DOM in webcomponent applications, we need a solution to test the components using Webdriver(Selenium). This plugin is that solution!

When this plugin is enabled, every Webdriver command works as normal! ;)

## Installation
Install the npm lib:

`npm install wdio-webcomponents --save-dev`

Then add the plugin to your `wdio.conf` under plugins.

```javascript
{
    plugins: {
        'wdio-webcomponents': {}
    }
}
```

## How to use
You can use it just like you normally use webdriver. However, there are some pitfalls:
 
- You can only use CSS selectors.
- The selector should contain every Shadow Host on the way to the element. (Read down for explanation)

For examples on how to use it, the internal test suite contains enough examples. These examples 'test' the Polymer example shop.

You can find the test-suite at [https://github.com/Morlack/wdio-webcomponents/test/wdio/specs/main.spec.js]()

### Shadow Host inclusion
A Shadow host is an element which has at least a Shadow DOM, and might have a light DOM. The Light DOM is
content added through slot/content tags. The Actual HTML of one might look like this:

```html
<my-awesome-element>
    #shadow-root
        <div class="shadow">This is a shadow DOM element!</div>
    <!-- End shadow root -->

    <p class="light">This is a light DOM element!</p>
</my-awesome-element>
```

When considering the code above, the shadow and light dom elements are queried differently. The selector beneath here, and the javascript that is needed to find the elements, are:

Shadow selector: `my-awesome-element .shadow` -> `document.querySelector('my-awesome-element).shadowRoot.querySelector('.shadow')`

Light selector: `.light` -> `document.querySelector('.light')`

This is due to the light DOM element actually being a child of the parent document, as opposed to the custom element. 
The Shadow element is a child of the `my-awesome-element` and the element lives in it's shadow root. 

## Internal workings
The plugin works by replacing the `browser.element` and `browser.elements` command with another implementation. All other webdriver commands use these two functions, so overriding these two fixes all other commands.

It uses a Javascript function, sent to the browser, to find the correct element/elements in or outside of a Shadow DOM. The implementation is based on ChadKillingsworth's code, that can be found here: https://gist.github.com/ChadKillingsworth/d4cb3d30b9d7fbc3fd0af93c2a133a53

The code in this plugin has been modified to support more use cases, non-shadowroots and multiple element selection. You can find it in `src/finders/findElement.js`. 

 