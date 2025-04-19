module.exports = {
    root: true,
    parser: '@babel/eslint-parser',
    settings: {
        react: {
            version: 'detect',
        },
    },
    env: {
        node: true,
        browser: true,
        es6: true,
        commonjs: true,
    },
    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:@next/next/recommended',
        'prettier',
    ],
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 2020,
        requireConfigFile: false,
        babelOptions: {
            presets: ['@babel/preset-react'],
        },
    },
    rules: {
        /*
        'import/prefer-default-export': 0,
        'no-console': 'warn',
        'no-nested-ternary': 0,
        'no-underscore-dangle': 0,
        'no-unused-expressions': ['error', { allowTernary: true }],
        camelcase: 0,
        'react/self-closing-comp': 1,
        'react/jsx-filename-extension': [1, { extensions: ['.js', 'jsx'] }],
        'react/prop-types': 0,
        'react/destructuring-assignment': 0,
        'react/jsx-no-comment-textnodes': 0,
        'react/jsx-props-no-spreading': 0,
        'react/no-array-index-key': 0,
        'react/no-unescaped-entities': 0,
        'react/require-default-props': 0,
        'react/react-in-jsx-scope': 0,
        'linebreak-style': ['error', 'unix'],
        semi: ['error', 'never'],
        */
'import/prefer-default-export': 0,  // デフォルトエクスポートを必須にしない
    'no-console': 'off',  // console の使用を許可
    'no-nested-ternary': 0,  // ネストされた三項演算子の使用を許可
    'no-underscore-dangle': 0,  // アンダースコア付きの変数名を許可
    'no-unused-expressions': ['error', { allowTernary: true }],  // 三項演算子内での式を許可
    camelcase: 0,  // キャメルケースを強制しない
    'react/self-closing-comp': 1,  // 空のタグを許可（例: <img />）
    'react/jsx-filename-extension': [1, { extensions: ['.js', 'jsx', '.ts', '.tsx'] }],  // jsx 拡張子を許可
    'react/prop-types': 0,  // PropTypes を必須にしない（警告に変更）
    'react/destructuring-assignment': 0,  // デストラクチャリングを強制しない
    'react/jsx-no-comment-textnodes': 0,  // JSX 内のコメントを許可
    'react/jsx-props-no-spreading': 0,  // JSX での props spreading を許可
    'react/no-array-index-key': 0,  // 配列インデックスをキーにすることを許可
    'react/no-unescaped-entities': 0,  // エンティティをエスケープしなくても許可
    'react/require-default-props': 0,  // デフォルトプロパティを強制しない
    'react/react-in-jsx-scope': 0,  // JSX 内で React を必須にしない（React 17以降）
    'linebreak-style': ['error', 'unix'],  // UNIX スタイルの改行を強制
    semi: ['warn', 'never'],  // セミコロンを警告として必須に変更
    },
}
