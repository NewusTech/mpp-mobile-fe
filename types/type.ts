export interface CardInstanceProps {
  icon: any;
  title: string;
  route: string;
}

export interface CustomButtonProps {
  title: string;
  type?: string;
  clx: string;
  clx2: string;
  route?: string;
  onPress?: () => void;
  disabled?: boolean;
}

export interface InputFormProps {
  type?: string;
  placeholder?: string;
  icon?: any;
  value?: string;
  onChangeText?: any;
  onPress?: () => void;
  secureTextEntry?: boolean;
  placeholderColor?: string;
}

export interface GapProps {
  width?: number;
  height?: number;
}

export interface BottombarProps {
  icon: any;
  title: string;
  route: string;
}

export interface CardNewsProps {
  icon: any;
  title: string;
  date: string;
  route: string;
}

export interface CardServiceProps {
  title: string;
  isLastStep: boolean;
  isActive: boolean;
}

export interface ChatProps {
  title: string;
  img: any;
}

export interface NotificationCardtProps {
  desc: string;
  hour: string;
}

export interface TabRequestProps {
  images: any;
  id: string;
  title: string;
  status: string;
}

export interface TabQueueProps {
  images: any;
  time: string;
  title: string;
  date: string;
}

export interface KecamatanType {
  id: number;
  name: string;
}

export interface DesaType {
  id: number;
  name: string;
}

export interface LoginType {
  nik: string;
  password: string;
}

export interface RegisterType {
  name: string;
  nik: string;
  phoneNumber: string;
  email: string;
  password: string;
  districtId: number;
  villageId: number;
  neighborhoodAssociation: string;
  communityAssociation: string;
  address: string;
}

export interface AccordionProps {
  title: string;
  children: React.ReactNode;
}
