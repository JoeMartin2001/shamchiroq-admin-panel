export type User = {
  id?: string;
  firstName: string;
  firebaseMessagingToken?: string;
  lastName: string;
  email: string;
  phone: string;
  createdAt?: Date;
  updatedAt?: Date;
  region: string;
  deletedAt?: Date;
  items?: Item[];
  profileImg?: string;
};

export type FontWeight = "regular" | "semibold" | "bold";

export type Case = "Lost" | "Found";

export enum LANGUAGES {
  UZ = "uz",
  RU = "ru",
  EN = "en",
}

export enum ITEM_CATEGORY {
  ELECTRONICS = "Electronics",
  DOCUMENTS = "Documents",
  KEYS = "Keys",
  BAGS = "Bags",
  CLOTHES = "Clothes",
  PETS = "Pets",
  OTHER = "Other",
}

export type ItemStatus = "active" | "inactive" | "blocked";

export type Item = {
  description: string;
  id?: string;
  images: string[];
  title: string;
  phone: string;
  case: Case;
  date: Date;
  region: string;
  user: string;
  userId: string;
  createdAt: Date;
  updatedAt?: Date;
  deletedAt?: Date;
  category: ITEM_CATEGORY;
  isBlocked: boolean;
  status: ItemStatus;
  itemUser: User;
};

export enum REGIONS {
  TOSHKENT = "Toshkent",
  ANDIJON = "Andijon",
  NAMANGAN = "Namangan",
  FARGONA = "Farg'ona",
  SIRDARYO = "Sirdaryo",
  JIZZAX = "Jizzax",
  SAMARQAND = "Samarqand ",
  BUXORO = "Buxoro",
  NAVOIY = "Navoiy",
  QASHQADARYO = "Qashqadaryo",
  SURXANDARYO = "Surxondaryo",
  XORAZM = "Xorazm",
  QORAQALPOGISTON = "Qoraqalpogʻiston",
}

export type NotificationContentType = {
  title: string;
  body: string;
  imageUrl?: string;
};

export type ReportStatus = "pending" | "approved" | "rejected";

export type Report = {
  id?: string;
  itemId: string;
  description: string;
  status: ReportStatus;
  reporter: string;
  reportee: string;
  createdAt: Date;
  updatedAt?: Date;
  deletedAt?: Date;
};
