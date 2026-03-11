// src/components/loja/LojaFilters.tsx
import {
  Box,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  InputAdornment,
} from "@mui/material";
import { MdSearch, MdFilterList } from "react-icons/md";

const SearchIcon: any = MdSearch;
const FilterIcon: any = MdFilterList;
import { PROMPT_CATEGORIES } from "@/types/prompt";

interface LojaFiltersProps {
  search: string;
  category: string;
  onSearchChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
}

export default function LojaFilters({
  search,
  category,
  onSearchChange,
  onCategoryChange,
}: LojaFiltersProps) {
  return (
    <Box
      className="flex flex-col md:flex-row gap-4 p-4 rounded-xl border border-white/5"
      sx={{
        background:
          "linear-gradient(145deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)",
        backdropFilter: "blur(10px)",
      }}
    >
      <TextField
        fullWidth
        placeholder="Buscar prompts por título ou descrição..."
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon size={20} className="text-gray-500" />
            </InputAdornment>
          ),
        }}
        size="small"
        sx={{
          "& .MuiOutlinedInput-root": {
            color: "white",
            backgroundColor: "rgba(0,0,0,0.2)",
            "& fieldset": {
              borderColor: "rgba(255,255,255,0.1)",
              borderRadius: "8px",
            },
            "&:hover fieldset": {
              borderColor: "rgba(255,255,255,0.2)",
            },
            "&.Mui-focused fieldset": {
              borderColor: "rgba(255,255,255,0.3)",
            },
          },
          "& .MuiInputBase-input::placeholder": {
            color: "rgba(255,255,255,0.3)",
            opacity: 1,
          },
        }}
      />

      <FormControl
        size="small"
        sx={{
          minWidth: { md: 240 },
          "& .MuiInputLabel-root": { color: "rgba(255,255,255,0.5)" },
          "& .MuiInputLabel-root.Mui-focused": { color: "white" },
        }}
      >
        <InputLabel id="filter-category-label">Categoria</InputLabel>
        <Select
          labelId="filter-category-label"
          id="filter-category"
          value={category}
          label="Categoria"
          onChange={(e) => onCategoryChange(e.target.value)}
          startAdornment={
            <InputAdornment position="start">
              <FilterIcon size={18} className="text-gray-500" />
            </InputAdornment>
          }
          sx={{
            color: "white",
            backgroundColor: "rgba(0,0,0,0.2)",
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "rgba(255,255,255,0.1)",
              borderRadius: "8px",
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "rgba(255,255,255,0.2)",
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "rgba(255,255,255,0.3)",
            },
            "& .MuiSvgIcon-root": { color: "rgba(255,255,255,0.5)" },
          }}
          MenuProps={{
            PaperProps: {
              sx: {
                bgcolor: "#111",
                color: "white",
                border: "1px solid rgba(255,255,255,0.1)",
                "& .MuiMenuItem-root:hover": {
                  bgcolor: "rgba(255,255,255,0.05)",
                },
              },
            },
          }}
        >
          <MenuItem value="">Todas as Categorias</MenuItem>
          {PROMPT_CATEGORIES.map((cat) => (
            <MenuItem key={cat.value} value={cat.value}>
              {cat.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
