import type { Color } from '../../consts.js';

export type AttachedElementDirection = 'left' | 'top' | 'right' | 'bottom';

export interface AttachedElement {
  id: string;
  direction: AttachedElementDirection;
}

export type Controller = {
  x: number;
  y: number;
  // If this value is true, it indicates that the point was generated by the user dragging
  customized?: boolean;
};

export type SerializedConnectorProps = {
  id: string;
  index: string;
  type: string;
  xywh: string;

  lineWidth: number;
  color: Color;

  startElement?: AttachedElement;
  endElement?: AttachedElement;

  // relative to element x,y.
  // JSON.stringify(Controller[])
  controllers: string;
};

export type ConnectorProperties = Partial<
  Pick<
    SerializedConnectorProps,
    'lineWidth' | 'color' | 'startElement' | 'endElement'
  >
>;
