export const environment = {
  production: false,
  // PUBLIC_INTERFACE
  /** Base API endpoint for backend HTTP requests. Configure via environment variable at build time. */
  apiBaseUrl: (() => {
    // Guard against SSR and linter no-undef by checking globalThis
    const g: any = typeof globalThis !== 'undefined' ? globalThis : {};
    const w = g.window as any | undefined;
    const runtime = w && w.__env__ && w.__env__.API_BASE_URL;
    return runtime || '/api';
  })(),
};
