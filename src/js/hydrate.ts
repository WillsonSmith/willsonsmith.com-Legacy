export async function hydrateShadowRoots() {
  const litHydrate = import('lit/experimental-hydrate-support.js');
  if (!HTMLTemplateElement.prototype.hasOwnProperty('shadowRoot')) {
    const { hydrateShadowRoots } = await import(
      '@webcomponents/template-shadowroot/template-shadowroot.js'
    );
    hydrateShadowRoots(document.body);
  }
  await litHydrate;
}
