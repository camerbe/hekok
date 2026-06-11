
export type Role = 'Admin' | 'Pre' | 'Tre' | 'Sec';
export interface Permissions {
    canRead?: boolean;
    canCreate?: boolean;
    canUpdate?: boolean;
    canDelete?: boolean;
}

export const ROLE_PERMISSIONS: Record<Role, Permissions> = {
  Admin: { canRead: true, canCreate: true, canUpdate: true, canDelete: true },

  Pre: { canRead: true, canCreate: false, canUpdate: false, canDelete: false },

  Tre: { canRead: true, canCreate: true, canUpdate: true, canDelete: true }, // membres

  Sec: { canRead: true, canCreate: true, canUpdate: true, canDelete: true }, // messages
};
