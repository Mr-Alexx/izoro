function highlight({ init } = {}) {
  let hljs;
  return {
    viewerEffect({ markdownBody }) {
      (async () => {
        const els = markdownBody.querySelectorAll('pre>code');
        if (els.length === 0) return;
        if (!hljs) {
          hljs = await import('highlight.js/lib/core').then(m => m.default);
          const languages = await Promise.all([
            import('highlight.js/lib/languages/basic'),
            import('highlight.js/lib/languages/javascript'),
            import('highlight.js/lib/languages/typescript'),
            import('highlight.js/lib/languages/sql'),
            import('highlight.js/lib/languages/shell'),
            import('highlight.js/lib/languages/nginx'),
            import('highlight.js/lib/languages/json'),
            import('highlight.js/lib/languages/dockerfile'),
            import('highlight.js/lib/languages/css'),
            import('highlight.js/lib/languages/scss'),
          ]);
          languages.forEach(language => {
            hljs.registerLanguage(language.default.name, language.default);
          });
          if (init) await init(hljs);
        }
        els.forEach(el => {
          hljs.highlightElement(el);
        });
      })();
    },
  };
}

export { highlight as default };
