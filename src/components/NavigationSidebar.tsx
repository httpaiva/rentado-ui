import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from ".";
import { navigationMenuTriggerStyle } from "./ui/navigation-menu";

export const NavigationSidebar = () => {
  return (
    <NavigationMenu
      orientation="vertical"
      className="bg-zinc-100 w-48 items-start pt-[80px]"
    >
      <NavigationMenuList className="flex flex-col items-start space-x-0 w-48">

        <NavigationMenuItem className="w-48">
          <Link href="/locations" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Imóveis
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>

        <NavigationMenuItem className="w-48">
          <Link href="/renters" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Locatários
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>

        <NavigationMenuItem className="w-48">
          <Link href="/rents" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Aluguéis
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>

        <NavigationMenuItem className="w-48">
          <Link href="/payments" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Pagamentos
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>

        <NavigationMenuItem className="w-48">
          <Link href="/templates" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Templates
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>

        <NavigationMenuItem className="w-48">
          <Link href="/profile" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Perfil
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>

      </NavigationMenuList>
    </NavigationMenu>
  );
};
