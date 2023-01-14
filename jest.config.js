module.exports = {
	collectCoverageFrom: ['**/*.{js,jsx,ts,tsx}', '!**/*.d.ts', '!**/node_modules/**'],
	testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/.next/', '<rootDir>/e2e/'],
	transform: {
		'^.+\\.(js|jsx|ts|tsx)$': ['babel-jest', {
			presets: ['next/babel'],
  		plugins: [['effector/babel-plugin', { 'reactSsr': false }]]
		}],
	},
	testEnvironment: 'jsdom',
	setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
	transformIgnorePatterns: ['/node_modules/', '^.+\\.module\\.(css|sass|scss)$'],
};
