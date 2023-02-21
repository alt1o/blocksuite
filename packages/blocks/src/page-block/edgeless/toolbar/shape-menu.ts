import { Signal } from '@blocksuite/store';
import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import type { ShapeMouseMode } from '../../../__internal__/index.js';
import { ShapeComponentConfig } from './shape-config.js';

@customElement('shape-menu')
export class ShapeMenu extends LitElement {
  static styles = css`
    .shape-menu-container {
      display: flex;
      align-items: center;
      height: 48px;
      background: var(--affine-page-background);
      box-shadow: 0 0 12px rgba(66, 65, 73, 0.14);
      border-radius: 8px;
      fill: currentColor;
    }

    .icon-container {
      position: relative;
      display: flex;
      align-items: center;
      padding: 4px;
      fill: none;
      stroke: var(--affine-line-number-color);
      margin-top: 4px;
      margin-bottom: 4px;
      margin-right: 8px;
      border-radius: 5px;
    }

    .icon-container:first-child {
      margin-left: 8px;
    }

    .icon-container:hover {
      background: var(--affine-hover-background);
    }

    .icon-container[clicked] {
      background: var(--affine-hover-background);
      stroke: var(--affine-primary-color);
    }

    .icon-container[disabled] {
      cursor: not-allowed;
      stroke: var(--affine-disable-color);
    }

    arrow-tool-tip {
      transform: translateX(-50%) translateY(-50%);
      left: calc(50%);
      bottom: 24px;
      opacity: 0;
    }

    .icon-container:not([clicked]):hover > arrow-tool-tip {
      opacity: 1;
      transition-delay: 200ms;
    }
  `;

  readonly signals = {
    select: new Signal<ShapeMouseMode['shape']>(),
  };

  @property()
  selectedShape?: ShapeMouseMode['shape'];

  render() {
    return html`
      <div class="shape-menu-container">
        ${ShapeComponentConfig.map(({ name, icon, tooltip, disabled }) => {
          return html`
            <div
              class="icon-container"
              role="button"
              ?disabled=${disabled}
              ?clicked=${this.selectedShape === name}
              @click=${() => {
                if (!disabled) {
                  if (this.selectedShape !== name) {
                    this.selectedShape = name;
                    this.signals.select.emit(name);
                  }
                }
              }}
            >
              ${icon}
              <arrow-tool-tip
                .tipText=${disabled ? '(Coming soon)' : tooltip}
              ></arrow-tool-tip>
            </div>
          `;
        })}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'shape-menu': ShapeMenu;
  }
}
