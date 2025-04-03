export interface ProfileSettingsState {
  name: string | undefined;
  image?: string | undefined;
  profile: string | undefined;
  errors?: {
    name?: string[] | undefined;
    image?: string[] | undefined;
    profile?: string[] | undefined;
  };
  message?: string;
  success?: boolean;
}

export interface ProfileSettingsFormData {
  name: string;
  image: string | File;
  profile: string;
}