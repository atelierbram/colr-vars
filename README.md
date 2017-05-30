# ColrVars

Go see [the demo](http://atelierbram.github.io/colr-vars).

### Usage
To use these variables one needs to import the sass-maps color variables `colrvars.scss` into the main sass stylesheet

```scss
@import 'colrvars';

.test {
  background-color: color(blue-11);
}
.test p {
  color: color(gold-06);
}
```

Alternatively, convert the sass-map syntax to the dollar-sign syntax like:

```scss
@import 'colrvars';

$blue-11: color(blue-11);
$gold-06: color(gold-06);

.test {
  // background-color: color(blue-11);
  background-color: $blue-11;
}

.test p {
  // color: color(gold-06);
  color: $gold-06;
}
```

### Adaptation

To make them your own, adapt these colorvalues, one will have to edit `data.json`. Get into Nunjucks templating (`src/schemes`) with this if it’s additional colors, and/or renaming of colors as well. Download or clone this repository, NPM install all the dependencies, edit the colorvalues in `data.json`, and run `grunt` from the commandline.

For renaming colors _in Sass_, consider using the color-naming convention as [described in this blogpost: “More Gooder SASS Color Variables”](https://codepen.io/DeptofJeffAyer/post/more-gooder-sass-color-variables) with the help of [this sass color
“Variablizer” webapp](https://codepen.io/DeptofJeffAyer/full/LkJOqK/).

This [Readme in html](http://atelierbram.github.io/colr-vars/test/).

