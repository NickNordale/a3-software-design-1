# DankChart.js
Ever wanted to skip all the bulls*t involved in setting up a d3 bar chart? Ever wanted to see an API with a rediculous, unprofessional name?

Never fear, DankChart is here.

DankChart allows you to easily produce a bar chart with minimal setup. It supports a number of customizations, and even supports small multiples.

To use DankChart, simply include the script, create a new `DankChart()`, follow the instructions below, perform a join with a selected `<div>` element, and `call()` the wonderful new DankChart function you just created on your data-join.

## Setup
---
The following steps need to be taken in order to use DankChart:
* **DankChart requires the D3 Tip plugin** to make use of tool tips. You can use these CDNs:
 ```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/d3-tip/0.7.1/d3-tip.js"></script>
<link rel="stylesheet" href="//rawgithub.com/Caged/d3-tip/master/examples/example-styles.css">
```

* **Your data needs to be formatted in a certain way,** with each data object requiring 2 properties: `x`, `y`. This will make your array of data look something like this:
 ```javascript
[
	...,
	{
		x: <your-x-axis-measure>,
		y: <your-y-axis-measure>,
	},
	...
]
```
 These `x` and `y` properties specify what you want DankChart to make bar charts out of. Your `x` property should be whatever you wish to express on the x axis (usually categories), while your `y` property should do the same in respect to the y axis (usually a measure).

 **There is one other optional property that DankChart recognizes.** You can specify a `color` property in the same object as above, which DankChart will use to assign color schemes to your bar chart. See the documentation below to customize the chart's built-in color scale.

* **You must specify the domain** in order to make DankChart work. This domain will be an array of your `x` properties you set in the first bullet point. You can specify the domain by calling this function:
```javascript
...
var domainArray = [x1, x2, x3, ...];
myChart.domain(domainArray);
...
```

* If you wish to use DankChart to make small multiples, **you must nest your data with the provided `d3.nest()` function**

* **Protip:** If you have *one* datum (a simple array of objects), your data join should use `datum()`. If your intent is to produce multiple charts and concequently have some sort of *nested or grouped* data structure, you should use `data()`

## Documentation
---
#### .width(int)
Sets the chart's width if a value is supplied, returns it otherwise. If making small multiples, applies width to each chart seperately.

#### .height(int)
Sets the chart's height if a value is supplied, returns it otherwise. If making small multiples, applies height to each chart seperately.

#### .margin(Object)
Sets the chart's 4 margin properties (left, right, top, bottom) if a value is supplied, returns it otherwise. If making small multiples, applies height to each chart seperately.

**The Object passed to .margin must have the properties `left, right, top, bottom`**

#### .domain(array[ ])
Sets the chart's domain if a value is supplied, returns it otherwise.

#### .color(array[ ], array[ ])
Sets the `domain` and `range` properties of the charts color scale to the provided values if supplied, returns it otherwise. `domain` and `range` arrays must be passed in that order.

**Calling this method is the same as calling `colorDomain()` and `colorRange()` together**

#### .colorDomain(array[ ])
Sets the domain of the chart's color scale.

#### .colorRange(array[ ])
Sets the domain of the chart's color scale.

#### .xLabel(string)
Sets the x axis label for the chart if provided, returns the current value otherwise

#### .yLabel(string)
Sets the y axis label for the chart if provided, returns the current value otherwise

#### .tipText(function)
Defines the function to be used in the tip() library's `html()` method. This function shoud take one parameter, which represents a data item within a data array which has been joined to a d3 selection. The function should return whatever text should be inside each tooltip.

Example:
```javascript
function(d) { return d.<something> + ' some text'; }
```
