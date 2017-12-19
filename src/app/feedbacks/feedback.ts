export interface IFeedback {
  userUid: string;
  userDisplayName: string;
  instructorKey: string;   // to query for feedbacks related to a certain instructor
  instructorName: string;
  rating: number;
  text: string;
  key?: string
}
