import { SessionContext } from "@keystone-6/core/types";

interface ISession {
    name: String;
    email: String;
    type: String;
}

//@ts-ignore
export const isAdmin = ({ session }: { session: SessionContext<ISession> }) => session?.data?.type === 'admin';
//@ts-ignore
export const isLoggedIn = ({ session }: { session: SessionContext<ISession> }) => !!session?.data?.id;