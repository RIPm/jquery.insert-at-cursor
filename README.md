# jquery.insert-at-cursor

> Jquery plugin for insert anything at the cursor position

## Usage

```html
<script src="jquery.insert-at-cursor.min.js"></script>
```

#### html

``` html
<input type="text" value="" id="foo" />
```
or

``` html
<textarea id="foo"></textarea>
```
or
``` html
<div contenteditable="true" id="foo"></div>
```

#### javascript
```js
// first tiem to init
$.initCursor('#foo');

// Normal string
$("#foo").insertAtCursor('bar');

// At contenteditable dom
$("#foo").insertAtCursor('<span>bar</span>');
// At contenteditable dom (functions like rich text editors)
$("#foo").insertAtCursor('<span contenteditable="false">bar</span>');
```
