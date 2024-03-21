import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  schema: 'https://rickandmortyapi.com/graphql',
  documents: './src/**/*.graphql',
  generates: {
    './src/generated/graphql.ts': {
      plugins: ['typescript', 'typescript-operations', 'typescript-apollo-angular'],
      config: {
        withMutationOptionsType: true
      }
    }
  }
}
export default config
