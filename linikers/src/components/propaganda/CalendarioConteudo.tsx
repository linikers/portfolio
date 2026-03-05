// src/components/propaganda/CalendarioConteudo.tsx
import React from "react";
import { Calendar, dateFnsLocalizer, EventProps } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import { ptBR } from "date-fns/locale";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Box, Typography } from "@mui/material";
import type { IPost } from "@/types/propaganda";

const locales = {
  "pt-BR": ptBR,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const CalendarStyled: any = Calendar;

interface CalendarioConteudoProps {
  events: any[]; // react-big-calendar Event format
  onSelectEvent: (event: any) => void;
}

const platformColors: Record<string, string> = {
  instagram: "#E1306C",
  linkedin: "#0077B5",
  x: "#000000",
  whatsapp: "#25D366",
};

const EventComponent = ({ event }: EventProps<any>) => (
  <Box
    sx={{ display: "flex", alignItems: "center", gap: 0.5, overflow: "hidden" }}
  >
    <Typography
      variant="caption"
      sx={{ fontSize: "0.65rem", fontWeight: "bold", whiteSpace: "nowrap" }}
    >
      {event.title}
    </Typography>
  </Box>
);

export default function CalendarioConteudo({
  events,
  onSelectEvent,
}: CalendarioConteudoProps) {
  const eventPropGetter = (event: any) => {
    // Pick first platform color if multiple, or default
    const color = platformColors[event.resource?.platforms?.[0]] || "#3b82f6";
    return {
      style: {
        backgroundColor: color,
        borderRadius: "4px",
        border: "none",
        color: "white",
        fontSize: "0.75rem",
      },
    };
  };

  return (
    <Box
      sx={{
        height: "70vh",
        bgcolor: "white",
        p: 2,
        borderRadius: 2,
        boxShadow: 1,
      }}
    >
      <CalendarStyled
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: "100%" }}
        onSelectEvent={onSelectEvent}
        eventPropGetter={eventPropGetter}
        components={{
          event: EventComponent,
        }}
        messages={{
          next: "Próximo",
          previous: "Anterior",
          today: "Hoje",
          month: "Mês",
          week: "Semana",
          day: "Dia",
          agenda: "Agenda",
          date: "Data",
          time: "Hora",
          event: "Evento",
          noEventsInRange: "Nenhuma publicação neste período",
        }}
        culture="pt-BR"
      />
    </Box>
  );
}
