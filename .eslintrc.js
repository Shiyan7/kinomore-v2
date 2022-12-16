/** Разрешенные импорты (для сортировки) */
const ALLOWED_PATH_GROUPS = ["pages/**", "features/**", "entities/**", "shared/**"].map(
	(pattern) => ({
		pattern,
		group: "internal",
		position: "after",
	}),
);

/** Для запрета приватных путей */
const DENIED_PATH_GROUPS = [
	// Private imports are prohibited, use public imports instead
	"pages/*/**",
	"features/*/**",
	"entities/*/**",
	"shared/*/*/**", // Для shared +1 уровень, т.к. там чаще мы обращаемся к конкретной библиотеке/компоненты
	// Prefer absolute imports instead of relatives (for root modules)
	"../**/app",
	"../**/pages",
	"../**/features",
	"../**/entities",
	"../**/shared",
];

module.exports = {
	"env": {
		"browser": true,
		"es2021": true,
		"node": true,
		"jest": true
	},
	"parser": "@typescript-eslint/parser",
	"parserOptions": {
		"ecmaVersion": "latest",
		"sourceType": "module"
	},
	"extends": [
		"plugin:@typescript-eslint/recommended",
		"airbnb",
		"next/core-web-vitals",
		"prettier"
	],
	"plugins": [
		"unicorn",
		"@typescript-eslint",
		"react-hooks",
		"jsx-a11y",
		"react",
		"prettier"
	],
	"rules": {
		"import/order": [
			2,
			{
				pathGroups: ALLOWED_PATH_GROUPS,
				pathGroupsExcludedImportTypes: ["builtin"],
				groups: ["builtin", "external", "internal", "parent", "sibling", "index"],
			},
		],
		"no-restricted-imports": [
			2,
			{
				patterns: DENIED_PATH_GROUPS
			}
		],

		"consistent-return": "off",
		"@next/next/google-font-display": "off",
		"@next/next/google-font-preconnect": "off",
		"no-empty": "off",
		"arrow-body-style": "off",
		"react/prop-types": "off",
		"import/no-unresolved": "off",
		"react-hooks/rules-of-hooks": "error",
		"react-hooks/exhaustive-deps": "warn",
		"react/react-in-jsx-scope": "off",
		"react/button-has-type": "off",
		"react/jsx-key": 1,
		"lines-around-directive": "off",
		"react/jsx-wrap-multilines": [
			"error",
			{
				"arrow": true,
				"return": true,
				"declaration": true
			}
		],
		"react/state-in-constructor": [
			2,
			"never"
		],
		"react/jsx-filename-extension": 0,
		"react/jsx-props-no-spreading": 0,
		"react/destructuring-assignment": 1,
		"react/require-default-props": 0,
		"react/no-array-index-key": 0,
		"react/no-unescaped-entities": 1,
		"react/no-danger": 0,
		"react/function-component-definition": 0,
		"react/no-unused-prop-types": 1,
		"react/no-unknown-property": [
			"error",
			{
				"ignore": [
					"css"
				]
			}
		],
		"react/no-unstable-nested-components": [
			"warn"
		],
		"react/prefer-stateless-function": "warn",
		"import/extensions": 0,
		"import/no-named-as-default": 0,
		"import/prefer-default-export": 0,
		"import/no-cycle": 0,
		"import/no-extraneous-dependencies": 1,
		"import/no-mutable-exports": "warn",
		"@typescript-eslint/no-explicit-any": "warn",
		"@typescript-eslint/explicit-module-boundary-types": "off",
		"comma-dangle": "off",
		"@typescript-eslint/comma-dangle": "off",
		"@typescript-eslint/no-unused-vars": [
			"error",
			{
				"argsIgnorePattern": "^_"
			}
		],
		"@typescript-eslint/quotes": [
			"error",
			"double",
			{
				"avoidEscape": true,
				"allowTemplateLiterals": true
			}
		],
		"@typescript-eslint/ban-ts-comment": "off",
		"default-param-last": "warn",
		"block-spacing": "error",
		"quotes": "off",
		"comma-spacing": [
			"error",
			{
				"before": false,
				"after": true
			}
		],
		"eqeqeq": [
			"error",
			"always"
		],
		"semi": [
			"error",
			"always",
			{
				"omitLastInOneLineBlock": true
			}
		],
		"space-unary-ops": "error",
		"spaced-comment": [
			"error",
			"always"
		],
		"key-spacing": [
			"error",
			{
				"afterColon": true
			}
		],
		"object-curly-newline": 0,
		"object-curly-spacing": [
			"error",
			"always"
		],
		"max-len": [
			"warn",
			{
				"code": 120,
				"ignoreComments": true,
				"ignoreStrings": true,
				"ignoreTemplateLiterals": true
			}
		],
		"indent": "off",
		"no-tabs": "off",
		"no-eval": "error",
		"no-console": "off",
		"no-duplicate-imports": "error",
		"no-unused-vars": "off",
		"no-underscore-dangle": "off",
		"no-template-curly-in-string": "error",
		"no-whitespace-before-property": "error",
		"no-param-reassign": [
			"warn",
			{
				"props": false
			}
		],
		"unicorn/no-unused-properties": "warn",
		"unicorn/throw-new-error": "error",
		"unicorn/no-useless-spread": "error",
		"unicorn/no-unnecessary-await": "error",
		"jsx-quotes": [
			"error",
			"prefer-double"
		],
		"jsx-a11y/alt-text": [
			2,
			{
				"elements": [
					"img",
					"object",
					"area",
					"input[type=\"image\"]"
				],
				"img": [
					"Image"
				],
				"object": [
					"Object"
				],
				"area": [
					"Area"
				],
				"input[type=\"image\"]": [
					"InputImage"
				]
			}
		],
		"jsx-a11y/label-has-associated-control": 0,
		"jsx-a11y/anchor-has-content": 0,
		"jsx-a11y/anchor-is-valid": 0,
		"jsx-a11y/click-events-have-key-events": 0,
		"jsx-a11y/no-static-element-interactions": [
			2,
			{
				"handlers": [
					"onMouseDown",
					"onMouseUp",
					"onKeyPress",
					"onKeyDown",
					"onKeyUp"
				]
			}
		],
		"react/no-string-refs": "warn",
		"no-unsafe-optional-chaining": "off",
		"no-shadow": "off",
		"no-restricted-syntax": "warn",
		"no-plusplus": "off",
		"no-case-declarations": "off",
		"no-useless-escape": "off",
		"operator-linebreak": "off",
		"no-continue": "warn",
		"no-use-before-define": [
			"error",
			{
				"functions": false,
				"classes": false
			}
		],
		"max-classes-per-file": "warn",
		"no-unused-class-component-methods": "off",
		"react/no-unused-class-component-methods": "warn",
		"class-methods-use-this": "warn",
		"react/display-name": "off"
	}
};
