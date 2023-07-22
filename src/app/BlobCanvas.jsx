"use client"
import basicVert from "../shaders/3.0/basic.vert";
import blobFrag from "../shaders/3.0/blobs.frag";
import GlCanvas from "./GlCanvas";

export default function BlobCanvas() {
  return <GlCanvas  vertShaderScript={basicVert} fragShaderScript={blobFrag} />;
}
