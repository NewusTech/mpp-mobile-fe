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
  route?: any;
  onPress?: () => void;
  disabled?: boolean;
  icon?: any;
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
  onPress: () => void;
}

export interface TabRequestProps {
  images?: any;
  id: number;
  time: string;
  title: string;
  date: string;
  no: number;
  service: string;
  status: number;
}

export interface TabQueueProps {
  images?: any;
  id: number;
  time: string;
  title: string;
  date: string;
  no: number;
  service: string;
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
  role_id: number;
}

export interface AccordionProps {
  title: string;
  children: React.ReactNode;
}

export interface FormDataUser {
  name: string;
  nik: string;
  telepon: string;
  email: string;
  pendidikan: string;
  agama: string;
  gender: string;
  tempatLahir: string;
  goldar: string;
  statusKawin: string;
  pekerjaan: string;
  kecamatan: string;
  desa: string;
  rt: string;
  rw: string;
  alamat: string;
}

export interface FormDataPengaduan {
  instansi_id: number;
  layanan_id: number;
  status: number;
  aduan: string;
  judul: string;
  image: string;
  admin_id: number;
}

export interface FormDataUpdateStepTwo {
  formData: FormDataProps;
  slug: string;
}

interface FormDataProps {
  name: string;
  nik: string;
  telepon: string;
  email: string;
  pendidikan: string;
  agama: string;
  gender: string;
  tempatLahir: string;
  goldar: string;
  statusKawin: string;
  pekerjaan: string;
  kecamatan: string;
  desa: string;
  rt: string;
  rw: string;
  alamat: string;
  selectedDateNow: string;
}

export interface RadioButtonProps {
  label: string;
  onPress?: () => void;
  isSelected?: boolean;
}
