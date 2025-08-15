# @acme/api-client

This package provides a TypeScript/JavaScript API client generated from your OpenAPI spec. It uses the [Fetch API](https://fetch.spec.whatwg.org/) and is suitable for use in:

## How is this client generated?

The API client is generated automatically from your OpenAPI spec (`swagger.json`).

To update or regenerate the client, run one of the following commands from the root of the monorepo:

```
pnpm run generate:api-client
```

or (to force regeneration):

```
pnpm run generate:api-client:force
```

This will use the OpenAPI spec to generate the latest client code in this package.

## Installation

Use **pnpm** to install this package in your project:

```
pnpm add @acme/api-client
```

If you want to use a local unpublished version:

```
pnpm add ../path/to/api/client
```

## Building

To build and compile the TypeScript sources to JavaScript:

```
pnpm install
pnpm build
```

## Publishing

First build the package, then publish it:

```
pnpm build
pnpm publish --access public
```

## Usage Example

Below is an example of how to use the generated API client in your project:

```ts
import { AppApi, Configuration } from '@acme/api-client';

// Create a configuration (optional)
const config = new Configuration({
  basePath: 'http://localhost:49252', // Your API server URL
  // Add other configuration options like headers, middleware, etc.
});

// Create an instance of the API
const appApi = new AppApi(config);

// Example function to call the API
export async function getHelloMessage(): Promise<any> {
  try {
    const response = await appApi.appControllerGetHello();
    console.log('Hello message received:', response);
    return response;
  } catch (error) {
    console.error('Error calling API:', error);
    throw error;
  }
}

// Example usage
// getHelloMessage().then(message => {
//   console.log('API call successful:', message);
// }).catch(error => {
//   console.error('API call failed:', error);
// });
```
