import {addItem} from '../Composants/ListItems';
import {test, expect, beforeEach, afterEach} from "vitest";
import {JSDOM} from "jsdom";

let dom;
let window;
let document;

beforeEach(() => {
    dom = new JSDOM();
    window = dom.window;
    document = window.document;

    const mockLocalStorage = (() => {
        let store = {};

        return {
            getItem(key) {
                return store[key] || null;
            },

            setItem(key, value) {
                store[key] = value;
            },

            removeItem(key) {
                delete store[key];
            },

            clear() {
                store = {};
            },
        };
    })();

    Object.defineProperty(window, "localStorage", {
        value: mockLocalStorage,
    });

    global.window = window;
    global.document = document;
    global.localStorage = window.localStorage;

    localStorage.clear();
});

afterEach(() => {
    localStorage.clear();
});

test("addItem", () => {
    expect(addItem("item1", 1, 10)).toEqual([{name: "item1", property: [1, 10]}]);
    expect(addItem("item1", 1, 10)).toEqual([{name: "item1", property: [2, 10]}]);
    expect(addItem("item2", 1, 20)).toEqual([{name: "item1", property: [2, 10]}, {name: "item2", property: [1, 20]}]);
    expect(addItem("item2", 1, 20)).toEqual([{name: "item1", property: [2, 10]}, {name: "item2", property: [2, 20]}]);
    expect(addItem("item3", 1, 30)).toEqual([{name: "item1", property: [2, 10]}, {
        name: "item2",
        property: [2, 20]
    }, {name: "item3", property: [1, 30]}]);
    expect(addItem("item3", 1, 30)).toEqual([{name: "item1", property: [2, 10]}, {
        name: "item2",
        property: [2, 20]
    }, {name: "item3", property: [2, 30]}]);
});

test("addItem with localStorage", () => {
    addItem("item1", 1, 10);
    expect(JSON.parse(localStorage.getItem("cart"))).toEqual([{name: "item1", property: [1, 10]}]);

    addItem("item1", 1, 10);
    expect(JSON.parse(localStorage.getItem("cart"))).toEqual([{name: "item1", property: [2, 10]}]);

    addItem("item2", 1, 20);
    expect(JSON.parse(localStorage.getItem("cart"))).toEqual([{name: "item1", property: [2, 10]}, {
        name: "item2",
        property: [1, 20]
    }]);

    addItem("item2", 1, 20);
    expect(JSON.parse(localStorage.getItem("cart"))).toEqual([{name: "item1", property: [2, 10]}, {
        name: "item2",
        property: [2, 20]
    }]);

    addItem("item3", 1, 30);
    expect(JSON.parse(localStorage.getItem("cart"))).toEqual([{name: "item1", property: [2, 10]}, {
        name: "item2",
        property: [2, 20]
    }, {name: "item3", property: [1, 30]}]);

    addItem("item3", 1, 30);
    expect(JSON.parse(localStorage.getItem("cart"))).toEqual([{name: "item1", property: [2, 10]}, {
        name: "item2",
        property: [2, 20]
    }, {name: "item3", property: [2, 30]}]);
});