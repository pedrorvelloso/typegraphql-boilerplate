import { AuthChecker } from 'type-graphql';
import { AuthContext } from './auth-context';

export const customAuthChecker: AuthChecker<AuthContext> = (
  { root, args, context, info },
  roles,
) => {
  if (!context.user) return false;
  // here we can read the user from context
  // and check his permission in the db against the `roles` argument
  // that comes from the `@Authorized` decorator, eg. ["ADMIN", "MODERATOR"]

  return true; // or false if access is denied
};
