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
    <Box className="flex flex-col md:flex-row gap-4 mb-8 bg-white p-4 rounded-lg shadow-sm border border-gray-100">
      <TextField
        fullWidth
        placeholder="Buscar prompts por título ou descrição..."
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon size={20} className="text-gray-400" />
            </InputAdornment>
          ),
        }}
        size="small"
      />

      <FormControl size="small" sx={{ minWidth: { md: 200 } }}>
        <InputLabel id="filter-category-label">Categoria</InputLabel>
        <Select
          labelId="filter-category-label"
          id="filter-category"
          value={category}
          label="Categoria"
          onChange={(e) => onCategoryChange(e.target.value)}
          startAdornment={
            <InputAdornment position="start">
              <FilterIcon size={18} className="text-gray-400" />
            </InputAdornment>
          }
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
