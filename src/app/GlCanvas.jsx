"use client";
import React, { useCallback, useEffect, useRef } from "react";
import { useDarkMode } from "./context/DarkContext";

function GlCanvas({ vertShaderScript, fragShaderScript }) {
  const { darkMode } = useDarkMode();
  const glCanvas = useRef(null);
  const deviceOrientationUniform = useRef(null);
  const devicePixelRatioUniform = useRef(null);
  const timeUniform = useRef(null);
  const scaleFactorUniform = useRef(null);
  const webGlContext = useRef(null);
  const animationFrame = useRef(null);

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

  const animate = useCallback((timestamp) => {
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
        0,
        0,
        0,
        1
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

    animationFrame.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    animationFrame.current = requestAnimationFrame(animate);
    return () => {
      animationFrame.current && cancelAnimationFrame(animationFrame.current);
    };
  }, [animate]);

  return (
    <canvas
      className={`pointer-events-none absolute h-screen w-full ${
        darkMode ? "bg-slate-900 text-white" : "bg-white text-black"
      }`}
      ref={glCanvas}
    />
  );
}

export default GlCanvas;
