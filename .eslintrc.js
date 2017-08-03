'use strict';

const settings = {
    env: {
        browser: false,
        jquery: false,
        mocha: true,
        node: true,
        es6: true //es6
    },
    root: true,
    globals: {
        Promise: true
    },
    rules: {
        // possible errors
        'no-cond-assign': ['error', 'except-parens'],
        'no-console': 'off', // its ok to console.log in this app
        'no-constant-condition': 'error',
        'no-control-regex': 'error',
        'no-debugger': 'error',
        'no-dupe-args': 'error',
        'no-dupe-keys': 'error',
        'no-duplicate-case': 'error',
        'no-empty-character-class': 'error',
        'no-empty': ['warn', {allowEmptyCatch: true}],
        'no-ex-assign': 'warn',
        'no-extra-boolean-cast': 'warn',
        'no-extra-parens': 'off',
        'no-extra-semi': 'error',
        'no-invalid-regexp': 'error',
        'no-irregular-whitespace': 'error',
        'no-obj-calls': 'error',
        'no-regex-spaces': 'warn',
        'no-sparse-arrays': 'warn', // this is a thing for front-layouts with empty spots
        'no-template-curly-in-string': 'error',
        'no-unexpected-multiline': 'warn',
        'no-unreachable': 'error',
        'no-unsafe-finally': 'error',
        'no-unsafe-negation': 'error',
        'use-isnan': 'error',
        'valid-typeof': 'error',

        // best practices
        'accessor-pairs': 'error', // setWithoutGet default
        'array-callback-return': 'error',
        'block-scoped-var': 'warn',
        'class-methods-use-this': 'warn',
        complexity: ['error', 12],
        'consistent-return': 0,
        curly: ['error', 'multi-line', 'consistent'],
        'default-case': 'error',
        'dot-location': ['error', 'property'],
        'dot-notation': 'error',
        eqeqeq: ['error', 'smart'],
        'guard-for-in': 'off',
        'no-alert': 'error',
        'no-caller': 'warn',
        'no-case-declarations': 'error',
        'no-div-regex': 'warn',
        'no-else-return': 'error',
        'no-empty-function': 'off',
        'no-empty-pattern': 'error',
        'no-eq-null': 'off', // eqeqeq checks for this better
        'no-eval': 'error',
        'no-extend-native': 'warn',
        'no-extra-bind': 'warn',
        'no-extra-label': 'error',
        'no-fallthrough': 'warn',
        'no-floating-decimal': 'error',
        'no-global-assign': 'warn',
        'no-implicit-coercion': 'warn',
        'no-implicit-globals': 'off', // only useful for browser
        'no-implied-eval': 'warn',
        'no-invalid-this': 'warn',
        'no-iterator': 'error', // error in node.js, works in spidermonky
        'no-labels': 'warn',
        'no-lone-blocks': 'warn',
        'no-loop-func': 'error',
        'no-magic-numbers': ['off', {ignoreArrayIndexes: true, ignore: [0, 1]}], // finicky rule, nice to have
        'no-multi-spaces': 'error',
        'no-multi-str': 'warn',
        'no-new-func': 'warn',
        'no-new-wrappers': 'error',
        'no-octal-escape': 'error',
        'no-octal': 'error',
        'no-param-reassign': 'off', // should be on, will cause a lot of changes
        'no-proto': 'warn',
        'no-redeclare': 'error',
        // "no-restricted-properties" needs further research
        'no-return-assign': ['error', 'except-parens'],
        'no-return-await': 'error',
        'no-script-url': 'error', // browser only
        'no-self-assign': 'error',
        'no-self-compare': 'error',
        'no-sequences': 'error',
        'no-throw-literal': 'error',
        'no-unmodified-loop-condition': 'warn',
        'no-unused-expressions': 'off', // chai assert requires this to be off
        'no-unused-labels': 'error',
        'no-useless-call': 'error',
        'no-useless-concat': 'warn',
        'no-useless-escape': 'warn',
        'no-useless-return': 'warn',
        'no-void': 'warn',
        'no-warning-comments': 'off',
        'no-with': 'error',
        radix: 'error',
        'require-await': 'error',
        'vars-on-top': 'off',
        'wrap-iife': 'error',
        yoda: 'error',

        // strict
        strict: 'error',

        // variables
        'init-declarations': 'off',
        'no-catch-shadow': 'error',
        'no-delete-var': 'error',
        'no-label-var': 'error',
        'no-restricted-globals': 'off', // (requires research)
        'no-shadow-restricted-names': 'error',
        'no-shadow': ['warn', { allow: ['done', 'err', 'error', 'callback'] }],
        'no-undef-init': 'warn',
        'no-undef': 'warn', // Until errors are no longer global
        'no-undefined': 'warn',
        'no-unused-vars': 'warn',
        'no-use-before-define': 'off',

        // node.js
        'callback-return': 'off', // (nice to have but too many false positives/negatives)
        'global-require': 'off',
        'handle-callback-err': 'off', // (same as callback-return)
        'no-mixed-requires': 'warn',
        'no-new-require': 'error',
        'no-path-concat': 'warn', // should be error once fixed
        'no-process-env': 'off',
        'no-process-exit': 'off',
        'no-restricted-modules': 'off',
        'no-sync': 'off',

        // syntax/styling
        'array-bracket-spacing': ['error', 'never'],
        'block-spacing': ['error', 'always'],
        'brace-style': ['error', '1tbs', {allowSingleLine: true}],
        camelcase: ['error', {properties: 'never'}], // maybe disable entirely?
        'capitalized-comments': 'off',
        'comma-dangle': 'error',
        'comma-spacing': 'error',
        'comma-style': ['error', 'last'],
        'computed-property-spacing': 'error',
        'consistent-this': 'off',
        'eol-last': 'error',
        'func-call-spacing': ['error', 'never'],
        'func-name-matching': ['error', 'always'],
        'func-names': 'off',
        'func-style': 'off',
        'id-blacklist': 'off',
        'id-length': 'off',
        'id-match': 'off',
        indent: ['error', 4, {SwitchCase: 1, MemberExpression: 1}],
        'key-spacing': ['error', {beforeColon: false, afterColon: true}],
        'keyword-spacing': [
            'error',
            {
                overrides: {
                    else: { before: true },
                    while: { before: true },
                    catch: { before: true }
                }
            }
        ],
        'line-comment-position': 'off',
        'linebreak-style': 'error',
        'lines-around-comment': 'off',
        'lines-around-directive': 'error',
        'max-depth': ['warn', 5],
        'max-len': ['off', 180, {ignoreComments: true}], // ಠ_ಠ
        'max-lines': 'off',
        'max-nested-callbacks': 'error', // defaults to 10
        'max-params': ['error', 5],
        'max-statements-per-line': ['error', {max: 3}],
        'max-statements': 'off',
        'multiline-ternary': 'off',
        'new-cap': 'warn',
        'new-parens': 'error',
        'newline-after-var': 'off',
        'newline-before-return': 'off',
        'newline-per-chained-call': ['error', {ignoreChainWithDepth: 5}],
        'no-array-constructor': 'error',
        'no-bitwise': 'off',
        'no-continue': 'off',
        'no-inline-comments': 'off',
        'no-lonely-if': 'error',
        'no-mixed-operators': 'error',
        'no-mixed-spaces-and-tabs': 'error',
        'no-multiple-empty-lines': 'error',
        'no-negated-condition': 'error',
        'no-nested-ternary': 'error',
        'no-new-object': 'error',
        'no-plusplus': 'off',
        // ""no-restricted-syntax":
        // ""no-tabs":
        // ""no-ternary":
        'no-trailing-spaces': 'error',
        'no-underscore-dangle': 'off',
        'no-unneeded-ternary': 'error',
        'no-whitespace-before-property': 'error',
        // these need discussion before enabling
        'object-curly-newline': ['off', {multiline: true}],
        'object-curly-spacing': 'off',
        'object-property-newline': 'off',

        'one-var': ['error', 'never'],
        'one-var-declaration-per-line': 'off',
        'operator-assignment': 'error',
        'operator-linebreak': 'off',
        'padded-blocks': 'off',
        'quote-props': ['error', 'as-needed'],
        quotes: ['error', 'single'],
        'require-jsdoc': 'off',
        'semi-spacing': ['error', {before: false, after: true}],
        semi: ['error', 'always'],
        'sort-keys': 'off',
        'sort-vars': 'off',
        'space-before-blocks': ['error', 'always'],
        'space-before-function-paren': ['error', 'never'],
        'space-in-parens': ['error', 'never'],
        'space-infix-ops': 'error',
        'space-unary-ops': 'error',
        'spaced-comment': 'error',
        'unicode-bom': 'error',
        'wrap-regex': 'error',

        'arrow-body-style': ['error', 'as-needed'],
        'arrow-parens': ['error', 'as-needed'],
        'arrow-spacing': ['error', { before: true, after: true }],
        'constructor-super': 'error',
        'generator-star-spacing': 'error',
        'no-class-assign': 'error',
        'no-confusing-arrow': ['error', {allowParens: true}],
        'no-const-assign': 'error',
        'no-dupe-class-members': 'error',
        'no-duplicate-imports': 'error',
        'no-new-symbol': 'error',
        // ""no-restricted-imports": ,
        'no-this-before-super': 'error',
        'no-useless-computed-key': 'error',
        'no-useless-constructor': 'error',
        'no-useless-rename': 'error',
        'no-var': 'error',
        'object-shorthand': ['error', 'always'],
        'prefer-arrow-callback': ['error', { allowNamedFunctions: true }],
        'prefer-const': 'warn',
        'prefer-numeric-literals': 'warn',
        'prefer-reflect': 'warn',
        'prefer-spread': 'warn',
        'prefer-template': 'error',
        'require-yield': 'error',
        'rest-spread-spacing': 'error',
        'sort-imports': 'off',
        'symbol-description': 'warn',
        'template-curly-spacing': 'error',
        'yield-star-spacing': 'error'
    }
};

module.exports = settings;
