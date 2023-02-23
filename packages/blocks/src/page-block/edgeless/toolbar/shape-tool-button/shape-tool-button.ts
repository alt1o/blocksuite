import '../tool-icon-button.js';
import './shapes-menu.js';

import { ShapeIcon } from '@blocksuite/global/config';
import { createPopper } from '@popperjs/core';
import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import type { MouseMode } from '../../../../__internal__/index.js';
import type { EdgelessPageBlockComponent } from '../../edgeless-page-block.js';
import type { EdgelessShapesMenu } from './shapes-menu.js';

interface ShapesMenuInstance {
  element: EdgelessShapesMenu;
  dispose: () => void;
}

function createShapesMenuPopper(reference: HTMLElement): ShapesMenuInstance {
  const shapeComponent = document.createElement('edgeless-shapes-menu');
  document.body.appendChild(shapeComponent);
  const popper = createPopper(reference, shapeComponent, {
    placement: 'top',
    modifiers: [
      {
        name: 'offset',
        options: {
          offset: [0, 12],
        },
      },
    ],
  });

  return {
    element: shapeComponent,
    dispose: () => {
      shapeComponent.remove();
      popper.destroy();
    },
  };
}

@customElement('edgeless-shape-tool-button')
export class EdgelessShapeToolButton extends LitElement {
  @property()
  mouseMode?: MouseMode;

  @property()
  edgeless?: EdgelessPageBlockComponent;

  private _shapesMenu?: ShapesMenuInstance;

  private _toggleShapesMenu() {
    if (this._shapesMenu) {
      this._shapesMenu.dispose();
      this._shapesMenu = undefined;
    } else {
      this._shapesMenu = createShapesMenuPopper(this);
      this._shapesMenu.element.mouseMode = this.mouseMode;
      this._shapesMenu.element.edgeless = this.edgeless;
    }
  }

  updated(changedProperties: Map<string, unknown>) {
    if (changedProperties.has('mouseMode')) {
      this._shapesMenu?.dispose();
      this._shapesMenu = undefined;
    }
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this._shapesMenu?.dispose?.();
    this._shapesMenu = undefined;
  }

  render() {
    const type = this.mouseMode?.type;

    return html`
      <edgeless-tool-icon-button
        .tooltips=${'Shape'}
        .active=${type === 'shape'}
        @tool.click=${() => this._toggleShapesMenu()}
      >
        ${ShapeIcon}
      </edgeless-tool-icon-button>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'edgeless-shape-tool-button': EdgelessShapeToolButton;
  }
}
