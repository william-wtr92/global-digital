export type Freelance = {
  id: string
  userId: string
  jobTitle: string
  businessName: string
  areaId: string
  localisation: string
  registrationNumber: string
}

export type Profile = {
  id?: string
  firstName: string
  lastName: string
  email: string
  phoneNumber: string
  jobTitle: string
  businessName: string
  areaId: string
  localisation: string
  registrationNumber: string
  avatarUrl?: string
  password?: string
}

export enum ActivityArea {
  IT = "IT",
  MARKETING = "MARKETING",
}
