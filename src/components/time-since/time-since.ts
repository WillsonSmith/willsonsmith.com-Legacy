import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('time-since')
export class TimeSince extends LitElement {
  @property({ type: String }) date = '';

  firstUpdated() {
    this.updateTime();
  }

  render() {
    const timeSince = Math.floor((new Date().getTime() - new Date(this.date).getTime()) / 1000);
    return html` <span>${this.timeSinceToYearsAndMonths(timeSince)}</span> `;
  }

  updateTime() {
    this.requestUpdate();
  }

  private timeSinceToYearsAndMonths(timeSince: number) {
    const secondsInYear = 60 * 60 * 24 * 365;
    const secondsInMonth = 60 * 60 * 24 * 30;
    const years = Math.floor(timeSince / secondsInYear);
    const months = Math.floor((timeSince % secondsInYear) / secondsInMonth);
    return `${years} years and ${months} months`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'time-s': TimeSince;
  }
}
