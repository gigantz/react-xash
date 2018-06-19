## React-xash
React Utility for adding hash into your text to protect your content.
```
yarn add react-xash
```

You see `Hello world`
You copy it `H7ezl7l3o5 wwcohrel4dq`

![Screenshot](http://ultraimg.com/images/2018/06/19/MEnE.png)

Demo - https://gigantz.github.io/react-xash/

Try out - https://codesandbox.io/s/j75ynj9q49

Import it
```javascript
import Xash from 'react-xash';
const xash = new Xash();
```
Use it
```javascript
const anytext = 'Hello world';

return (
    <div>{xash.from(anytext)}</div>
);
```

Options
```javascript
const xash = new Xash({
    elementTypes: ['a','td', ...] // elements to use in xashing
    robots: '(googlebot|scraper| ....)' // return plain text if bot indexing it
    userAgent: req.headers['user-agent'] // if you use server side rendering set it
});
```