// src/pages/admin/propaganda/calendario.tsx
import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Drawer,
  IconButton,
  Divider,
  Chip,
  Button,
  Stack,
} from "@mui/material";
import { MdClose, MdEdit, MdPauseCircle } from "react-icons/md";
import { FaInstagram, FaLinkedin, FaTwitter, FaWhatsapp } from "react-icons/fa";
import { useRouter } from "next/router";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import type { GetServerSideProps } from "next";
import { getAdminFirestore } from "@/lib/firebaseAdmin";
import PropagandaLayout from "@/components/propaganda/PropagandaLayout";
import CalendarioConteudo from "@/components/propaganda/CalendarioConteudo";
import { usePropagandaStore } from "@/store/propaganda.store";
import type { IPost } from "@/types/propaganda";
import { STATUS_OPTIONS } from "@/types/propaganda";

interface CalendarioPageProps {
  initialPosts: IPost[];
}

const platformIcons: Record<string, JSX.Element> = {
  instagram: <FaInstagram />,
  linkedin: <FaLinkedin />,
  x: <FaTwitter />,
  whatsapp: <FaWhatsapp />,
};

export default function CalendarioPage({ initialPosts }: CalendarioPageProps) {
  const router = useRouter();
  const { posts, updatePost } = usePropagandaStore();
  const [selectedEvent, setSelectedEvent] = useState<any | null>(null);

  useEffect(() => {
    usePropagandaStore.setState({ posts: initialPosts });
  }, [initialPosts]);

  // Map IPost to Big Calendar format
  const events = posts.map((post) => ({
    id: post.id,
    title:
      post.content.substring(0, 30) + (post.content.length > 30 ? "..." : ""),
    start: new Date(post.scheduledAt),
    end: new Date(post.scheduledAt),
    allDay: false,
    resource: post,
  }));

  const handlePause = async () => {
    if (selectedEvent && confirm("Deseja pausar esta publicação?")) {
      await updatePost(selectedEvent.id, { status: "paused" });
      setSelectedEvent(null);
    }
  };

  return (
    <PropagandaLayout>
      <Box className="flex flex-col gap-6">
        <Typography variant="h4" fontWeight="bold">
          Calendário de Publicações
        </Typography>

        <CalendarioConteudo
          events={events}
          onSelectEvent={(e) => setSelectedEvent(e)}
        />

        {/* Detail Drawer */}
        <Drawer
          anchor="right"
          open={!!selectedEvent}
          onClose={() => setSelectedEvent(null)}
          PaperProps={{ sx: { width: { xs: "100%", sm: 400 }, p: 4 } }}
        >
          {selectedEvent && (
            <Box className="flex flex-col h-full">
              <Box className="flex justify-between items-center mb-6">
                <Typography variant="h6" fontWeight="bold">
                  Detalhes do Post
                </Typography>
                <IconButton onClick={() => setSelectedEvent(null)}>
                  <MdClose />
                </IconButton>
              </Box>

              <Divider sx={{ mb: 4 }} />

              <Stack spacing={3}>
                <Box>
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    fontWeight="bold"
                    display="block"
                  >
                    STATUS
                  </Typography>
                  <Chip
                    label={
                      STATUS_OPTIONS.find(
                        (s) => s.value === selectedEvent.resource.status,
                      )?.label
                    }
                    color={
                      STATUS_OPTIONS.find(
                        (s) => s.value === selectedEvent.resource.status,
                      )?.color
                    }
                    sx={{ mt: 1 }}
                  />
                </Box>

                <Box>
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    fontWeight="bold"
                    display="block"
                  >
                    DATA AGENDADA
                  </Typography>
                  <Typography variant="body1">
                    {format(
                      new Date(selectedEvent.resource.scheduledAt),
                      "eeee, d 'de' MMMM 'às' HH:mm",
                      { locale: ptBR },
                    )}
                  </Typography>
                </Box>

                <Box>
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    fontWeight="bold"
                    display="block"
                  >
                    PLATAFORMAS
                  </Typography>
                  <Box className="flex gap-3 mt-1">
                    {selectedEvent.resource.platforms.map((p: string) => (
                      <Box
                        key={p}
                        className="flex items-center gap-1 text-gray-700"
                      >
                        {platformIcons[p]}{" "}
                        <Typography
                          variant="caption"
                          sx={{ textTransform: "capitalize" }}
                        >
                          {p}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                </Box>

                <Box>
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    fontWeight="bold"
                    display="block"
                  >
                    CONTEÚDO
                  </Typography>
                  <Box
                    sx={{
                      p: 2,
                      bgcolor: "#f8fafc",
                      borderRadius: 1,
                      border: "1px solid #e2e8f0",
                      mt: 1,
                    }}
                  >
                    <Typography variant="body2" sx={{ whiteSpace: "pre-wrap" }}>
                      {selectedEvent.resource.content}
                    </Typography>
                  </Box>
                </Box>

                <Box className="flex flex-col gap-2 pt-4">
                  <Button
                    fullWidth
                    variant="contained"
                    startIcon={<MdEdit />}
                    onClick={() =>
                      router.push(
                        `/admin/propaganda/criar?edit=${selectedEvent.id}`,
                      )
                    }
                  >
                    Editar Publicação
                  </Button>
                  <Button
                    fullWidth
                    variant="outlined"
                    color="warning"
                    startIcon={<MdPauseCircle />}
                    onClick={handlePause}
                    disabled={selectedEvent.resource.status === "paused"}
                  >
                    Pausar Agendamento
                  </Button>
                </Box>
              </Stack>
            </Box>
          )}
        </Drawer>
      </Box>
    </PropagandaLayout>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const db = getAdminFirestore();
    const snapshot = await db
      .collection("posts")
      .where("scheduledAt", "!=", null)
      .get();

    const initialPosts = snapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        scheduledAt:
          data.scheduledAt?.toDate?.()?.toISOString() || data.scheduledAt,
        createdAt: data.createdAt?.toDate?.()?.toISOString() || data.createdAt,
      };
    });

    return { props: { initialPosts } };
  } catch (error) {
    console.error("Calendar SSR error:", error);
    return { props: { initialPosts: [] } };
  }
};
