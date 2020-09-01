# vanilla-js-fullscreen-menu

A vanilla js plugin to display a full screen menu.

# How to use

Include the css for menu at the head tag.

```html
<head>
  ...
  <link rel="stylesheet" href="src/menu.css" />
  ` ...
</head>
```

Inclide the js at the bottom of your body.

```html
    <script src="src/menu.js"></script>
    <script>

        var options = {
            showAnimations: true,
            // animationHideClass: 'hide-left',
            // animationShowClass: 'show-left',
        };
        Menu.init(options);
    </script>
</body>
```

Include the menu code in the html

```html
<!-- This will toggle on/off the menu -->
<a menu-toggle="menuId" class="btn-menu">Menu</a>

<ul class="menu" id="menuId">
  <li class="menu-item"><a href="#optionA">Option A</a></li>
  <li class="menu-item"><a href="#optionB">Option B</a></li>
  <li class="menu-item"><a href="#optionC">Option C</a></li>
  <li class="menu-item"><a href="#optionC">Option D</a></li>
  <li class="menu-item"><a href="#optionC">Option E</a></li>
</ul>
```
