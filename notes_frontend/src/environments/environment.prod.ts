export const environment = {
  production: true,
  // PUBLIC_INTERFACE
  /** Base API endpoint for backend HTTP requests. Configure via environment variable at build time. */
  apiBaseUrl: (() => {
    const g: any = typeof globalThis !== 'undefined' ? globalThis : {};
    const w = g.window as any | undefined;
    const runtime = w && w.__env__ && w.__env__.API_BASE_URL;
    return runtime || '/api';
  })(),
};
