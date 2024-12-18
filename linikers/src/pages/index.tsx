import Logo from "@/components/logo";
import MenuUser from "@/components/menu";
import Social from "@/components/social";
import { Box, Container } from "@mui/material";
import Head from "next/head";
import { useEffect } from "react";
import "./types/global.d.ts";

export default function Home() {

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const { getAnalytics, logEvent } = require('firebase/analytics');
      try {
        const analytics = getAnalytics();
        logEvent(analytics, 'Home', {
        page_name: 'index'
        })
      } catch (error) {
        
      }    
    }
}, [])

  useEffect(() => {
    if (typeof window !== "undefined") {
      const particlesJS = window.particlesJS;
      if (particlesJS) {
        particlesJS("particles-js", {
          particles: {
            number: {
              value: 400, // Ajuste o valor de acordo com o efeito desejado
              density: {
                enable: true,
                value_area: 800
              }
            },
            color: {
              value: "#ffffff"
            },
            shape: {
              type: "circle",
              stroke: {
                width: 0,
                color: "#000000"
              },
              "polygon": {
                "nb_sides": 5
              },
              "image": {
                "src": "img/github.svg",
                "width": 100,
                "height": 100
              }
            },
            opacity: {
              value: 0.4,
              random: true,
              anim: {
                enable: false,
                speed: 1,
                opacity_min: 0.1,
                sync: false
              }
            },
            size: {
              value: 6,
              random: true,
              anim: {
                enable: false,
                speed: 8,
                size_min: 0.1,
                sync: false
              }
            },
            line_linked: {
              enable: false,
              distance: 500,
              color: "#ffffff",
              opacity: 0.4,
              width: 2
            },
            move: {
              enable: true,
              speed: 6,
              direction: "bottom",
              random: false,
              straight: false,
              out_mode: "out",
              bounce: false,
              attract: {
                enable: false,
                rotateX: 600,
                rotateY: 1200
              }
            }
          },
          interactivity: {
            detect_on: "canvas",
            events: {
              onhover: {
                enable: true,
                mode: "bubble"
              },
              onclick: {
                enable: true,
                mode: "push"
              },
              resize: true
            },
            modes: {
              grab: {
                distance: 400,
                line_linked: {
                  opacity: 0.5
                }
              },
              bubble: {
                distance: 400,
                size: 4,
                duration: 0.3,
                opacity: 1,
                speed: 3
              },
              repulse: {
                distance: 200,
                duration: 0.4
              },
              push: {
                particles_nb: 4
              },
              remove: {
                particles_nb: 2
              }
            }
          },
          retina_detect: true
        });
      }
    }
  }, []);

  return (
    <Container
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignContent: "center",
        padding: 2,
      }}
    >
      <Head>
        <title>LinikerS Dev</title>
        <meta
          name="Desenvolvedor web - Programador de sistemas online"
          content="Portfolio com alguns projetos de desenvolvimento online back-end e front-end"
        />
      </Head>

      <Box
        sx={{
          position: "absolute",
          top: "18%",
          left: "36%",
          right: "36%",
          zIndex: 10,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          alignContent: "center",
          justifyContent: "center",
          flexGrow: 1,
        }}
      >
        <MenuUser />
        <Box
          sx={{
            zIndex: 10,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Logo />
        </Box>
      </Box>
      <Box
        sx={{
          position: "absolute",
          bottom: 0,
          left: "0%",
          zIndex: 10,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-end",
          width: "100%",
          paddingBottom: 2,
          color: "text.primary",
        }}
      >
        <Social />
      </Box>

      <Box sx={{ zIndex: 1, width: "100%" }}>
        <div
          id="particles-js"
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            top: 0,
            left: 0,
            background:
              "url('https://images.unsplash.com/photo-1518818419601-72c8673f5852?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80')",
            backgroundSize: "cover",
            zIndex: 1,
          }}
        ></div>
      </Box>
    </Container>
  );
}
