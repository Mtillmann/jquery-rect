#What does it do?
Test if two elements intersect and optionally receive the a *.css()*-ready object with the intersecting rectangle's coordinates.

##basic intersect test
simply returns whether the two elements intersect:

```javascript
new $.rect($('#someElement')).intersects($('#otherElement')); 
```

##using intersection
receive the intersecting rectangle from the two elements:

```javascript
new $.rect($('#someElement')).intersection($('#otherElement'));
```
the intersection-method accepts a second parameter called type. Possible values are "box" and "rect"(default). "box" will return an object that represents a box (top, right, bottom, left), "rect" will return an object that represents a css-compatible rectangle (left, top, width, height).
"portion" will return the intersection area as percent, 1 being fully covered, 0.5 being half etc

##Options
there are three options that can be passed as the second argument:

###position
Which jQuery method should be used to determine the element positions. Possible values are "offset" and "position"(default). See jQuery's docs.

###dimension
Which jQuery method should be used to determine the element dimensions. Possible values are "css" and "outer"(default). "css" will use jQuery's *css* method with 'width' and 'height', "outer" will use *outerWidth* and *outerHeight*. 

###withMargin
Passed to *outerWidth*/*outerHeight* to include margin in calculation. Defaults to **true**.

```javascript
new $.rect($('#someElement'),{
	position : 'position',
	dimension : 'outer',
	withMargin : true
});
```


Based on [jQuery boilerplate](http://jqueryboilerplate.com/) and inspired by google's [closure library](http://code.google.com/intl/de-DE/closure/library/)
