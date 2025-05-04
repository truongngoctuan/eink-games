import { Button } from "@/components/ui/button";
import {
  DropdownMenu as DropdownMenuCore,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import EllipsisVerticalIcon from "../Icons/EllipsisVerticalIcon";

export function DropdownMenu() {
  return (
    <DropdownMenuCore>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <EllipsisVerticalIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Game Menu</DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuItem>Reset</DropdownMenuItem>
        <DropdownMenuItem>New Game</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenuCore>
  );
}
