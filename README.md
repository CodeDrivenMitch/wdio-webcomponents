# wdio-webcomponents

wdio-webcomponents is a webdriver.io plugin which makes webdriver compatible with Open Shadow Roots. 

Shadow DOMs are a great solution to encapsulate your components from the rest of your application, but it prevents your components from easily being e2e tested. Normal Selenium commands fail,
due to the element actually not beind in the main document. 

With the rise of Shadow DOM in webcomponent applications, we need a solution to test the components using Webdriver(Selenium). This plugin is that solution!

When this plugin is enabled, every Webdriver command will work with Shadow DOMS.

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

For examples on how to use it, the internal test suite contains a lot of examples. These examples 'test' the Polymer example shop.

You can find the test-suite at [https://github.com/Morlack/wdio-webcomponents/blob/master/test/wdio/specs/main.spec.js](https://github.com/Morlack/wdio-webcomponents/blob/master/test/wdio/specs/main.spec.js)

### Shadow Host inclusion
A Shadow host is an element which has at least a Shadow DOM, and might have a light DOM. The Light DOM is
content added through slot/content tags. The Actual HTML of a component having both might look like this:

```html
<my-awesome-element>
    #shadow-root
        <div class="shadow">This is a shadow DOM element!</div>
        <slot></slot>
    <!-- End shadow root -->

    <p class="light">This is a light DOM element!</p>
</my-awesome-element>
```

When considering the markup above, the shadow and light dom elements are queried differently. To query either of them, use the following selectors:

#### Querying Shadow DOM
Shadow selector: `my-awesome-element .shadow` 

Resulting JS: `document.querySelector('my-awesome-element).shadowRoot.querySelector('.shadow')`

The resulting JS shows how the plugin works internally. This is because you can only query elements in a Shadow DOM from the shadowRoot of the host element.

#### Querying light DOM

Light selector: `my-awesome-element::.light` 

Resulting JS: `document.querySelector('my-awesome-element .light')`

Since we do not need to descend into a shadowRoot, but `my-awesome-element` has one, we want to prevent descending. 
The `::` syntax is here to provide this; When concatenating selectors using `::` they will be executed in the same `querySelector` call.

Note that when there are nested shadowRoots, you need to include the parent Shadow Hosts. Example:

```html
<my-awesome-element>
    #shadow-root
        <my-awesome-nested-element>
            #shadow-root
                <p class="shadow">This is a Shadow DOM element</p>
                <slot></slot>
            <!-- End nested shadow root -->
            
            <p class="nested-light">This is another light DOM element!</p>
        </my-awesome-nested-element>
    <!-- End top-level shadow root -->

    <p class="light">This is a light DOM element!</p>
</my-awesome-element>
```

In the above case, to retrieve the `.nested-light` element, you will need to use `my-awesome-element my-awesome-nested-element::.nested-light` selector. 


## Internal workings
The plugin works by replacing the `browser.element` and `browser.elements` commands with another implementation. All other webdriver commands use these two functions, so overriding these two fixes all other commands.

It uses a Javascript function, sent to the browser, to find the correct element/elements in or outside of a Shadow DOM. The implementation is based on ChadKillingsworth's code, that can be found here: [https://gist.github.com/ChadKillingsworth/d4cb3d30b9d7fbc3fd0af93c2a133a53](https://gist.github.com/ChadKillingsworth/d4cb3d30b9d7fbc3fd0af93c2a133a53)

The code in this plugin has been modified to support more use cases, non-shadowroots and multiple element selection. You can find it in `src/finders/findElement.js`. 

 