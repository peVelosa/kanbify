import { api } from "@/app/_trpc/server";
import InvitePageView from "./invite-page-view";

const InvitePageController = async ({ iid }: { iid: string }) => {
  const invite = await api.boards.invite.get({
    iid,
  });

  return (
    <>
      <InvitePageView
        invite={invite}
        iid={iid}
      />
    </>
  );
};

export default InvitePageController;
