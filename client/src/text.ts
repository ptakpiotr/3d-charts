import { Mesh } from "three";
import { FontLoader, TextGeometry } from "three/examples/jsm/Addons.js";

const loadFonts = async (fontPath: string) => {
  const loader = new FontLoader();
  return await loader.loadAsync(fontPath);
};

export const renderText = async (text: string, material: THREE.Material) => {
  const font = await loadFonts("fonts/helvetiker_bold_typeface.json");

  const textGeo = new TextGeometry(text, {
    font,
    size: 0.1,
    height: 0.01,
  });

  const mesh = new Mesh(textGeo, material);

  return mesh;
};
