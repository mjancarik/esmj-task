module.exports = {
  bail: false,
  verbose: true,
  testEnvironment: 'node',
  coverageThreshold: {
    global: {
      functions: 45,
      lines: 45,
      statements: 45,
    },
  },
  transform: {
    '^.+\\.tsx?$': [
      'esbuild-jest',
      {
        format: 'cjs',
        target: 'es2022',
        sourcemap: true,
        loaders: {
          'Spec.ts': 'tsx',
        },
      },
    ],
  },
  modulePaths: ['<rootDir>/'],
  testMatch: ['<rootDir>/src/**/__tests__/**/*Spec.mjs'],
  setupFiles: ['./setupJest.mjs'],
  moduleFileExtensions: ['mjs', 'js', 'jsx', 'ts', 'tsx', 'json', 'node'],
};
