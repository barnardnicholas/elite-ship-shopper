const environment: Record<string, string> = {
  dev: 'https://localhost:3000/src/data',
  qa: '',
  production: '',
};

const env = process.env as unknown;

export default environment[env as string];
