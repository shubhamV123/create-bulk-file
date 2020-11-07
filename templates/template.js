
exports.jsx = (componentName) => `//Jsx template

import React from 'react';

const ${componentName} =  () => {
    return <></>
}

export default ${componentName};
`

exports['test.js'] = (componentName) => `//Test template
`

exports['storybook.js'] = (componentName) => '//Storybook'

exports.scss = (componentName) => '//Scss'
