module.exports = {
  "extends": ["./eslint-common.json"],
  "env": {
    "es6": true
  },
  "rules": {
    "arrow-body-style": [
      "error",
      "as-needed"
    ],
    "arrow-parens": [
      "error",
      "as-needed"
    ],
    "arrow-spacing": [
      "error",
      {
        "before": true,
        "after": true
      }
    ],
    "comma-dangle": [
      "error",
      "always-multiline"
    ],
    "computed-property-spacing": [
      "error",
      "never"
    ],
    "func-style": [
      "error",
      "declaration",
      {
        "allowArrowFunctions": true
      }
    ],
    "generator-star-spacing": [
      "error",
      {
        "before": false,
        "after": true
      }
    ],
    "no-const-assign": [
      "error"
    ],
    "no-invalid-regexp": [
      "error",
      {
        "allowConstructorFlags": [
          "g",
          "i",
          "m",
          "u",
          "y"
        ]
      }
    ],
    "no-useless-computed-key": [
      "error"
    ],
    "no-useless-rename": [
      "error"
    ],
    "no-var": [
      "error"
    ],
    "prefer-arrow-callback": [
      "error",
      {
        "allowNamedFunctions": false
      }
    ],
    "prefer-const": [
      "error",
      {
        "destructuring": "any"
      }
    ],
    "prefer-numeric-literals": [
      "error"
    ],
    "prefer-rest-params": [
      "error"
    ],
    "prefer-spread": [
      "error"
    ],
    "prefer-template": [
      "off"
    ],
    "template-curly-spacing": [
      "error",
      "never"
    ],
    "template-tag-spacing": [
      "error",
      "never"
    ],
    "yield-star-spacing": [
      "error",
      {
        "before": false,
        "after": true
      }
    ]
  }
}