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
  LifebuoyIcon,
} from "@heroicons/react/24/outline";
import profile from "../../public/profile.jpeg";

export default function MenuUser() {
  return (
    <Menu>
      <MenuHandler>
        <div className="cursor-pointer">
          <Avatar
            variant="circular"
            alt="candice wu"
            className="w-16 h-16 rounded-full overflow-hidden"
            src={
              "https://live.staticflickr.com/65535/52926246098_451af8fed4_c.jpg"
            }
          />
        </div>
      </MenuHandler>
      <MenuList className="z-10 text-white mr-6 p-2">
        <MenuItem className="flex items-center gap-2">
          <UserCircleIcon strokeWidth={2} className="h-4 w-4" />
          <Typography variant="small" className="font-normal">
            Perfil
          </Typography>
        </MenuItem>
        <MenuItem className="flex items-center gap-2">
          <Cog6ToothIcon strokeWidth={2} className="h-4 w-4" />
          <Typography variant="small" className="font-normal">
            Ferramentas
          </Typography>
        </MenuItem>
        <MenuItem className="flex items-center gap-2">
          <InboxArrowDownIcon strokeWidth={2} className="h-4 w-4" />
          <Typography variant="small" className="font-normal">
            Projetos
          </Typography>
        </MenuItem>

        <hr className="my-2 border-blue-gray-50" />
        <MenuItem className="flex items-center gap-2 ">
          <PowerIcon strokeWidth={2} className="h-4 w-4" />
          <Typography variant="small" className="font-normal">
            Contato
          </Typography>
        </MenuItem>
      </MenuList>
    </Menu>
  );
}
