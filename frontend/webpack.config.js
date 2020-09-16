const nodeExternals = require('webpack-node-externals');

{
target: 'node',
externals: [nodeExternals()],
}

