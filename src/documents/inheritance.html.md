---
layout: default
title: Ninja
---

# Inheritance

Patterns of code reuse are extremely important because they have the potential to significantly reduce the cost of software development.

## Pseudoclasica

The pseudoclassical pattern was intended to look sort of object-oriented, but it is looking quite alien.

```javascript
var Mammal = function (name) {
    this.name = name;
};

Mammal.prototype.get_name = function (  ) {
    return this.name;
};

Mammal.prototype.says = function (  ) {
    return this.saying || '';
};
```

```javascript
var Cat = function (name) {
    this.name = name;
    this.saying = 'meow';
};

// Replace Cat.prototype with a new instance of Mammal

Cat.prototype = new Mammal(  );

// Augment the new prototype with
// purr and get_name methods.

Cat.prototype.purr = function (n) {
    var i, s = '';
    for (i = 0; i < n; i += 1) {
        if (s) {
            s += '-';
        }
        s += 'r';
    }
    return s;
};
Cat.prototype.get_name = function (  ) {
    return this.says(  ) + ' ' + this.name +
            ' ' + this.says(  );
};

var myCat = new Cat('Henrietta');
var says = myCat.says(  ); // 'meow'
var purr = myCat.purr(5); // 'r-r-r-r-r'
var name = myCat.get_name(  );
//            'meow Henrietta meow'
```

There is no privacy; all properties are public. There is no access to super methods.
The pseudoclassical form can provide comfort to programmers who are unfamiliar with JavaScript, but it also hides the true nature of the language.The classically inspired notation can induce programmers to compose hierarchies that are unnecessarily deep and complicated.
In classical languages, class inheritance is the only form of code reuse. JavaScript has more and better options.

## Object specifier

Parámetros con nombre

```javascript
var myObject = maker(f, l, m, c, s);
```

```javascript
var myObject = maker({
    first: f,
    last: l,
    state: s,
    city: c
});
```

## Prototypal

differential inheritance

```javascript
var myMammal = {
    name : 'Herb the Mammal',
    get_name : function (  ) {
        return this.name;
    },
    says : function (  ) {
        return this.saying || '';
    }
};
var myCat = Object.beget(myMammal);
myCat.name = 'Henrietta';
myCat.saying = 'meow';
myCat.purr = function (n) {
    var i, s = '';
    for (i = 0; i < n; i += 1) {
        if (s) {
            s += '-';
        }
        s += 'r';
    }
    return s;
};
myCat.get_name = function (  ) {
    return this.says + ' ' + this.name + ' ' + this.says;
};
```

## Functional

One weakness of the inheritance patterns we have seen so far is that we get no privacy.All properties of an object are visible. We get no private variables and no private methods. Sometimes that doesn't matter, but sometimes it matters a lot.

pretend privacy prepending to function name an underscore.

```javascript
var mammal = function (spec) {
    var that = {};

    that.get_name = function (  ) {
        return spec.name;
    };

    that.says = function (  ) {
        return spec.saying || '';
    };

    return that;
};

var myMammal = mammal({name: 'Herb'});
```

```javascript
var cat = function (spec) {
    spec.saying = spec.saying || 'meow';
    var that = mammal(spec);
    that.purr = function (n) {
        var i, s = '';
        for (i = 0; i < n; i += 1) {
            if (s) {
                s += '-';
            }
            s += 'r';
        }
        return s;
    };
    that.get_name = function (  ) {
        return that.says(  ) + ' ' + spec.name +
                ' ' + that.says(  );
    return that;
};

var myCat = cat({name: 'Henrietta'});
```

# Parts or mixins

We can compose objects out of sets of parts. For example, we can make a function that can add simple event processing features to any object. It adds an on method, a fire method, and a private event registry
