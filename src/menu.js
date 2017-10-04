(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        // define(["jquery", "underscore"], factory);
        define([], factory(root));
    } else if (typeof exports === "object") {
        // module.exports = factory(require("jquery"), require("underscore"));
        module.exports = factory(root);
    } else {
        root.Menu = factory(root);
    }
}(this, function (root) {

    'use strict';

    // Object for Public Api
    var Menu = {};

    //Variables

    var supports = 'querySelector' in document && 'addEventListener' in root;
    var settings;
    var defaults = {
        menuClass: 'menu',
        menuHiddenClass: 'menu-hidden',
        menuShowClass: 'menu-show',
        menuItemClass: 'menu-item',
        menuToggleAttribute: 'menu-toggle',
        showAnimations: false,
        animationHideClass: 'menu-hide-animate',
        animationShowClass: 'menu-show-animate',

    };

    // private functions

    function clickHandler(e) {
        var isMenuItem = e.target.classList.contains(settings.menuItemClass),
            isMenuToggler = e.target.hasAttribute(settings.menuToggleAttribute),
            menuItem = findAncestor(e.target, settings.menuItemClass),
            menuToggler = findAncestorByAttribute(e.target, settings.menuToggleAttribute)
        if (!isMenuItem && !isMenuToggler && !menuItem && !menuToggler) { return; }

        if (isMenuItem || menuItem) {
            // gets the id to toggle from the menu
            var menu = findAncestor(e.target, 'menu');
            Menu.toggle(menu.id);
        }

        if (isMenuToggler || menuToggler) {
            // gets the id to toggle from the attribute
            var idMenuToToggle = menuToggler.getAttribute(settings.menuToggleAttribute);
            if (!idMenuToToggle) { return; }
            Menu.toggle(idMenuToToggle);
        }
    }

    function show(menuElement) {
        menuElement.classList.remove(settings.menuHiddenClass);
        menuElement.classList.add(settings.menuShowClass);
        if (settings.showAnimations) {
            menuElement.classList.remove(settings.animationHideClass);
            menuElement.classList.add(settings.animationShowClass);
        }
    }
    function hide(menuElement) {
        menuElement.classList.add(settings.menuHiddenClass);
        menuElement.classList.remove(settings.menuShowClass);
        if (settings.showAnimations) {
            menuElement.classList.add(settings.animationHideClass);
            menuElement.classList.remove(settings.animationShowClass);
        }
    }

    function hideAll() {
        var menus = document.getElementsByClassName(settings.menuClass);
        for (var i = 0; i < menus.length; i++) {
            hide(menus[i]);
        }
    }

    // Utils
    function extend(obj, src) {
        for (var key in src) {
            if (src.hasOwnProperty(key)) obj[key] = src[key];
        }
        return obj;
    }

    function findAncestor(el, cls) {
        while ((el = el.parentElement) && !el.classList.contains(cls));
        return el;
    }

    function findAncestorByAttribute(el, attr) {
        while (!el.hasAttribute(attr) && (el = el.parentElement));
        return el;
    }

    // Public api
    Menu.toggle = function (menuId) {
        var menuElement = document.getElementById(menuId);
        if (!menuElement) { return false; }
        if (menuElement.classList.contains(settings.menuHiddenClass)) {
            show(menuElement);
        } else if (menuElement.classList.contains(settings.menuShowClass)) {
            hide(menuElement);
        } else {
            menuElement.classList.add(settings.menuHiddenClass);
        }
    }

    Menu.init = function (options) {
        if (!supports) { return; }
        settings = extend(defaults, options);
        document.addEventListener('click', clickHandler, true);
        hideAll();
    }

    Menu.destroy = function () {
        if (!settings) { return; }
        settings = null;
        document.removeEventListener('click', clickHandler, true);
    }

    return Menu;
}));

// Usage
// Menu.init();
// Menu.toggle('topMenu');