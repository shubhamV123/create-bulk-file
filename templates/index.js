const { startCase, camelCase } = require("lodash");

exports["jsx"] = (componentName) => `//Jsx template

import React from 'react';

const ${startCase(camelCase(componentName))} =  () => {
    return <></>
}

export default ${startCase(camelCase(componentName))};
`;

exports["test.js"] = (componentName) => `//Test template
`;

exports["storybook.js"] = (componentName) => `//Storybook`;

exports["scss"] = (componentName) => `//Scss`;
