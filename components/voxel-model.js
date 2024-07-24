import { useState, useEffect, useRef, useCallback } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
// import { loadGLTFModel } from '../lib/model'
import { VoxelSpinner, VoxelContainer } from './voxel-loader'
import fragmentShader from './shaders/frag.glsl'
import vertexShader from './shaders/vert.glsl'
import { useColorModeValue } from '@chakra-ui/react'

function easeOutCirc(x) {
    return Math.sqrt(1 - Math.pow(x - 1, 4))
}

const VoxelModel = () => {
    const refContainer = useRef()
    const [loading, setLoading] = useState(true)
    const refRenderer = useRef()
    // const urlDogGLB = (process.env.NODE_ENV === 'production' ? 'https://craftzdog.global.ssl.fastly.net/homepage' : '') + '/dog.glb'
    const cvalue = useColorModeValue(new THREE.Color(0xffff00), new THREE.Color(0x0000ff))

    const handleWindowResize = useCallback(() => {
      const { current: renderer } = refRenderer
      const { current: container } = refContainer
      if (container && renderer) {
        const scW = container.clientWidth
        const scH = container.clientHeight
  
        renderer.setSize(scW, scH)
      }
    }, [])
  
    useEffect(() => {
      const { current: container } = refContainer
      if (container) {
        const scW = container.clientWidth
        const scH = container.clientHeight
  
        const renderer = new THREE.WebGLRenderer({
          antialias: true,
          alpha: true
        })
        renderer.setPixelRatio(window.devicePixelRatio)
        renderer.setSize(scW, scH)
        renderer.outputEncoding = THREE.sRGBEncoding
        container.appendChild(renderer.domElement)
        refRenderer.current = renderer
        const scene = new THREE.Scene()   
  
        const target = new THREE.Vector3(0, -1.5, 0) //(-0.5, 1.2, 0)
        const initialCameraPosition = new THREE.Vector3(
          20 * Math.sin(0.2 * Math.PI),
          10,
          20 * Math.cos(0.2 * Math.PI)
        )
  
        const scale = scH * 0.005 + 4.8
        const camera = new THREE.OrthographicCamera(
          -scale,
          scale,
          scale,
          -scale,
          0.01,
          50000
        )
        camera.position.copy(initialCameraPosition)
        camera.lookAt(target)
  
        // const ambientLight = new THREE.AmbientLight(0xcccccc, Math.PI)
        // scene.add(ambientLight)

        const controls = new OrbitControls(camera, renderer.domElement)
        controls.autoRotate = true
        controls.target = target

        // test cube
        // var geometry = new THREE.BoxGeometry(1, 1, 1);
        // var material = new THREE.MeshBasicMaterial({ color: 0xff00ff });
        // var cube = new THREE.Mesh(geometry, material);
        // scene.add(cube);

        // const edges = new THREE.EdgesGeometry(geometry);
        // const outline = new THREE.LineSegments(
        //     edges, 
        //     new THREE.LineBasicMaterial({color: '#000000', linewidth: 2})
        // );
        // scene.add(outline);

        const points = [];
        for (var i = 0; i < 1500; i++) {
          var vertex = new THREE.Vector3();

          var u = THREE.MathUtils.randFloat(0, 1);
          var v = THREE.MathUtils.randFloat(0, 1);
          var theta = 2 * Math.PI * u;
          var phi = Math.acos(2 * v - 1);

          vertex.x = 3.5 * Math.sin(phi) * Math.cos(theta);
          vertex.y = 3.5 * Math.sin(phi) * Math.sin(theta);
          vertex.z = 3.5 * Math.cos(phi);

          points.push(vertex);
        }

        const shaderPoint = THREE.ShaderLib.points;
        const uniforms = THREE.UniformsUtils.clone(shaderPoint.uniforms);
        uniforms.time = {value: 0,};
        uniforms.color = {type: "v3", value: cvalue,};
      
        const pMaterial = new THREE.ShaderMaterial({
          uniforms,
          transparent: true,
          depthWrite: false,
      
          blending: THREE.AdditiveBlending,
      
          vertexShader,
          fragmentShader,
        });

        const starsGeometry = new THREE.BufferGeometry().setFromPoints(points);
        const particles = new THREE.Points(starsGeometry, pMaterial);
        scene.add(particles);

        // loadGLTFModel(scene, urlDogGLB, {
        //   receiveShadow: false,
        //   castShadow: false
        // }).then(() => {
        //   animate()
        //   setLoading(false)
        // })
  
        let req = null
        let frame = 0
        const animate = (time) => {
          req = requestAnimationFrame(animate)
  
          frame = frame <= 100 ? frame + 1 : frame
  
          if (frame <= 100) {
            const p = initialCameraPosition
            const rotSpeed = -easeOutCirc(frame / 120) * Math.PI * 20
  
            camera.position.y = 10
            camera.position.x =
              p.x * Math.cos(rotSpeed) + p.z * Math.sin(rotSpeed)
            camera.position.z =
              p.z * Math.cos(rotSpeed) - p.x * Math.sin(rotSpeed)
            camera.lookAt(target)
          } else {
            controls.update()
          }

          pMaterial.uniforms.time.value = time * 0.004;
          
          if (localStorage.getItem("chakra-ui-color-mode") === "dark") {
            pMaterial.uniforms.color.value = new THREE.Color(0xffffff);
          } else {
            pMaterial.uniforms.color.value = new THREE.Color(0x000000);
          }
          
          // cube turning
          // cube.rotation.x += 0.01;
          // cube.rotation.y += 0.01;
          // outline.rotation.x += 0.01;
          // outline.rotation.y += 0.01;
          
          renderer.render(scene, camera)
        }

        animate()
        setLoading(false)
  
        return () => {
          cancelAnimationFrame(req)
          renderer.domElement.remove()
          renderer.dispose()
        }
      }
    }, [])
  
    useEffect(() => {
      window.addEventListener('resize', handleWindowResize, false)
      return () => {
        window.removeEventListener('resize', handleWindowResize, false)
      }
    }, [handleWindowResize])
  
    return (
      <VoxelContainer ref={refContainer}>{loading && <VoxelSpinner />}</VoxelContainer>
    )
  }
  
  export default VoxelModel