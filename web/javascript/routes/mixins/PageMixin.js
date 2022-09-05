export const PageMixin = (superClass) =>
  class extends superClass {
    firstUpdated() {
      super.firstUpdated();
      const titleChangeEvent = new CustomEvent(`title-change`, {
        detail: {
          title: this.title,
        },
        bubbles: true,
        composed: true,
      });
      this.dispatchEvent(titleChangeEvent);
    }
  };
