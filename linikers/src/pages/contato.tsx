import { WhatsApp } from "@mui/icons-material";
import { Container, Grid2, IconButton } from "@mui/material";
import { motion } from "framer-motion";
import Image from "next/image";
import world from "../../public/planeta.svg"
import Social from "@/components/social";

export default function Contato() {

    return (
        <Container className="flex flex-col"
            sx={{
                backgroundColor: '#d4d0c4',
                height: '100vh',
                width: '100vw',
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
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                >
                    <Image 
                        // src={"../../public/planeta.svg"}
                        src={world}
                        alt="planeta" 
                        style={{
                            width: 250,
                            opacity:0.2
                    }} />
                </motion.div>
            </Grid2>
            <Grid2>
                <Social />
            </Grid2>
        </Container>
    )
}