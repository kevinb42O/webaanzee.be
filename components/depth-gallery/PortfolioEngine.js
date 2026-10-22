import * as THREE from 'three';
import { Gallery } from './Gallery.js';
import { Scroll } from './Scroll.js';
import { Background } from './Background/index.js';
import { TrailController } from './TrailController.js';

// The original demo's physics, with native page position as its input so the
// gallery can hand scrolling back to the rest of the homepage at either end.
class PageScroll extends Scroll {
  createVelocityVisualizer() {}
  updateVelocityVisualizer() {}
}

export class PortfolioEngine {
  constructor(canvas, data, onIndex, onError) {
    this.canvas = canvas;
    this.onIndex = onIndex;
    this.onError = onError;
    this.disposed = false;
    this.initialized = false;
    this.enabled = false;
    this.frame = 0;
    this.index = -1;
    this.target = 0;
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(45, 1, .1, 100);
    this.camera.position.set(0, 0, 6);
    this.gallery = new Gallery(data);
    this.background = new Background();
    this.trail = new TrailController({ gallery: this.gallery });
    this.scroll = new PageScroll(this.camera, this.gallery);
    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.autoClear = false;
    this.textures = new Map();
    this.onVisibility = () => this.schedule();
    this.onContextLost = () => { this.setEnabled(false); this.onError(); };
    this.tick = this.tick.bind(this);
  }

  async init() {
    const loader = new THREE.TextureLoader();
    await Promise.all(this.gallery.getTextureSources().map(async source => {
      const texture = await loader.loadAsync(source);
      if (this.disposed) { texture.dispose(); return; }
      texture.colorSpace = THREE.SRGBColorSpace;
      this.textures.set(source, texture);
    }));
    if (this.disposed) return;
    this.gallery.setPreloadedTextures(this.textures);
    await this.gallery.init(this.scene);
    this.background.init();
    this.scroll.init();
    this.setPosition(this.target, true);
    this.trail.init(this.scene, this.camera);
    this.initialized = true;
    this.resize();
    this.resizeObserver = new ResizeObserver(() => this.resize());
    this.resizeObserver.observe(this.canvas);
    document.addEventListener('visibilitychange', this.onVisibility);
    this.canvas.addEventListener('webglcontextlost', this.onContextLost);
    this.schedule();
  }

  resize() {
    const { clientWidth: width, clientHeight: height } = this.canvas;
    if (!width || !height || this.disposed) return;
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height, false);
    this.gallery.updatePlaneScale();
    this.gallery.layoutPlanes();
  }

  setPosition(phase, immediate = false) {
    this.target = THREE.MathUtils.clamp(phase, 0, this.gallery.planeConfig.length - 1);
    // Five world units per item, 0.01 world units per input pixel: demo values.
    this.scroll.scrollTarget = this.target * this.gallery.planeGap / this.scroll.scrollToWorldFactor;
    if (immediate) {
      this.scroll.scrollCurrent = this.scroll.scrollTarget;
      this.scroll.previousScrollCurrent = this.scroll.scrollCurrent;
      this.scroll.velocity = 0;
      this.camera.position.z = this.scroll.cameraZFromScroll(this.scroll.scrollCurrent);
    }
  }

  setEnabled(enabled) {
    if (enabled && !this.enabled && this.initialized) this.setPosition(this.target, true);
    this.enabled = enabled;
    this.schedule();
  }

  schedule() {
    if (this.frame) cancelAnimationFrame(this.frame);
    this.frame = 0;
    if (this.initialized && this.enabled && !this.disposed && !document.hidden) this.frame = requestAnimationFrame(this.tick);
  }

  tick(time) {
    this.frame = 0;
    if (this.disposed || !this.enabled || document.hidden) return;
    this.scroll.update();
    this.trail.update(this.camera, this.scroll, time);
    this.gallery.update(this.camera, this.scroll);
    const blend = this.gallery.getPlaneBlendData(this.camera.position.z);
    const index = blend.blend >= .5 ? blend.nextPlaneIndex : blend.currentPlaneIndex;
    if (index !== this.index) { this.index = index; this.onIndex(index); }
    const mood = this.gallery.getMoodBlendData(this.camera.position.z);
    if (mood) this.background.setMoodBlend(mood);
    const distanceFromCenter = Math.abs(blend.blend - .5) * 2;
    this.background.setMotionResponse({
      depthProgress: this.gallery.getDepthProgress(this.camera.position.z),
      velocityIntensity: THREE.MathUtils.clamp(Math.abs(this.scroll.velocity) / this.scroll.velocityMax, 0, 1)
        * THREE.MathUtils.smoothstep(distanceFromCenter, .35, 1),
    });
    this.background.update(time);
    this.renderer.clear(true, true, true);
    this.background.render(this.renderer);
    this.renderer.clearDepth();
    this.renderer.render(this.scene, this.camera);
    this.frame = requestAnimationFrame(this.tick);
  }

  dispose() {
    this.disposed = true;
    cancelAnimationFrame(this.frame);
    this.resizeObserver?.disconnect();
    document.removeEventListener('visibilitychange', this.onVisibility);
    this.canvas.removeEventListener('webglcontextlost', this.onContextLost);
    this.scroll.dispose();
    this.gallery.dispose();
    this.trail.dispose();
    this.background.dispose();
    const geometries = new Set();
    this.gallery.planes.forEach(plane => { geometries.add(plane.geometry); plane.material.dispose(); });
    geometries.forEach(geometry => geometry.dispose());
    this.textures.forEach(texture => texture.dispose());
    this.textures.clear();
    this.scene.clear();
    this.renderer.dispose();
  }
}
