<template>
      <div class="w-full h-[400px] border border-gray-100">
        <vue-particles
        class="w-full h-full"
        id="tsparticles"
        :options="{
          fullScreen: { enable: false },
          background: {
            color: {
              value: '#ffffff'
            }
          },
          fpsLimit: 120,
          interactivity: {
            events: {
              onClick: {
                enable: true,
                mode: 'push'
              },
              onHover: {
                enable: true,
                mode: 'repulse'
              },
            },
            modes: {
              push: {
                quantity: 4
              },
              repulse: {
                distance: 200,
                duration: 0.4
              }
            }
          },
          particles: {
            color: {
              value: '#808080'
            },
            links: {
              color: '#808080',
              distance: 150,
              enable: true,
              opacity: 0.5,
              width: 1
            },
            move: {
              direction: 'none',
              enable: true,
              outModes: 'bounce',
              random: false,
              speed: 2,
              straight: false
            },
            number: {
              density: {
                enable: true,
                area: 800 // ປັບຄ່ານີ້ເພື່ອຄວບຄຸມຄວາມໜາແໜ້ນຂອງ particles
              },
              value: 80
            },
            opacity: {
              value: 0.7
            },
            shape: {
              type: 'circle'
            },
            size: {
              value: { min: 1, max: 5 }
            }
          },
          detectRetina: true
        }"
      />
      </div>
  </template>
  
  <script setup>
  const particlesLoaded = async (container) => {
    console.log("Particles container loaded", container);
  };
  </script>
  
  <style scoped>
 
  </style>