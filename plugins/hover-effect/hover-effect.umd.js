!(function(e, t) {
  "object" == typeof exports && "undefined" != typeof module
    ? (module.exports = t(require("three"), require("gsap/TweenMax")))
    : "function" == typeof define && define.amd
    ? define(["three", "gsap/TweenMax"], t)
    : (e.hoverEffect = t(e.THREE, e.TweenMax));
})(this, function(e, t) {
  return (
    (t = t && t.hasOwnProperty("default") ? t.default : t),
    function(n) {
      function i() {
        for (var e = arguments, t = 0; t < arguments.length; t++)
          if (void 0 !== e[t]) return e[t];
      }
      console.log(
        "%c Hover effect by Robin Delaporte: https://github.com/robin-dela/hover-effect ",
        "color: #bada55; font-size: 0.8rem"
      );
      var r = n.parent,
        a = n.displacementImage,
        o = n.image1,
        s = n.image2,
        l = i(n.intensity1, n.intensity, 1),
        d = i(n.intensity2, n.intensity, 1),
        f = i(n.angle, Math.PI / 4),
        u = i(n.angle1, f),
        p = i(n.angle2, 3 * -f),
        v = i(n.speedIn, n.speed, 1.6),
        m = i(n.speedOut, n.speed, 1.2),
        c = i(n.hover, !0),
        g = i(n.easing, Expo.easeOut),
        h = i(n.video, !1);
      if (r)
        if (o && s && a) {
          var x = new e.Scene(),
            y = new e.OrthographicCamera(
              r.offsetWidth / -2,
              r.offsetWidth / 2,
              r.offsetHeight / 2,
              r.offsetHeight / -2,
              1,
              1e3
            );
          y.position.z = 1;
          var F = new e.WebGLRenderer({ antialias: !1, alpha: !0 });
          F.setPixelRatio(window.devicePixelRatio),
            F.setClearColor(16777215, 0),
            F.setSize(r.offsetWidth, r.offsetHeight),
            r.appendChild(F.domElement);
          var w = function() {
              F.render(x, y);
            },
            L = new e.TextureLoader();
          L.crossOrigin = "";
          var E = L.load(a, w);
          if (((E.wrapS = E.wrapT = e.RepeatWrapping), h)) {
            var M = function() {
              requestAnimationFrame(M), F.render(x, y);
            };
            M(),
              ((h = document.createElement("video")).autoplay = !0),
              (h.loop = !0),
              (h.src = o),
              h.load();
            var P = document.createElement("video");
            (P.autoplay = !0), (P.loop = !0), (P.src = s), P.load();
            var T = new e.VideoTexture(h),
              R = new e.VideoTexture(P);
            (T.magFilter = R.magFilter = e.LinearFilter),
              (T.minFilter = R.minFilter = e.LinearFilter),
              P.addEventListener(
                "loadeddata",
                function() {
                  P.play(),
                    ((R = new e.VideoTexture(P)).magFilter = e.LinearFilter),
                    (R.minFilter = e.LinearFilter),
                    (U.uniforms.texture2.value = R);
                },
                !1
              ),
              h.addEventListener(
                "loadeddata",
                function() {
                  h.play(),
                    ((T = new e.VideoTexture(h)).magFilter = e.LinearFilter),
                    (T.minFilter = e.LinearFilter),
                    (U.uniforms.texture1.value = T);
                },
                !1
              );
          } else
            (T = L.load(o, w)),
              (R = L.load(s, w)),
              (T.magFilter = R.magFilter = e.LinearFilter),
              (T.minFilter = R.minFilter = e.LinearFilter);
          var U = new e.ShaderMaterial({
              uniforms: {
                intensity1: { type: "f", value: l },
                intensity2: { type: "f", value: d },
                dispFactor: { type: "f", value: 0 },
                angle1: { type: "f", value: u },
                angle2: { type: "f", value: p },
                texture1: { type: "t", value: T },
                texture2: { type: "t", value: R },
                disp: { type: "t", value: E }
              },
              vertexShader:
                "\nvarying vec2 vUv;\nvoid main() {\n  vUv = uv;\n  gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n}\n",
              fragmentShader:
                "\nvarying vec2 vUv;\n\nuniform float dispFactor;\nuniform sampler2D disp;\n\nuniform sampler2D texture1;\nuniform sampler2D texture2;\nuniform float angle1;\nuniform float angle2;\nuniform float intensity1;\nuniform float intensity2;\n\nmat2 getRotM(float angle) {\n  float s = sin(angle);\n  float c = cos(angle);\n  return mat2(c, -s, s, c);\n}\n\nvoid main() {\n  vec4 disp = texture2D(disp, vUv);\n  vec2 dispVec = vec2(disp.r, disp.g);\n  vec2 distortedPosition1 = vUv + getRotM(angle1) * dispVec * intensity1 * dispFactor;\n  vec2 distortedPosition2 = vUv + getRotM(angle2) * dispVec * intensity2 * (1.0 - dispFactor);\n  vec4 _texture1 = texture2D(texture1, distortedPosition1);\n  vec4 _texture2 = texture2D(texture2, distortedPosition2);\n  gl_FragColor = mix(_texture1, _texture2, dispFactor);\n}\n",
              transparent: !0,
              opacity: 1
            }),
            V = new e.PlaneBufferGeometry(r.offsetWidth, r.offsetHeight, 1),
            b = new e.Mesh(V, U);
          x.add(b),
            c &&
              (r.addEventListener("mouseenter", C),
              r.addEventListener("touchstart", C),
              r.addEventListener("mouseleave", D),
              r.addEventListener("touchend", D)),
            window.addEventListener("resize", function(e) {
              F.setSize(r.offsetWidth, r.offsetHeight);
            }),
            (this.next = C),
            (this.previous = D);
        } else console.warn("One or more images are missing");
      else console.warn("Parent missing");
      function C() {
        t.to(U.uniforms.dispFactor, v, {
          value: 1,
          ease: g,
          onUpdate: w,
          onComplete: w
        });
      }
      function D() {
        t.to(U.uniforms.dispFactor, m, {
          value: 0,
          ease: g,
          onUpdate: w,
          onComplete: w
        });
      }
    }
  );
});
//# sourceMappingURL=hover-effect.umd.js.map
