// jscs:disable
// jshint ignore:start
define([
    "Navbar",
    "Control"
], function (Navbar, Control) {
    describe('Navbar.spec.js', function () {
        var icon = "../img/favicon.ico", container = "jean-navbar-container";
        describe("Navbar", function () {
            it("Is defined", function () {
                expect(Navbar).not.toBeUndefined();
            });
            it("Can be instantiated", function () {
                var n = new Navbar({
                    title: "Test",
                    containerId: "test-container",
                    icon: "test.ico",
                    sections: [
                        "One", "Two", "Three"
                    ],
                    onSectionClick: function () { }
                });
                expect(n).not.toBeUndefined();
            });
            it("Inherits from Control", function () {
                expect(Object.getPrototypeOf(Control).isPrototypeOf(Navbar)).toBe(true);
            });
            it("Throws exception, if title is not a string", function () {
                try {
                    var n = new Navbar({ title: 123 });
                } catch (e) {
                    expect(e instanceof TypeError).toBe(true);
                }
            });
            it("Throws exception, if containerId is not a string", function () {
                try {
                    var n = new Navbar({ containerId: 123 });
                } catch (e) {
                    expect(e instanceof TypeError).toBe(true);
                }
            });
            it("Throws exception, if icon is not a string", function () {
                try {
                    var n = new Navbar({ icon: 123 });
                } catch (e) {
                    expect(e instanceof TypeError).toBe(true);
                }
            });
            it("Throws exception, if sections contains other values then strings", function () {
                try {
                    var n = new Navbar({ sections: ["123", "abc", 123] });
                } catch (e) {
                    expect(e instanceof TypeError).toBe(true);
                }
            });
            it("Throws exception, if onSectionClick is not a function", function () {
                try {
                    var n = new Navbar({ onSectionClick: 123 });
                } catch (e) {
                    expect(e instanceof TypeError).toBe(true);
                }
            });
            afterEach(function () {
                $("#jean-navbar-container").find(".jean-navbar").remove();
            });
        });
        describe("After creation,", function () {
            var n;
            beforeEach(function () {
                $("#jean-navbar-container").find(".jean-navbar").remove();
            });
            it("the title is displayed", function () {
                n = new Navbar({
                    title: "Test"
                });
                n.create();
                expect($(".jean-navbar").find("#navbar-title").html()).toEqual("Test");
            });
            it("the icon is displayed ", function () {
                n = new Navbar({
                    title: "Test",
                    icon: "../img/favicon.ico"
                });
                n.create();
                expect($(".jean-navbar").find("#navbar-icon").length).toEqual(1);
            });
            it("the sections are displayed ", function () {
                n = new Navbar({
                    title: "Test",
                    icon: "../img/favicon.ico",
                    sections: [
                        "One", "Two", "Three"
                    ]
                });
                n.create();
                expect($(".jean-navbar").find("#id-One").length).toEqual(1);
                expect($(".jean-navbar").find("#id-Two").length).toEqual(1);
                expect($(".jean-navbar").find("#id-Three").length).toEqual(1);
                expect($(".jean-navbar").find(".navbar-section").length).toEqual(3);
            });
            it("the elements are centered vertical", function () {
                n = new Navbar({
                    title: "Test",
                    icon: "../img/favicon.ico",
                    sections: [
                        "One", "Two", "Three"
                    ]
                });
                expect(n.create()).toBe(true);
            });
            afterEach(function () {
                $("#jean-navbar-container").find(".jean-navbar").remove();
            });
        });
        describe("After clicking a section,", function () {
            beforeEach(function () {
                $("#jean-navbar-container").find(".jean-navbar").remove();
                $("#One").remove();
                $("#Two").remove();
                $("#Three").remove();
            });
            it("the provided callback get notified", function () {
                $(document.body).append("<section id='One'></section>").css("height", "500px");
                n = new Navbar({
                    title: "Test",
                    icon: "../img/favicon.ico",
                    sections: [
                        "One", "Two", "Three"
                    ],
                    onSectionClick: function (id) {
                        expect(id).toEqual("One");
                    }
                });
                n.create();
                $("#id-One").click();
            });
            it("the corresponding section scrolled into view", function (done) {
                var red = $("<section id='One'></section>").css("width", "100%").css("height", "1500px").css("background", "red"),
                    green = $("<section id='Two'></section>").css("width", "100%").css("height", "1500px").css("background", "green"),
                    blue = $("<section id='Three'></section>").css("width", "100%").css("height", "1500px").css("background", "blue");
                $(document.body).append(red);
                $(document.body).append(green);
                $(document.body).append(blue);
                n = new Navbar({
                    title: "Test",
                    icon: "../img/favicon.ico",
                    sections: [
                        "One", "Two", "Three"
                    ],
                    onSectionClick: function (id) {
                        setTimeout(function(){
                            expect(elementInViewport(document.getElementById(id))).toBe(true);
                            done()
                        }, 1000);
                    }
                });
                n.create();
                $("#id-Three").click();
                function elementInViewport(el) {
                    var top = el.offsetTop;
                    var left = el.offsetLeft;
                    var width = el.offsetWidth;
                    var height = el.offsetHeight;

                    while (el.offsetParent) {
                        el = el.offsetParent;
                        top += el.offsetTop;
                        left += el.offsetLeft;
                    }

                    return (
                        top < (window.pageYOffset + window.innerHeight) &&
                        left < (window.pageXOffset + window.innerWidth) &&
                        (top + height) > window.pageYOffset &&
                        (left + width) > window.pageXOffset
                    );
                }
            });
            afterEach(function () {
                $("#jean-navbar-container").find(".jean-navbar").remove();
                $("#One").remove();
                $("#Two").remove();
                $("#Three").remove();
            });
        });
    });
});

