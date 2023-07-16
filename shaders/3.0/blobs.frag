#version 300 es
precision lowp float;

#define PI 3.1415926538
#define TWO_PI 6.2831853076
#define PI_OVER_6 0.5235987756333333
#define E 2.7182818284
#define COS_PI_OVER_6_INVERSE 1.15470053838

uniform float uTime;
uniform vec2 uScaleFactor;
uniform float uDevicePixelRatio;
uniform vec4 uDeviceOrientation;

in vec2 fragUv;
out vec4 fragOut;

///
/// Quaternion Rotation Library (Angus O'Grady and John Boyer).
///

/// Performs a grassmann multiplication on two quaternions.
/// vec4 q1: The left quaternion.
/// vec4 q2: The right quaternion.
/// returns: The product of the q1 and q2.
vec4 q_Mult(vec4 q1, vec4 q2) {
    return vec4(
        (q1.w * q2.x) + (q2.w * q1.x) + (q1.y * q2.z - q1.z * q2.y),
        (q1.w * q2.y) + (q2.w * q1.y) + (q1.z * q2.x - q1.x * q2.z),
        (q1.w * q2.z) + (q2.w * q1.z) + (q1.x * q2.y - q1.y * q2.x),
        (q1.w * q2.w) - (q1.x * q2.x + q1.y * q2.y + q1.z * q2.z)
    );
}


/// Takes the conjugate of a quaternion (this is only equivalent to the inverse when the quaternion
/// is normalized).
/// vec4 q: The quaternion to take the conjugate of.
/// returns: The conjugate of q.
vec4 q_Conj(vec4 q) {
    return vec4(-q.xyz, q.w);
}


/// Rotates a vector about a quaternion, note that q must be normalized for this to work correctly.
/// vec4 q: The quaternion.
/// vec3 v: The vector to rotate.
/// returns: The rotated vector.
vec3 q_Rotate(vec4 q, vec3 v) {
    return q_Mult(q, q_Mult(vec4(v, 0.0), q_Conj(q))).xyz;
}


/// Creates a quaternion which encapsulates the rotation by angle radians around the axis.
/// vec3 axis: The vector to rotate about.
/// float angle: The angle to rotate through.
/// returns: The quaternion representing the rotation.
vec4 q_FromAxisAngle(vec3 axis, float angle) {
    return normalize(vec4(
        sin(angle / 2.0) * axis,
        cos(angle / 2.0)
    ));
}


/// Creates a quaternion which encapsulates the rotation between two vectors.
/// Both original and rotated MUST be normalized.
/// Passing a zero vector into this function will cause an error.
/// vec3 original: The original vector.
/// vec3 rotated: The rotated vector.
/// returns: A quaternion which represents the rotation from original to rotated.
vec4 q_FromVectors(vec3 original, vec3 rotated) {
    vec3 axis = cross(original, rotated);
    float angle = acos(dot(original, rotated));

    return q_FromAxisAngle(axis, angle);
}

///
/// End Quaternion Rotation Library (Angus O'Grady and John Boyer).
///


///
/// Random Number Generation Library (Angus O'Grady and John Boyer).
///

/// Generates a random float between zero and one.
/// Based on the integer hash function by Inigo Quilez.
/// uint2 source: The source used to generate the random number.
/// uint seed: A seed used to change the state of the random number generator.
/// returns: A random float in the range [0, 1].
float r_Random(uvec2 source, uint seed) {
    uvec2 q = 1103515245u * ((source >> 1u) ^ (source.yx) ^ seed);
    uint n = 1103515245u * ((q.x) ^ (q.y >> 3u));
    return float(n) * (1.0 / float(0xffffffffu));
}

/// Generates a random unit direction vector from an input and a seed.
/// float input: The input used to generate the random direction vector.
/// float seed: A seed to change the state of the random number generator.
/// returns: A random unit direction vector.
vec2 r_RandomDir2D(uvec2 source, uint seed) {
    float angle = mix(0.0, TWO_PI, r_Random(source, seed));
    return vec2(
        cos(angle),
        sin(angle)
    );
}


/// Generates 2D simplex noise, be sure to scale the source according to the frequency that you want.
/// vec2 source: The point at which the simplex noise is to be calculated.
/// float seed: A seed to change the simplex noise.
/// returns: The value of the simplex noise at the point.
float r_Simplex2D(vec2 source, uint seed) {

    // Rotates the x-axis down by PI / 6, meaning that squares are now parallelograms which can
    // be split into two equilateral triangles.
    mat2 transform = mat2(
        cos(PI_OVER_6), 0.0,
        sin(PI_OVER_6), 1.0
    );

    // Inverse of transform.
    mat2 invTransform = COS_PI_OVER_6_INVERSE * mat2(
        1.0, 0.0,
        -sin(PI_OVER_6), cos(PI_OVER_6)
    );

    // Get the triangle that we are in.
    vec2 skewed = source * transform;
    vec2 tOA = floor(skewed);

    // The transformed vectors between A and points B, C, P.
    vec2 tAB;
    vec2 tAC = vec2(1.0, 1.0);
    vec2 tAP = fract(skewed);

    if (tAP.x > tAP.y) {
        // We are in the lower triangle of the square.
        tAB = vec2(1.0, 0.0);

    } else {
        // We are in the upper triangle of the square.
        tAB = vec2(0.0, 1.0);
    }

    // Get the displacement vectors between vertices A, B, C of the current triangle and the point
    // P.
    vec2 rAP = tAP * invTransform;
    vec2 rBP = (tAP - tAB) * invTransform;
    vec2 rCP = (tAP - tAC) * invTransform;

    // Get the gradient from each vertice at the current point.
    vec3 dotProducts = vec3(
        dot(r_RandomDir2D(floatBitsToUint(tOA), seed), rAP),
        dot(r_RandomDir2D(floatBitsToUint(tOA + tAB), seed), rBP),
        dot(r_RandomDir2D(floatBitsToUint(tOA + tAC), seed), rCP)
    );

    // Get the attenuation of the gradient from each vertice at the current point.
    vec3 attenuations = vec3(
        dot(rAP, rAP),
        dot(rBP, rBP),
        dot(rCP, rCP)
    );

    attenuations = 1.0 - attenuations * (1.3333333333333);
    attenuations = max(attenuations * attenuations * attenuations, 0.0);

    return 1.4 * dot(dotProducts, attenuations) + 0.5;
}

///
/// End Random Number Generation Library (Angus O'Grady and John Boyer).
///


vec2 uvToPageSpace(vec2 coords) {
    return coords * uScaleFactor;
}

/// Converts a value in the range [-1, 1] to a value in the range [0, 1], also
/// applies an easing function.
float modulateSimplexNoise(float x) {
    float y = (x + 1.0) * 0.5;
    return y * y * y * y;
}

// vec4 generateBlobs(vec2 coords) {
//     coords = uvToPageSpace(coords) * 0.8;

//     float simplexScale = 450.0;
//     float simplexTime = uTime * 150.0;
//     vec3 simplexNoise = vec3(
//         0.2 * modulateSimplexNoise(r_Simplex2D((coords + simplexTime * vec2(1.5, 0.4)) / simplexScale, 77156299u)),
//         0.6 * modulateSimplexNoise(r_Simplex2D((coords + simplexTime * vec2(-0.7, -0.7)) / simplexScale, 65252599u)),
//         0.2 + 0.8 * modulateSimplexNoise(r_Simplex2D((coords + simplexTime * vec2(0.1, -1.7)) / simplexScale, 36577862u))
//     );
//     return vec4(0.6 * simplexNoise, 1.0);

// }

float map(float value, float inMin, float inMax, float outMin, float outMax) {
    return outMin + (outMax - outMin) * (value - inMin) / (inMax - inMin);
}

float r_Fractal2D(vec2 coords, uint seed) {
    const mat2 m = mat2(1.4, 1.0, -1.13, 1.2);
    float f = 0.75 * r_Simplex2D(coords, seed + 100u);
    f += 0.25 * r_Simplex2D(m * coords, seed + 252u);
    return f;
}

vec4 getPointColor(vec2 coords) {
    const float striations = 12.0;
    const float depthSpeed = 0.0001;
    const float direction = 110.0;
    const float speed = 0.0055;
    const float visibleVolumeHeight = 0.17;
    const float visibleVolumeOffset = 0.3;
    const float scale = 0.001;
    const float wobbleScale = 3.0;
    const float wobbleSpeed = 0.15;

    // Color in RGB.
    const vec3 lowColor = vec3(0.0f, 0.33f, 0.66f);
    const vec3 color = vec3(0.0f, 0.5f, 1.0f);

    coords = coords * scale;
    float height = r_Fractal2D(
        coords + vec2(-1.0, -0.20) + vec2(cos(direction),
        sin(direction)) * speed * sin(uTime),
        26756680u
    );

    vec3 point = vec3(coords.x, coords.y, height);
    vec3 cuttingPlaneNormal = q_Rotate(uDeviceOrientation, vec3(0.0, 0.0, 1.0));
    float distanceToCuttingPlane = (dot(point, cuttingPlaneNormal) / dot(cuttingPlaneNormal, cuttingPlaneNormal));

    float wobble = r_Simplex2D(coords * wobbleScale + uTime * wobbleSpeed, 10235256u) * 0.05;

    float col = mod(mod(distanceToCuttingPlane + depthSpeed * uTime, 1.0), 1.0 / striations) * striations;
    const float outerBlur = 0.001;
    const float innerBlur = 0.99;

    // Fade to upper with blur
    float upperDist = distanceToCuttingPlane;
    float upperFactor = visibleVolumeOffset + wobble;
    upperDist = map(upperDist, upperFactor, upperFactor + outerBlur, 0.0, 1.0);
    upperDist = clamp(upperDist, 0.0, 1.0);

    // Fade to lower with blur
    float lowerDist = distanceToCuttingPlane;
    float lowerFactor = 1.0 - (visibleVolumeHeight + visibleVolumeOffset + wobble);
    lowerDist = map(lowerDist, lowerFactor, lowerFactor - outerBlur, 0.0, 1.0);
    lowerDist = clamp(lowerDist, 0.0, 1.0);

    // Add blur to inner lines
    col = col > innerBlur ? mix(innerBlur, 0.0, (col - innerBlur) * (1.0 / (1.0-innerBlur))) : col;

    vec4 outColor = vec4(mix(lowColor, color, col), 1.0);
    return outColor * upperDist * lowerDist;
}

// Uses a blurring function based on https://www.shadertoy.com/view/Xltfzj.
vec4 generateWaves(vec2 coords) {
    const float contrast = 1.0;
    const float brightness = 0.9;

    coords = uvToPageSpace(coords - vec2(0.5));

    // Get base color
    vec4 color = getPointColor(coords);
    // Apply contrast
    color = (color - 0.5 * max(contrast, 0.0)) + 0.5;
    // Apply brightness
    color *= brightness;
    return color;
}

void main() {
    fragOut = generateWaves(fragUv);
}