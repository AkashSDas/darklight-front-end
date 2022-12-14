import { useUser } from "@lib/hooks.lib";

import SidebarNavbar from "./sidebar-navbar";
import UserSettingsSidebar from "./user-settings-sidebar";

interface Props {
  children: JSX.Element | JSX.Element[] | string | string[] | null;
}

export default function UserSettingLayout({ children }: Props): JSX.Element {
  var { user, error, isLoading } = useUser();

  function DisplayContent(): JSX.Element {
    if (isLoading) return <div>Loading...</div>;
    if (error || !user) return <div>Unauthorized</div>;

    return <>{children}</>;
  }

  return (
    <div className="font-urbanist font-medium">
      <UserSettingsSidebar />

      <div className="ml-[300px]">
        <SidebarNavbar />
        <DisplayContent />
      </div>
    </div>
  );
}
