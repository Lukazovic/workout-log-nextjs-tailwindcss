module.exports = (plop) => {
  plop.setGenerator('component', {
    description: 'Create a component',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'What is your component name?'
      }
    ],
    actions: [
      {
        type: 'add',
        path: '../src/components/{{pascalCase name}}/index.tsx',
        templateFile: 'templates/components/Component.tsx.hbs'
      },
      {
        type: 'add',
        path: '../src/components/{{pascalCase name}}/stories.tsx',
        templateFile: 'templates/components/stories.tsx.hbs'
      },
      {
        type: 'add',
        path: '../src/components/{{pascalCase name}}/test.tsx',
        templateFile: 'templates/components/test.tsx.hbs'
      }
    ]
  }),
    plop.setGenerator('layout', {
      description: 'Create a layout',
      prompts: [
        {
          type: 'input',
          name: 'name',
          message: 'What is your layout name?'
        }
      ],
      actions: [
        {
          type: 'add',
          path: '../src/layouts/{{pascalCase name}}/index.tsx',
          templateFile: 'templates/layouts/Component.tsx.hbs'
        },
        {
          type: 'add',
          path: '../src/layouts/{{pascalCase name}}/test.tsx',
          templateFile: 'templates/layouts/test.tsx.hbs'
        }
      ]
    })
}
