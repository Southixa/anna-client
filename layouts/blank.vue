<template>
    <div class="w-full bg-[#111111] p-[10px]">
        <div class="w-full min-h-screen bg-white p-4 relative">
            <slot />
            <div class="w-full h-full border border-gray-100 absolute top-0 left-0 z-[0]">
        <vue-particles
        class="w-full h-full"
        id="tsparticles"
        :options="{
          fullScreen: { enable: false },
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
              speed: 1,
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
        </div>
    </div>
</template>

<script setup>
const particlesLoaded = async (container) => {
  console.log("Particles container loaded", container);
};
</script>