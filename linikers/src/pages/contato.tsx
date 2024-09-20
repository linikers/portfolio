import { WhatsApp } from "@mui/icons-material";
import { Container, Grid2, IconButton } from "@mui/material";
import { motion } from "framer-motion";
import Image from "next/image";
import world from "../../public/planeta.svg"
import Social from "@/components/social";

export default function Contato() {

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
        <Container className="flex flex-col"
            sx={{
                backgroundColor: '#d4d0c4',
                height: '100vh',
                width: '100vw',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <Grid2>
                {/* <BoxTop /> */}
            </Grid2>
            <Grid2>
            <motion.span
                className="text-green-600 text-xl font-mono mt-6"
                initial='initial'
                animate='animate'
                // variants={fadeVar}
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
            <IconButton href="https://wa.me/5544984198075?text=Oi%20Liniker%20vi%20seu%20portfolio">
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
                        // src={"../../public/planeta.svg"}
                        src={world}
                        alt="planeta" 
                        style={{
                            width: 120,
                            opacity:0.6
                    }} />
                </motion.div>
            </Grid2>
            <Grid2>
                <Social />
            </Grid2>
        </Container>
    )
}