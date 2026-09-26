import { Component } from 'react';

/**
 * @typedef {object} SceneBoundaryProps
 * @property {import('react').ReactNode} children
 * @property {(error: unknown) => void} [onError]
 */

/**
 * Catches any failure of the lazy 3D scene (chunk download, model download,
 * WebGL) and renders nothing, so the hero photo simply stays in place.
 * @extends {Component<SceneBoundaryProps, { failed: boolean }>}
 */
export default class SceneBoundary extends Component {
  /** @param {SceneBoundaryProps} props */
  constructor(props) {
    super(props);
    this.state = { failed: false };
  }

  static getDerivedStateFromError() {
    return { failed: true };
  }

  /** @param {unknown} error */
  componentDidCatch(error) {
    this.props.onError?.(error);
  }

  render() {
    return this.state.failed ? null : this.props.children;
  }
}
