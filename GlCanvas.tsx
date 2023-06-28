"use client";

import { useAnimationFrame } from "framer-motion";
import { useContext, useEffect, useRef, useState } from "react";
import { DevicePermissionContext } from "@components/contexts/DevicePermissionContext";
import Quaternion from "../../utils/maths/Quaternion";

export default function GlCanvas({
  vertShaderScript,
  fragShaderScript,
}: {
  vertShaderScript: string;
  fragShaderScript: string;
}) {
  const devicePermissionContext = useContext(DevicePermissionContext);
  const [deviceOrientation, setDeviceOrientation] = useState<Quaternion>(
    Quaternion.Identity()
  );

  const glCanvas = useRef<HTMLCanvasElement>(null);
  const deviceOrientationUniform = useRef<WebGLUniformLocation | null>(null);
  const devicePixelRatioUniform = useRef<WebGLUniformLocation | null>(null);
  const timeUniform = useRef<WebGLUniformLocation | null>(null);
  const scaleFactorUniform = useRef<WebGLUniformLocation | null>(null);
  const webGlContext = useRef<WebGL2RenderingContext | null>(null);

  // Update the deviceOrientation if access to device orientation and motion is allowed.
  useEffect(() => {
    if (devicePermissionContext?.deviceMotion) {
      const handleEvent = (event: DeviceOrientationEvent) => {
        setDeviceOrientation(
          Quaternion.FromEulerAngles(
            ((event.beta || 0) * Math.PI) / 180,
            ((event.gamma || 0) * Math.PI) / 180,
            ((event.alpha || 0) * Math.PI) / 180
          )
        );
      };

      window.addEventListener("deviceorientation", handleEvent);

      return () => {
        window.removeEventListener("deviceorientation", handleEvent);
      };
    }
  }, [devicePermissionContext]);

  useEffect(() => {
    if (glCanvas.current === null) {
      return;
    }

    // Initialise context
    webGlContext.current = glCanvas.current.getContext("webgl2", {
      alpha: true,
      powerPreference: "low-power",
      antialias: false,
    });

    if (webGlContext.current === null) {
      console.info("Unable to initialise WebGL context");
      return;
    }

    // Create and compile vertex shader
    const vertexShader = webGlContext.current.createShader(
      webGlContext.current.VERTEX_SHADER
    );
    if (vertexShader === null) {
      console.error("Failed to create vertex shader");
      return;
    }
    webGlContext.current.shaderSource(vertexShader, vertShaderScript);
    webGlContext.current.compileShader(vertexShader);

    // Create and compile fragment shader
    const fragmentShader = webGlContext.current.createShader(
      webGlContext.current.FRAGMENT_SHADER
    );
    if (fragmentShader === null) {
      console.error("Failed to create fragment shader");
      return;
    }

    webGlContext.current.shaderSource(fragmentShader, fragShaderScript);
    webGlContext.current.compileShader(fragmentShader);

    // Create program and attach shaders
    const program = webGlContext.current.createProgram();
    if (program === null) {
      console.error("Failed to create webgl program");
      return;
    }

    webGlContext.current.attachShader(program, vertexShader);
    webGlContext.current.attachShader(program, fragmentShader);
    webGlContext.current.linkProgram(program);
    webGlContext.current.useProgram(program);

    const buffer = webGlContext.current.createBuffer();
    if (buffer === null) {
      console.error("Failed to create buffer");
      return;
    }

    // Bind basic screen plane
    webGlContext.current.bindBuffer(webGlContext.current.ARRAY_BUFFER, buffer);
    webGlContext.current.bufferData(
      webGlContext.current.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      webGlContext.current.STATIC_DRAW
    );

    // Uniforms (shader: uniform)
    deviceOrientationUniform.current = webGlContext.current.getUniformLocation(
      program,
      "uDeviceOrientation"
    );
    devicePixelRatioUniform.current = webGlContext.current.getUniformLocation(
      program,
      "uDevicePixelRatio"
    );
    scaleFactorUniform.current = webGlContext.current.getUniformLocation(
      program,
      "uScaleFactor"
    );
    timeUniform.current = webGlContext.current.getUniformLocation(
      program,
      "uTime"
    );

    // Attributes (vertex: in)
    const positionLocation = webGlContext.current.getAttribLocation(
      program,
      "position"
    );

    webGlContext.current.enableVertexAttribArray(positionLocation);
    webGlContext.current.vertexAttribPointer(
      positionLocation,
      2,
      webGlContext.current.FLOAT,
      false,
      0,
      0
    );
    webGlContext.current.clearColor(0.0, 0.0, 0.0, 0.0);
  }, [fragShaderScript, vertShaderScript]);

  useAnimationFrame((timestamp, _) => {
    if (glCanvas.current === null || webGlContext.current === null) {
      return;
    }

    // Set the viewport size.
    const width =
      glCanvas.current.getBoundingClientRect().width * devicePixelRatio;
    const height =
      glCanvas.current.getBoundingClientRect().height * devicePixelRatio;
    glCanvas.current.width = width;
    glCanvas.current.height = height;
    webGlContext.current.viewport(0, 0, width, height);

    // Update the uniforms.
    {
      webGlContext.current.uniform4f(
        deviceOrientationUniform.current,
        deviceOrientation.x,
        deviceOrientation.y,
        deviceOrientation.z,
        deviceOrientation.w
      );
    }

    webGlContext.current.uniform1f(
      devicePixelRatioUniform.current,
      devicePixelRatio
    );
    webGlContext.current.uniform2f(
      scaleFactorUniform.current,
      width / devicePixelRatio,
      height / devicePixelRatio
    );
    webGlContext.current.uniform1f(timeUniform.current, timestamp * 0.001);

    // Redraw.
    webGlContext.current.clear(webGlContext.current.COLOR_BUFFER_BIT);
    webGlContext.current.drawArrays(webGlContext.current.TRIANGLES, 0, 6);
  });

  return (
    <canvas
      className="pointer-events-none absolute h-screen w-full"
      ref={glCanvas}
    />
  );
}
