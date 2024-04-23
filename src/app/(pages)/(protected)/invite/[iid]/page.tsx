import InvitePageController from "./invite-page-controller";

type InvitePageProps = {
  params: {
    iid: string;
  };
};

const InvitePage = async ({ params: { iid } }: InvitePageProps) => {
  return <InvitePageController iid={iid} />;
};

export default InvitePage;
