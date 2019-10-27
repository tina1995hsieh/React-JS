# Project Documentation

## What framework did you pick and why?
I picked React as my front-end framework (technically, React is a JavaScript library not a framework) because it has abundant resources, contributors and documentation which are really helpful for novices to learn a new framework/library in a short time. React also provides thorough tutorials, articles and GitHub resources making learning curve of React much smoother. Especially, its syntax involves lots of HTML writing skills which is easier for developers to pick up. Another special syntax that is used by most react developers is called “JSX” which helps the structures easier to write and comes with the full power of JavaScript. I can put any JavaScript expressions within braces inside JSX. Each React element is a JavaScript object that I can store in a variable or pass around in my program. Secondly, as React is highly efficient and flexible for building interactive UIs, I can create reusable user-interface components for each state which is dynamic, and the application can render the data and update the states without reloading the page. Moreover, since React is a JavaScript library, it can be easily integrated with other libraries. Take me for example. I used React with Bootstrap directly in my whole application. The most important reason I want to learn React JS is that it is the top 1 JavaScript framework/library by which most of websites are powered.

## What about that framework appealed to you, for this project?
I plan to build a missing people searching application and let users see the results while they are typing in the text field which means that the components need to reflect the same changing data simultaneously. As I know in React, it does handle DOM binding. Just like DOM `<input>` accepts both a `value` and an `onChange` props, so can the React component accept both `x` and `y` props from its parent component. When the variable is in the local state, the component could call `this.setState()` to change the value (state) directly. But, if I set the variable to be `this.props.x`, the component has no control over it and the value is passed by the parent as a prop. When the local component wants to update its value, it calls `this.props.y`. The `y` prop will be provided together with the `x` prop by the parent component. It will handle the change by modifying its own local state, thus re-rendering both inputs with the new values. In short, I do not need to go through the pain of binding DOM elements to functionality. React help me do it! (React also provide another way to handle events instead of keeping using `.bind()` method. I will explain it in the question five.)

## What alternative frameworks did you consider?
Instead of React JS, the first thought occurred to me was using Angular as my front-end framework in this project since it is the oldest modern JavaScript framework that let users built dynamic interactive websites. It provides a huge trove of resources and comes with a detailed documentation. The tutorial is designed for people who prefer to learn by doing. If users prefer learning concepts from the ground up, Angular also offers step-by-step guide. I found that the tutorial and the guide are complementary to each other when I tried to learn Angular. Besides, Angular is the first framework to integrate features for development of progressive web applications which take advantage of both web and native app features. Meaning, Users can visit the web application through search engines and also install the application as a native app so that it works offline or with a poor network connection. However, I have tried to build a simple application on my first time but turn out to be a disaster since Angular involves a complicated set of syntax errors which is not friendly as React JS. Therefore, I decided to use React to build my web application in this time instead of Angular.

## What resources did you read/watch/listen to?
To be familiar with React JS, I have read the whole tutorial in React website, the introductions on MDN web docs. and W3Schools, and some technical articles on Medium. (I list the references below.) First of all, I learned the fundamental structure of React JS such as `React.Component` which I use to tell React what I want to see on the screen. When the data changes, React will help me update and re-render my component efficiently. Since React utilizes downward data binding, I learned how to use `props` and `states` to pass the value from its parent or set up a dynamic state as well. Then, by using `render` method, I can return a hierarchy of views to display. In the `render` method, I use `JSX`, which allows mixing of HTML with JavaScript, to describe the structure of results (React Element). However, this special syntax is a little confusing when I tried to return multiple elements inside `render` method. As `render` method can only render a single root node before version 16.0, I could only wrap nodes in a single node by using a pair of `<div> … </div>` which means I cannot use parallel `<div>` tag directly in React JS.

**Reference:**
- https://reactjs.org/docs/fragments.html
- https://reactjs.org/tutorial/tutorial.html
- https://reactjs.org/docs/hello-world.html
- https://blog.logrocket.com/validating-react-component-props-with-prop-types-ef14b29963fc/
- https://medium.com/@assortedPickle/es6-static-properties-b7fd2a163328
- https://overreacted.io/why-do-we-write-super-props/
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/includes
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions
- https://www.npmjs.com/package/clipboard
- https://stackoverflow.com/questions/34893506/return-multiple-elements-inside-react-render

## Describe your project. What does it do? What components or features of the framework did you explore for this project?
I built a web missing people searching application which users can search the missing person dynamically and click the particular column to copy the phone numbers if users want to provide information or contact the family of the missing person. Users can type the full name of the person whether or not the texts are capitalized and the missing location such as city, state and country. I created a JSON data from [RandomAPI](https://randomuser.me/) and broke the UI into a component hierarchy. I separated the UI into four components: App, Search, Results and ResultsRow, where each component matches one piece of my data model. Then, by using arrow function: <br>

`handleChange = (e) => {...}` <br>

I don’t need to change context of binding methods to `this` in callbacks and create wrappers as event handlers. In addition, I also imported two internal mechanism:
1. `propTypes`: it helps me to validates the props-type in my application.
2. `clipboard`: it provides a simple way to copy text from another element.

When props are passed to a React component, they are checked against the type definitions configured in the `propTypes` property. (In my case, I used `PropTypes.func` and `PropTypes.string` mostly.) If an invalid value is passed for a prop, a warning is displayed on the JavaScript console.
