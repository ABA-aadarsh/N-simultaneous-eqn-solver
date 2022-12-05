# eqn-solver

Link: https://eqnsolver.netlify.app

This program solves system of linear equation through **Elimination Method**

## How the program works?

Say we got two equations **3x+2y=5** and **6x-2y=4**. First they are represented as arrays.

3x+2y=5 is represented as `[3,2,5]`

6x-2y=4 is represented as `[6,-2,4]`

Then these arrays are appended in one array as `[[3,2,5],[6,-2,4]]`

Now to solve them by elimination method we make the first coefficient of both equation same by multiplying by certain number.

Multiplying each number in [3,2,5] by 6 and multiplying each number in [6,-2,4] by 3. We get

`eqns=[[[18,12,30][18,-6,12]]]`. Now comes the elimination part.

If we subtract each number of the arrays with respective index as

18-18=**0**

12-(-6)=**18**

30-12=**18** 

And then make a array out of these numbers as `[0,18,18]`.

Here comes the amazing part. This array represents a equation

[0,18,18]=>0x+18y=18

If we get rid of 0 then

[18,18]=>18y=18 we gonna push this into our eqns array as [ [[18,18]] , [[18,12,30][18,-6,12]] ]

Now it can be solved as `Array[1]/Array[0]`

This is the core idea of the program i.e **we reduce a bigger array into smaller array by elimination till we get an array of 2 items only.**

Then we backtrack into previous arrays (stored in eqns) and retrieve the another value from known values

`[18,12,30]` from **eqns[1][0]**

Through loop we perfrom following operation 

(30-12***1**)/18=1, This is value of x *( **1** is value of y we just got earlier)*

**Reduce** and **Retrieval** Part is done through functions

Note: I oversimplified the concept. However this is main algorithm. You need to make adjustment such that it is flexible for any given number of equations.

**Thanks to Ashraya Khanal to encourage me to write this documentation**
