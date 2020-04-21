const requireField = fieldName => {
  return value => {
    if (String(value).length === 0) {
      return fieldName + " is required";
    }
    return true;
  };
};

module.exports = plop => {
  plop.setGenerator("component", {
    description: "Create a reusable component",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "What is your component name?",
        validate: requireField("name")
      },
    ],
    actions: [
      // {
      //   type: "add",
      //   path: "src/components/{{pascalCase name}}/{{pascalCase name}}.js",
      //   templateFile:
      //       "plop-templates/Component/Component.js.hbs",
      // },
      // {
      //   type: "add",
      //   path: "src/components/{{pascalCase name}}/{{pascalCase name}}.test.js",
      //   templateFile:
      //       "plop-templates/Component/Component.test.js.hbs",
      // },
      {
        type: "add",
        path:
            "src/components/{{pascalCase name}}/{{pascalCase name}}.scss",
        templateFile:
            "plop-templates/Component/Component.scss.hbs",
      },
      {
        type: "add",
        path: "src/components/{{pascalCase name}}/index.js",
        templateFile: "plop-templates/Component/index.js.hbs",
      }
    ],
  });
  
  plop.setGenerator("screen", {
    description: "Create a screen",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "What is your page name?",
        validate: requireField("name")
      },
    ],
    actions: [
      {
        type: "add",
        path: "src/screens/{{pascalCase name}}/{{dashCase name}}.js",
        templateFile:
            "plop-templates/Page/Page.js.hbs",
      },
      // {
      //   type: "add",
      //   path: "src/screens/{{pascalCase name}}/{{pascalCase name}}.test.js",
      //   templateFile:
      //       "plop-templates/Page/Page.test.js.hbs",
      // },
      {
        type: "add",
        path:
            "src/screens/{{pascalCase name}}/{{dashCase name}}.scss",
        templateFile:
            "plop-templates/Page/Page.scss.hbs",
      },
      // {
      //   type: "add",
      //   path: "src/screens/{{pascalCase name}}/index.js",
      //   templateFile: "plop-templates/Page/index.js.hbs",
      // },
      // {
      //   type: "add",
      //   path: "src/screens/index.js",
      //   templateFile: "plop-templates/injectable-index.js.hbs",
      //   skipIfExists: true,
      // },
      // {
      //   type: "append",
      //   path: "src/screens/index.js",
      //   pattern: `/* PLOP_INJECT_IMPORT */`,
      //   template: `import {{pascalCase name}} from './{{pascalCase name}}';`,
      // },
      // {
      //   type: "append",
      //   path: "src/screens/index.js",
      //   pattern: `/* PLOP_INJECT_EXPORT */`,
      //   template: `\t{{pascalCase name}},`,
      // },
    ],
  });
  
  plop.setGenerator("service", {
    description: "Create service",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "What is your service name?",
        validate: requireField("name")
      },
    ],
    actions: [
      {
        type: "add",
        path: "src/services/{{camelCase name}}.js",
        templateFile: "plop-templates/service.js.hbs",
      },
      {
        type: "add",
        path: "src/services/index.js",
        templateFile: "plop-templates/injectable-index.js.hbs",
        skipIfExists: true,
      },
      {
        type: "append",
        path: "src/services/index.js",
        pattern: `/* PLOP_INJECT_IMPORT */`,
        template: `import {{camelCase name}} from './{{camelCase name}}';`,
      },
      {
        type: "append",
        path: "src/services/index.js",
        pattern: `/* PLOP_INJECT_EXPORT */`,
        template: `\t{{camelCase name}},`,
      }
    ],
  });
  
  plop.setGenerator("hook", {
    description: "Create a custom react hook",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "What is your hook name?",
        validate: requireField("name")
      },
    ],
    actions: [
      {
        type: "add",
        path: "src/hooks/{{camelCase name}}.js",
        templateFile: "plop-templates/hook.js.hbs",
      },
      {
        type: "add",
        path: "src/hooks/index.js",
        templateFile: "plop-templates/injectable-index.js.hbs",
        skipIfExists: true,
      },
      {
        type: "append",
        path: "src/hooks/index.js",
        pattern: `/* PLOP_INJECT_IMPORT */`,
        template: `import {{camelCase name}} from './{{camelCase name}}';`,
      },
      {
        type: "append",
        path: "src/hooks/index.js",
        pattern: `/* PLOP_INJECT_EXPORT */`,
        template: `\t{{camelCase name}},`,
      }
    ],
  });
};
