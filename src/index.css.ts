import { css } from 'lit';
export const styles = css`
  @import url('https://fonts.googleapis.com/css2?family=Lilita+One&display=swap');
  body {
    line-height: var(--line-height-small);
  }
  site-header {
    display: block;
    padding-inline: var(--spacing-lg);
    padding-block: var(--spacing);
    position: sticky;
    width: 100%;
    top: 0;

    background: linear-gradient(
      to bottom,
      rgba(255, 255, 255, 0.3) 30%,
      rgba(255, 255, 255, 0) 100%
    );

    -webkit-backdrop-filter: blur(1px);
    backdrop-filter: blur(1px);
  }

  site-header::part(heading) {
    font-family: 'Lilita One', var(--font-system-sans);
  }

  .section {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-sm);
    align-items: center;
    padding: var(--spacing);
  }

  .section header h2 {
    font-family: 'Lilita One', var(--font-system-sans);
    font-weight: var(--font-weight-bold);
    font-size: var(--font-size-xxl);
    line-height: var(--line-height-xs);
  }

  .page {
    margin-block-start: var(--spacing-lg);
    display: flex;
    flex-direction: column;
    gap: var(--spacing-lg);
  }

  .bio {
    display: flex;
    flex-direction: column;

    line-height: var(--line-height-sm);
  }

  .bio > * + * {
    margin-block-start: var(--spacing-sm);
  }

  a {
    color: var(--color-text-body);
  }

  .project-list {
    background: var(--sl-color-neutral-100);
    padding: var(--spacing-sm);
    line-height: var(--line-height);
  }

  .project-list__heading {
    line-height: var(--line-height);
    font-weight: var(--font-weight-bold);
    font-size: var(--font-size-lg);
  }

  ul[role='list'].project-list__list {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-xs);
    line-height: var(--line-height-sm);
  }

  movies-block {
    max-width: 100%;
  }
`;
