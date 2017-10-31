define(["jquery", "TypeCheck", "Inheritance", "Control", "css!navbar-css"], function ($, TypeCheck, Inheritance, Control, css) {
    /**
     * Provides a navbar for a single page application 
     * @alias Navbar 
     * @constructor
     * @throws {TypeError} - If options.title is not a string
     * @throws {TypeError} - If options.containerId is not a string
     * @throws {TypeError} - If options.icon is not a string
     * @throws {TypeError} - If options.sections contains other values then strings
     * @throws {TypeError} - If options.onSectionClick is not a function
     * @param {Object} options - options object
     * @param {String} options.title - Title which shall be displayed
     * @param {String} [options.containerId=jean-navbar-container] - Id of the parent html element, which will be used 
     *                                                               as container for the navbar. If nothing is passed, 
     *                                                               a section tag will be inserted into the body.
     * @param {String} [options.icon] - Path to icon, which shall be displayed within the navbar
     * @param {String[]} [options.sections] - buttons for navigation to the regarding section
     * @param {Function} [options.onSectionClick] -  Executed when, a section button is clicked
     */
    var Navbar = function (options) {
        options = TypeCheck.isObject(options) ? options : {};
        if (!TypeCheck.isString(options.title)) {
            throw new TypeError("options.title is not a string")
        }
        if (TypeCheck.isDefined(options.containerId) && !TypeCheck.isString(options.containerId)) {
            throw new TypeError("options.containerId is not a string");
        }
        if (TypeCheck.isDefined(options.icon) && !TypeCheck.isString(options.icon)) {
            throw new TypeError("options.icon is not a string");
        }
        if (TypeCheck.isDefined(options.sections) && !TypeCheck.isArrayTypeOf(options.sections, "string")) {
            throw new TypeError("options.sections contains other values then strings");
        }
        if (TypeCheck.isDefined(options.onSectionClick) && !TypeCheck.isFunction(options.onSectionClick)) {
            throw new TypeError("options.onSectionClick is not a function");
        }
        // Default options if user provides no values
        var defaultOptions = {
            containerId: "jean-navbar-container",
            icon: "",
            sections: [],
            onSectionClick: function () { } // jscs:ignore
        };
        Inheritance.inheritConstructor(Control, this, [options, defaultOptions]);
        this._element = $("<div class='jean-navbar'></div>");
        // If a icon path is provided, add id to the control
        if (this._options.icon !== "") {
            this._element.append("<div id='navbar-icon'><img id='icon' src='" + options.icon + "' /></div>");
        }
        // Adds a title element to the control
        this._element.append("<span id='navbar-title' class='navbar-element'>" + options.title + "</span>");
        // If sections are provided, add them to the control
        var i = this._options.sections.length - 1;
        while (i >= 0 && TypeCheck.isDefined(options.sections)) {
            var section = this._options.sections[i];
            var sectionElement = $("<div id='id-" + section + "' class='navbar-element navbar-section'><span class='text'>" + section + "</span></div>");
            sectionElement.click(this._onSectionClick.bind(this));
            this._element.append(sectionElement);
            i--;
        }
    };
    Inheritance.inheritPrototype(Navbar, Control);
    /**
     * Executed when, a section button is clicked
     * @private
     * @callback
     * @param {Object} event - event object
     */
    Navbar.prototype._onSectionClick = function (event) {
        var element = $(event.currentTarget), id = (element.attr("id")).replace("id-", "");
        $("html, body").animate({
            scrollTop: $("#" + id).offset().top
        }, 250);
        this._options.onSectionClick(id);
    };
    /**
     * Centers the elements which are part of the navbar regarding
     * to the highest element
     * @return {Boolean} - True if elements are centered, false otherwise
     */
    Navbar.prototype.centerElements = function () {
        var options = this._options, length = options.sections.length, i;
        // Get height of highest element -> For now it will be the navbar name
        var titleHeight = parseFloat(this._element.find("#navbar-title").css("height"));
        for (i = 0; i < length; i++) {
            this._element.find(".text").css("line-height", titleHeight + "px");
        }
        var iconContainer = this._element.find("#navbar-icon");
        iconContainer.css("height", titleHeight);
        var iconHeight = parseFloat(iconContainer.find("#icon").css("height"));
        var iconMarginTop = (titleHeight - iconHeight) / 2;
        iconContainer.find("#icon").css("margin-top", iconMarginTop + "px");
        return true;
    };
    /**
     * Creates the navbar
     * @override Control.prototype.create
     * @returns {Boolean} - True if the element is created, false otherwise
     */
    Navbar.prototype.create = function () {
        var isCreated = (Control.prototype.create.bind(this))();
        this.centerElements();
        return isCreated;
    };
    return Navbar;
});