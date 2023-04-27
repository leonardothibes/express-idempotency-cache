module.exports = {
    roots: ["<rootDir>/tests/"],
    bail: true,
    clearMocks: true,
    coverageProvider: "v8",
    coverageDirectory: 'coverage',
    testEnvironment: "node",
    collectCoverageFrom: ['<rootDir>/src/**'],
};
