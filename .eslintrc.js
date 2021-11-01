const OFF = 0; // turn off the rule completely
const WARN = 1; // turns the rule on but won't make the linter fail
const ERROR = 2; // turns the rule on and make the linter fail

module.exports = {
  root: true,
  parser: 'babel-eslint',
  plugins: [
    'react',
    'react-hooks',
    'prettier',
    'import',
    'jsx-a11y',
    '@typescript-eslint',
  ],
  extends: [
    'eslint-config-prettier',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  parserOptions: {
    project: './tsconfig.json',
  },
  rules: {
    'prettier/prettier': OFF,
    camelcase: OFF,
    'react/prop-types': OFF,
    'react/require-default-props': OFF,
    'react/jsx-uses-react': ERROR,
    'react/jsx-uses-vars': ERROR,
    'accessor-pairs': OFF,
    'arrow-parens': [ERROR, 'as-needed'],
    'arrow-spacing': [ERROR, { before: true, after: true }],
    'brace-style': [ERROR, '1tbs'],
    'no-prototype-builtins': OFF,
    'comma-dangle': [
      ERROR,
      {
        arrays: 'always-multiline',
        objects: 'always-multiline',
        imports: 'always-multiline',
        exports: 'always-multiline',
        functions: 'never',
      },
    ],
    'dot-notation': ERROR,
    'eol-last': ERROR,
    eqeqeq: [ERROR, 'smart'],
    'jsx-quotes': [ERROR, 'prefer-double'],
    'keyword-spacing': [ERROR, { after: true, before: true }],
    'no-inner-declarations': [ERROR, 'functions'],
    'no-multi-spaces': ERROR,
    'no-restricted-syntax': [ERROR, 'WithStatement'],
    'no-shadow': OFF,
    'no-unused-vars': [WARN, { args: 'after-used' }],
    'no-useless-concat': ERROR,
    quotes: [
      ERROR,
      'single',
      {
        avoidEscape: true,
        allowTemplateLiterals: true,
      },
    ],
    'space-before-blocks': ERROR,
    'space-before-function-paren': OFF,
    'react/jsx-boolean-value': [ERROR, 'never'],
    'react/jsx-filename-extension': [
      ERROR,
      { extensions: ['.js', 'jsx', '.ts', '.tsx'] },
    ],
    'react/boolean-prop-naming': [
      ERROR,
      {
        rule: '^(is|has)[A-Z]([A-Za-z0-9]?)+',
      },
    ],
    'import/prefer-default-export': OFF,
    'react/self-closing-comp': ERROR,
    'react/no-unused-state': ERROR,
    'react/default-props-match-prop-types': OFF,
    'react/jsx-props-no-spreading': OFF,
    'react-hooks/rules-of-hooks': ERROR, // Checks rules of Hooks
    'react-hooks/exhaustive-deps': WARN, // Checks effect dependencies
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
    '@typescript-eslint/no-unused-vars': OFF,
    '@typescript-eslint/explicit-module-boundary-types': OFF,
    '@typescript-eslint/explicit-function-return-type': OFF,
    '@typescript-eslint/no-empty-function': WARN,
    'no-shadow': OFF,
    '@typescript-eslint/no-shadow': ['off'],
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        eqeqeq: OFF,
      },
    },
  ],
  env: {
    browser: true,
  },
  settings: {
    'import/resolver': {
      node: {
        paths: ['src'],
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
};
