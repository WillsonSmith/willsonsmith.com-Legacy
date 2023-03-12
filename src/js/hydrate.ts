export async function hsr() {
  const litHydrateSupportInstalled = import('lit/experimental-hydrate-support.js');
  if (!HTMLTemplateElement.prototype.hasOwnProperty('shadowRoot')) {
    const { hydrateShadowRoots } = await import(
      '@webcomponents/template-shadowroot/template-shadowroot.js'
    );
    hydrateShadowRoots(document.body);
    document.body.removeAttribute('dsd-pending');
  }
  return litHydrateSupportInstalled;
}
