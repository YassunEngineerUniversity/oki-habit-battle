export interface Stamp {
  id: number;
  image_url: string;
  obtained: boolean;
  generated_date: string;
}

export interface SelectedStampType {
  stamp: string
  generatedDate: string
  obtained?: boolean
}
