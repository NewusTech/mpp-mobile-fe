export interface CardInstanceProps {
  icon: any;
  title: string;
}

export interface CustomButtonProps {
  title: string;
  type?: string;
  clx: string;
  clx2: string;
  route: string;
}

export interface InputFormProps {
  type?: string;
  placeholder: string;
  icon?: any;
  value?: string;
  onChangeText?: any;
  onPress?: () => void;
  secureTextEntry?: boolean;
}

export interface GapProps {
  width?: number;
  height?: number;
}

export interface BottombarProps {
  icon: any;
  title: string;
}

export interface CardNewsProps {
  icon: any;
  title: string;
  date: string;
}
