import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
  Typography,
} from "@material-tailwind/react";
import {
  Cog6ToothIcon,
  PowerIcon,
  InboxArrowDownIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";

export default function MenuUser() {
  return (
    <Menu>
      <MenuHandler className="border-none">
        <div className="cursor-pointer p-2 border-none">
          <Avatar
            variant="circular"
            alt="Lil link"
            className="w-16 h-16 rounded-full overflow-hidden"
            src={
              "https://live.staticflickr.com/65535/53846668019_bdd38aef38_n.jpg"
            }
          />
        </div>
      </MenuHandler>
      <MenuList className="z-10 text-custom-base-0 mr-6 p-2 bg-custom-blue-1 border-none">
        <MenuItem className="flex items-center border-none gap-2 transition-all duration-300 hover:scale-105 hover:bg-transparent">
          <a href="perfil" className="flex items-center gap-2 border-none">
            <UserCircleIcon strokeWidth={2} className="h-4 w-4 border-none" />
            <Typography variant="small" className="font-normal border-none">
              Perfil
            </Typography>
          </a>
        </MenuItem>
        <MenuItem className="flex items-center border-none gap-2 transition-all duration-300 hover:scale-105 hover:bg-transparent">
          <a href="blog" className="flex items-center gap-2 border-none">
            <Cog6ToothIcon strokeWidth={2} className="h-4 w-4 border-none" />
            <Typography variant="small" className="font-normal border-none">
              Blog
            </Typography>
          </a>
        </MenuItem>
        <MenuItem className="flex items-center border-none gap-2 transition-all duration-300 hover:scale-105 hover:bg-transparent">
          <a href="ferramentas" className="flex items-center gap-2 border-none">
            <Cog6ToothIcon strokeWidth={2} className="h-4 w-4 border-none" />
            <Typography variant="small" className="font-normal border-none">
              Ferramentas
            </Typography>
          </a>
        </MenuItem>
        <MenuItem className="flex items-center border-none gap-2 transition-all duration-300 hover:scale-105 hover:bg-transparent">
          <a href="projetos" className=" flex items-center gap-2 border-none">
            <InboxArrowDownIcon strokeWidth={2} className="h-4 w-4 " />
            <Typography variant="small" className="font-normal border-none">
              Projetos
            </Typography>
          </a>
        </MenuItem>

        <hr className="my-2" />
        <MenuItem className="flex items-center border-none gap-2 transition-all duration-300 hover:scale-105 hover:bg-transparent">
          <a href="contato" className="flex items-center gap-2 border-none">
            <PowerIcon strokeWidth={2} className="h-4 w-4 border-none" />
            <Typography variant="small" className="font-normal border-none">
              Contato
            </Typography>
          </a>
        </MenuItem>
      </MenuList>
    </Menu>
  );
}
