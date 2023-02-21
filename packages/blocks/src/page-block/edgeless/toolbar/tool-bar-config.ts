import {
  ConnectorIcon,
  HandIcon,
  ImageIcon,
  PenIcon,
  SelectIcon,
  ShapeIcon,
  TextIconLarge,
} from '@blocksuite/global/config';
import { createPopper } from '@popperjs/core';
import type { TemplateResult } from 'lit';

import type { EdgelessToolBar } from './edgeless-tool-bar.js';

export const ToolbarConfig: Array<{
  name: string;
  icon: TemplateResult<1>;
  disabled: boolean;
  tooltip: string;
  action?: (toolbar: EdgelessToolBar) => void;
}> = [
  {
    name: 'default',
    icon: SelectIcon,
    disabled: false,
    tooltip: 'Select',
    action: toolbar => {
      toolbar.signals.select.emit({
        type: 'default',
      });
    },
  },
  {
    name: 'text',
    icon: TextIconLarge,
    disabled: true,
    tooltip: 'Text',
  },
  {
    name: 'shape',
    icon: ShapeIcon,
    disabled: false,
    tooltip: 'Shape',
    action: (toolbar: EdgelessToolBar) => {
      if (toolbar.secondaryToolBar) {
        toolbar.secondaryToolBar.remove();
        toolbar.secondaryToolBar = null;
        return;
      }
      const shapeComponent = document.createElement('shape-menu');
      shapeComponent.selectedShape =
        toolbar.edgeless.mouseMode.type === 'shape'
          ? toolbar.edgeless.mouseMode.shape
          : 'rect';

      shapeComponent.signals.select.on(selected => {
        toolbar.signals.select.emit({
          type: 'shape',
          shape: selected,
          color: '#000000',
        });
      });
      toolbar.secondaryToolBar = shapeComponent;
      document.body.appendChild(shapeComponent);
      createPopper(toolbar, shapeComponent, {
        placement: 'top',
        modifiers: [
          {
            name: 'offset',
            options: { offset: [0, 12] },
          },
        ],
      });
    },
  },
  {
    name: 'image',
    icon: ImageIcon,
    tooltip: 'Image',
    disabled: true,
  },
  {
    name: 'connector',
    icon: ConnectorIcon,
    tooltip: 'Connector',
    disabled: true,
  },
  {
    name: 'pen',
    icon: PenIcon,
    tooltip: 'Pen',
    disabled: true,
  },
  {
    name: 'hand',
    icon: HandIcon,
    tooltip: 'Hand',
    disabled: true,
  },
];
