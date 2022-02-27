/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    "setupFilesAfterEnv": [
        "./test/setup.ts"
    ],
    "testPathIgnorePatterns": [
        "./build/",
        "./node_modules/"
    ]
};