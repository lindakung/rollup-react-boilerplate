import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import replace from "rollup-plugin-replace";
import serve from 'rollup-plugin-serve';

import pkg from './package.json';

const NODE_ENV = process.env.NODE_ENV || "development";

// const externals = NODE_ENV === 'production' && Object.keys(pkg.dependencies) || {};

export default {
  input: 'src/index.js',
  // externals,
  output: {
    file: 'public/bundle.js',
    format: 'iife',
    name: 'boilerplate',
    sourcemap: true,
    globals: {
      react: 'React',
      'react-dom': 'ReactDOM'
    }
  },
  plugins: [ 
    resolve({
      browser: true,
      customResolveOptions: {
        moduleDirectory: 'node_modules'
      }
    }), 
    babel({
      exclude: 'node_modules/**'
    }),
    commonjs({
      include: ['node_modules/**']
    }),
    replace({
      'process.env.NODE_ENV': JSON.stringify(NODE_ENV)
    }),
    serve('public'),
  ],
};
