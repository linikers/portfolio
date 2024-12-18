import { WhatsApp } from "@mui/icons-material";
import { Container, Grid2, IconButton } from "@mui/material";
import { motion } from "framer-motion";
import Image from "next/image";
import world from "../../public/planeta.svg"
import Social from "@/components/social";
import Menu from "@/components/menu";
import { useEffect } from "react";
// import { analytics } from '../../firebase.config';
import { getAnalytics, logEvent } from "firebase/analytics";
// import analytics from '../../firebase.config'

export default function Contato() {
    
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

    const blinkEffect = {
        animate: {
            opacity:[0.6, 1, 0.6],
            filter: ["brightness(0.7)", "brightness(1.3)", "brightness(0.7)"],
            transition: {
                duration:2,
                repeat: Infinity,
                ease: "easeInOut",
            }
        }
    }
    return (
        <Container
            sx={{
                backgroundColor: '#d4d0c4',
                height: '100vh',
                width: '100vw',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                position: 'relative', //planeta
            }}
        >
            <Grid2
                sx={{
                    zIndex: 288
                }}
            >
                <Menu />
            </Grid2>
            <Grid2
                container
                direction='column'
                justifyContent='center'
                alignItems='center'
                spacing={2}
                sx={{ zIndex: 8 }} //acima do planeta
            >
            <motion.span
                className="text-green-600 text-xl font-mono mt-6"
                initial='initial'
                animate='animate'
            >
                Entre em contato
            </motion.span>
            <motion.p
            className="text-gray-800 text-5xl font-mono mt-6 text-stroke"
                initial='initial'
                animate='animate'
            >
                Liniker&#39;S
            </motion.p>
            <IconButton 
                href="https://wa.me/5544984198075?text=Oi%20Liniker%20vi%20seu%20portfolio"
                target="_blank"
                rel="noopener noreffer"
            >
                <WhatsApp />
            </IconButton>
            </Grid2>
            <Grid2 className="absolute inset-0 flex justify-center items-center z-0">
                <motion.div
                    variants={blinkEffect}
                    initial= "animate"
                    animate="animate"
                >
                    <Image 
                        src={world}
                        alt="planeta" 
                        style={{
                            width: 120,
                            opacity:0.6
                    }} />
                </motion.div>
            </Grid2>
            <Grid2 sx={{
                zIndex: '10',
            }}>
                <Social />
            </Grid2>
        </Container>
    )
}