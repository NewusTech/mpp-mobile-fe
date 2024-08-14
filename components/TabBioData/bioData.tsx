import { Text, View } from "react-native";

const BioData = ({ title, desc }: any) => {
  return (
    <View className="py-2">
      <Text className="text-sm font-psemibold text-neutral-900">{title}</Text>
      <Text className="text-xs text-neutral-900">{desc}</Text>
    </View>
  );
};

const BioDataUser = (data: any) => {
  const user = data?.data?.data;
  return (
    <View className="py-4">
      <BioData title="Nama Lengkap" desc={user?.name} />
      <BioData title="NIK" desc={user?.nik} />
      <BioData title="Jenis Kelamin" desc="Perempuan" />
      <BioData title="Agama" desc="Islam" />
      <BioData title="Pendidikan" desc="S1" />
      <BioData title="Pekerjaan" desc={user?.pekerjaan} />
      <BioData title="Nomor Telefon" desc={user?.telepon} />
      <BioData title="Email" desc={user?.email} />
      <BioData title="Kecamatan" desc={user?.kecamatan_name} />
      <BioData title="Desa" desc={user?.desa_name} />
      <BioData title="RT" desc={user?.rt} />
      <BioData title="RW" desc={user?.rw} />
      <BioData title="Alamat" desc={user?.alamat} />
    </View>
  );
};

export default BioDataUser;
